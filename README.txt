SEARCH ICON UPDATE — Aliasghar Bagheri Tirtashi website
=======================================================

This fixes the rotated/small search glyph by replacing it with an upright,
22-pixel SVG magnifying glass. The search button dimensions, search behavior,
light/dark theme controls, and other website content are not modified.

GitHub repository:
https://github.com/aliasgharbagheri2079/aliasgharbagheri2079.github.io

EASIEST METHOD (GitHub website, no Python required)
--------------------------------------------------
1. Open the repository link and click site.js.
2. Click the pencil (Edit this file).
3. Copy all the code from search_icon_snippet.js and paste it at the END of site.js.
4. Click Commit changes. Keep the branch set to main.
5. After GitHub Pages deploys, hard-refresh the page (Ctrl+Shift+R or Cmd+Shift+R).

The existing site.js is loaded by all eight pages; editing it once corrects
the search icon consistently across the site.

ALTERNATIVE (local repository checkout)
--------------------------------------
1. Put apply_search_icon.py and search_icon_snippet.js in the repository root
   next to your existing site.js.
2. Run: python apply_search_icon.py
3. Commit and push the modified site.js to main.

The script creates site.js.bak before changing the original file.

NOTE
----
The connected GitHub account currently has read-only access to this repo,
so the site cannot be published automatically from this conversation.
