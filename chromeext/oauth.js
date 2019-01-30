window.onload = function() {
  document.querySelector("button").addEventListener("click", function() {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      let init = {
        method: "GET",
        async: true,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        contentType: "json"
      };
      fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", init)
        .then(response => response.json())
        .then(function(data) {
          const email = data.email;
          chrome.storage.sync.set({ email: email });
          window.close();
        });
    });
  });
};
