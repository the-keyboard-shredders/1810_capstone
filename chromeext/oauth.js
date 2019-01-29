// document.addEventListener("DOMContentLoaded", function() {
//   document.querySelector("button").addEventListener("click", function() {
//     //   chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
//     //     chrome.tabs.sendMessage(tabs[0].id, "hi");
//     //   });
//     // });
//     chrome.identity.getAuthToken({ interactive: true }, function(token) {
//       console.log("Token", token);
//       let init = {
//         method: "GET",
//         async: true,
//         headers: {
//           Authorization: "Bearer " + token,
//           "Content-Type": "application/json"
//         },
//         contentType: "json"
//       };
//     });
//   });
// });

window.onload = function() {
  document.querySelector("button").addEventListener("click", function() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      let email = "";
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
            email = data.email;
            console.log("DATA", data);
            console.log("EMAIL", email);
          });
      });
      console.log("TABS: ", tabs);
      chrome.tabs.sendMessage(tabs[0].id, { email: email });
    });
  });
};
