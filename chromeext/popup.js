window.onload = function() {
  const loginBtn = document.getElementById('login');
  const saveBtn = document.getElementById('save');
  const logoutBtn = document.getElementById('logout');
  fetch('https://headless-capstone-1810.herokuapp.com/auth/me')
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
      url: 'https://headless-capstone-1810.herokuapp.com/auth/login'
    });
  });
  saveBtn.addEventListener('click', function() {
    chrome.runtime.getBackgroundPage(function(bgWindow) {
      bgWindow.saveArticle();
    });
  });
  logoutBtn.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'https://headless-capstone-1810.herokuapp.com/auth/logout'
    });
  });
};
