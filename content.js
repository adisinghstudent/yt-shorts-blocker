// Redirect Shorts URLs to regular video player
(function() {
  'use strict';

  // Check if current URL is a Shorts URL and redirect
  function checkAndRedirect() {
    const url = window.location.href;
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);

    if (shortsMatch) {
      const videoId = shortsMatch[1];
      window.location.replace(`https://www.youtube.com/watch?v=${videoId}`);
    }
  }

  // Run on page load
  checkAndRedirect();

  // Watch for URL changes (YouTube uses SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      checkAndRedirect();
    }
  }).observe(document.documentElement, { subtree: true, childList: true });

  // Also handle history state changes
  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    checkAndRedirect();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    checkAndRedirect();
  };

  window.addEventListener('popstate', checkAndRedirect);
})();
