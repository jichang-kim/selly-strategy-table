(function () {
  var root = document.documentElement;
  if (root && !root.getAttribute("lang")) {
    root.setAttribute("lang", "ko");
  }
  if (root) {
    root.setAttribute("data-theme", "light");
    root.style.colorScheme = "light";
  }

  // Strip editor overlays from exported Claude Design HTML for cleaner viewing.
  var cleanupSelectors = [
    "style[data-dc-editor-style]",
    "style[data-designer-overlay]",
    "script[data-omelette-injected]"
  ];

  cleanupSelectors.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.remove();
    });
  });

  document.body && document.body.removeAttribute("data-dc-editor-on");
  document.body && document.body.removeAttribute("data-dc-editor-tool");
})();
