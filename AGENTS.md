# Cresto Digital Website

Project-specific instructions for the Cresto Digital agency website repository.
This file supplements the master `/workspaces/AGENTS.md` and the shared rules under
`/workspaces/shared/rules/`. Where documents conflict, the stricter rule applies.

## Project Overview

- Project name: Cresto Digital Website
- Repository: crestodigital.github.io
- Platform: Static GitHub Pages website
- Technologies: HTML, CSS, JavaScript

This repository belongs to our digital marketing / web development agency. SEO and
UI/UX quality are important. GitHub is our source of truth and audit history.

## Mandatory Safety Rules

- Follow /workspaces/AGENTS.md.
- Never push directly to main.
- Never force push.
- Never merge automatically.
- Never expose secrets.
- Never modify GitHub repository settings.
- Never deploy production changes without explicit human approval.
- If task permissions are unclear, default to read-only.

## Git Workflow

For every modification:

1. Check git status.
2. Ensure main is clean.
3. Pull latest changes safely when appropriate.
4. Create a dedicated task branch using:
   agent/<task-name>
5. Make changes only on the task branch.
6. Review git diff.
7. Run relevant QA.
8. Commit with a descriptive message.
9. Push only the task branch.
10. Human review is required before merge.

## SEO Rules

- Preserve existing URLs unless explicitly approved.
- Maintain one logical H1.
- Maintain semantic heading hierarchy.
- Preserve or improve titles and meta descriptions.
- Maintain crawlable internal links.
- Preserve canonical/indexability behavior.
- Avoid keyword stuffing.
- Do not fabricate SEO data.
- Explain SEO rationale for meaningful changes.

## Development Rules

- Preserve the existing static HTML/CSS/JavaScript architecture unless a change is
  explicitly requested.
- Avoid unnecessary frameworks or dependencies.
- Prefer reusable CSS/JS patterns.
- Maintain responsive design.
- Maintain accessibility.
- Do not break existing navigation.
- Preserve SEO-critical markup.
- Keep JavaScript lightweight.

## UI/UX Rules

- Maintain modern professional agency presentation.
- Mobile-first responsive behavior.
- Avoid unnecessary visual clutter.
- Maintain consistent typography, spacing, navigation, buttons, and components.
- Check desktop and mobile after UI changes.

## QA Rules

Before marking UI/development work complete:

- Verify affected pages load.
- Check desktop.
- Check mobile.
- Check navigation.
- Check important buttons and links.
- Check browser console when relevant.
- Check title/meta/H1/canonical where relevant.
- Report any unresolved issues.

## Deployment

Permission model:

- Level 1: read-only analysis
- Level 2: local changes
- Level 3: branch + commit + push task branch
- Level 4: staging only when explicitly requested
- Level 5: production requires explicit human approval every time

## Shared Rules

Always follow:

- /workspaces/shared/rules/security-rules.md
- /workspaces/shared/rules/git-rules.md
- /workspaces/shared/rules/deployment-rules.md

For SEO work:

- /workspaces/shared/rules/seo-rules.md

For development work:

- /workspaces/shared/rules/development-rules.md

For QA:

- /workspaces/shared/rules/qa-rules.md
