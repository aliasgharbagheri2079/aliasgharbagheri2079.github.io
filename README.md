# Aliasghar Bagheri Tirtashi — Academic Website

A seven-page academic website for GitHub Pages, in Dark Ink & Ochre with Scholarly Serif typography. Includes the profile image and CV.

## Publish on GitHub Pages

1. Sign in to GitHub as `aliasgharbagheri2079`.
2. Open the repository `aliasgharbagheri2079.github.io` (or create a **Public** repository with exactly this name if it does not exist).
3. Upload all files in this folder to the **root** of the repository, not into a nested folder. If your repository already has `index.html`, overwrite it using GitHub's editor or Git locally.
4. Commit the files to the `main` branch.
5. In the repository, open **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, and save.
6. After deployment, visit `https://aliasgharbagheri2079.github.io/`.

The home page is `index.html`, other pages are linked in navigation, styling is in `style.css`, functionality in `site.js`, photo is `profile.jpg`, and the CV button links to `CV.pdf`.

If uploading through the GitHub website, remember that uploading a ZIP file directly does not publish its contents: extract the ZIP and upload the individual files.


### Poster artwork
The Beyond Research page uses externally hosted promotional images. These are not bundled inside the ZIP and require a live connection; source sites may block hotlinking or change their URLs. When an image fails, the title card remains. Confirm rights before public reuse, or replace sources with appropriately licensed local images.


## Optimized poster loading (November 2026)

The Beyond Research poster gallery requests smaller ~340x408 WebP versions through wsrv.nl, with lazy loading for posters below the first row, reserved image dimensions, and a direct-source fallback if the optimizer is unavailable. This reduces expected transfer size, but speed and reliability still depend on third-party hosts.

**Fastest and most reliable option:** If you have permission to use poster artwork, download approved images yourself, resize each to about 340x408 pixels, convert to WebP (quality 65–75), save under `posters/`, and replace the `src` URL with `posters/<filename>.webp`. This removes remote image dependencies.

Navigation update: bold Georgia serif, 16px desktop and 15px mobile.


## Music photographs
The three musician portrait thumbnails are linked from Wikimedia Commons (not bundled locally). Source attribution and licenses appear beneath the Music I Enjoy cards on beyond.html. Image availability depends on Wikimedia Commons; replace with locally hosted thumbnails if you acquire copies later.


## Contact form (Formspree)

The Contact page includes an AJAX form configured to send through `https://formspree.io/f/xoeezvdl`. It collects name, email, subject, and message, with status updates and basic spam honeypot. On success the form resets; on failure it displays an error.

Before using it: sign in to Formspree, ensure the form is active and its receiving address is verified, and check that notifications go to `bagheriali842@gmail.com`. After publishing on GitHub Pages, submit a test message and confirm it arrived in the Formspree dashboard and your email inbox. Formspree may show additional spam/CAPTCHA challenges depending on account settings. **This package has not sent a live test submission.**
