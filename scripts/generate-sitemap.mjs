import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const siteOrigin = "https://crestodigital.github.io";
const ignoredDirectories = new Set([".git", ".github", "assets", "generated_images", "node_modules", "repo", "scripts", "upload"]);
const ignoredFiles = new Set(["404.html"]);

function collectHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") && entry.name !== ".well-known") return [];
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) return [];
      return collectHtmlFiles(absolutePath);
    }
    if (!entry.isFile() || !entry.name.endsWith(".html") || ignoredFiles.has(entry.name)) return [];
    return [absolutePath];
  });
}

function isIndexable(html) {
  const robotsTags = [...html.matchAll(/<meta\s+[^>]*name=["']robots["'][^>]*>/gi)].map((match) => match[0]);
  return !robotsTags.some((tag) => /content=["'][^"']*noindex/i.test(tag));
}

function canonicalUrl(html, filePath) {
  const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    || html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  if (canonical) {
    try {
      const url = new URL(canonical[1], siteOrigin);
      if (url.origin === siteOrigin) return url.href;
    } catch {}
  }

  const path = relative(root, filePath).split(sep).join("/");
  if (path === "index.html") return `${siteOrigin}/`;
  if (path.endsWith("/index.html")) return `${siteOrigin}/${path.slice(0, -10)}`;
  return `${siteOrigin}/${path}`;
}

function lastModified(filePath) {
  const relativePath = relative(root, filePath).split(sep).join("/");
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", relativePath], { encoding: "utf8" }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {}
  return new Date(statSync(filePath).mtime).toISOString().slice(0, 10);
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

const pages = collectHtmlFiles(root)
  .map((filePath) => ({ filePath, html: readFileSync(filePath, "utf8") }))
  .filter(({ html }) => isIndexable(html))
  .map(({ filePath, html }) => ({ loc: canonicalUrl(html, filePath), lastmod: lastModified(filePath) }))
  .filter((page, index, all) => all.findIndex((candidate) => candidate.loc === page.loc) === index)
  .sort((a, b) => a.loc === `${siteOrigin}/` ? -1 : b.loc === `${siteOrigin}/` ? 1 : a.loc.localeCompare(b.loc));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(({ loc, lastmod }) => `  <url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`),
  '</urlset>',
  ''
].join("\n");

writeFileSync(join(root, "sitemap.xml"), xml, "utf8");
console.log(`Generated sitemap.xml with ${pages.length} indexable pages.`);
