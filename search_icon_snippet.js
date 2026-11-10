/* Search icon: replace the font glyph with a centered, upright SVG magnifier.
   This changes only the icon; the existing search button and click handler remain intact. */
document.addEventListener('DOMContentLoaded', () => {
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" focusable="false" style="display:block">
    <circle cx="10.5" cy="10.5" r="6.5"></circle>
    <path d="m15.6 15.6 5.1 5.1"></path>
  </svg>`;
  document.querySelectorAll('.header-tool.search-trigger').forEach(button => {
    button.innerHTML = icon;
  });
});
