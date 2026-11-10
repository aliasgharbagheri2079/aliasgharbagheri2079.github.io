#!/usr/bin/env python3
"""Apply the approved magnifier icon to the common site.js file.

Run from the repository root: python apply_search_icon.py
Preserves the existing search and theme behavior. Makes site.js.bak on first run.
"""
from pathlib import Path
import argparse

MARKER = '/* Search icon: replace the font glyph with a centered, upright SVG magnifier.'

def main():
    p = argparse.ArgumentParser(description='Apply approved search icon to GitHub Pages site.js')
    p.add_argument('--site-js', type=Path, default=Path('site.js'), help='Path to the existing site.js file')
    args = p.parse_args()
    js_file = args.site_js
    if not js_file.is_file():
        raise SystemExit('Cannot find site.js. Run from the repository root or use --site-js PATH.')
    text = js_file.read_text(encoding='utf-8')
    if MARKER in text:
        print('Already updated: search icon change is present.')
        return
    if "document.querySelector('.search-trigger')" not in text:
        raise SystemExit('site.js search controller not found; no changes made.')
    snippet = Path(__file__).with_name('search_icon_snippet.js').read_text(encoding='utf-8').strip()
    backup = js_file.with_suffix(js_file.suffix + '.bak')
    if not backup.exists():
        backup.write_text(text, encoding='utf-8')
    js_file.write_text(text.rstrip() + '\n\n' + snippet + '\n', encoding='utf-8')
    print('Updated site.js. The search icon will change across all eight pages.')
    print(f'Backup saved to {backup}.')

if __name__ == '__main__':
    main()
