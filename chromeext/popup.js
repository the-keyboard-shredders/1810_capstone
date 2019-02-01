window.onload = function() {
  const loginBtn = document.getElementById('login');
  const saveBtn = document.getElementById('save');
  const logoutBtn = document.getElementById('logout');
  fetch('http://localhost:4000/auth/me')
    .then(function(response) {
      return response.text();
    })
    .then(function(googleId) {
      if (googleId.includes('DOCTYPE')) {
        saveBtn.setAttribute('disabled', true);
        logoutBtn.setAttribute('disabled', true);
      } else {
        loginBtn.setAttribute('disabled', true);
      }
    });
  loginBtn.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'http://localhost:4000/auth/login'
    });
  });
  saveBtn.addEventListener('click', function() {
    chrome.runtime.getBackgroundPage(function(bgWindow) {
      bgWindow.saveArticle();
    });
  });
  logoutBtn.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'http://localhost:4000/auth/logout'
    });
  });
};
