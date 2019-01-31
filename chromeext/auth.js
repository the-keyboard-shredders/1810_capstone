window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.tabs.update({
      url: 'http://localhost:4000/auth/login'
    });
  });
};
