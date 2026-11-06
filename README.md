# Aliasghar Bagheri Tirtashi — Academic Website

A seven-page static website using Dark Ink & Ochre colors and Georgia (Scholarly Serif).

## GitLab Pages

1. Create a new **public** GitLab project (or a private project if your Pages visibility settings allow public viewing).
2. Extract this ZIP and upload **all** files to the **root** of your repository, including `.gitlab-ci.yml`. GitLab web upload may hide dotfiles on some devices; ensure `.gitlab-ci.yml` is present.
3. Commit the files to the default branch.
4. Open **Build > Pipelines** and confirm the `pages` job succeeds.
5. Open **Deploy > Pages** to find the published URL.

The included `.gitlab-ci.yml` copies the static files into `public/` and publishes that folder. The deployed URL depends on the GitLab account/project name and Pages configuration.

To use GitHub Pages instead, publish the same static site without `.gitlab-ci.yml`.

## Files
- `index.html`: homepage (About, Research Interests, Academic Journey — education milestones only)
- `projects.html`: research descriptions without numerical performance results
- `publications.html`: IEEE citations and expandable summaries
- `education.html`: academic degrees, supervisors, and thesis titles
- `experience.html`: teaching experience and technical skills
- `beyond.html`: movies, television, and Persian music galleries
- `contact.html`: contact details and academic links
- `style.css`, `site.js`: shared styles and mobile navigation
- `profile.jpg`: portrait supplied by the site owner
- `CV.pdf`: academic CV supplied by the site owner

**Privacy:** The phone number and both email addresses are public in `contact.html`, as requested.
