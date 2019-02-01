window.onload = function() {
  document.getElementById('login').addEventListener('click', function() {
    chrome.tabs.update({
      url: 'http://localhost:4000/auth/login'
    });
  });
  document.getElementById('save').addEventListener('click', function() {
    chrome.runtime.getBackgroundPage(function(bgWindow) {
      bgWindow.saveArticle();
    });
  });
  document.getElementById('logout').addEventListener('click', function() {
    chrome.tabs.update({
      url: 'http://localhost:4000/auth/logout'
    });
  });
};
