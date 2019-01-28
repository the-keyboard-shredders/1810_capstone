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
      fetch(
        "https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=<API_Key_Here>",
        init
      )
        .then(response => response.json())
        .then(function(data) {
          console.log(data);
        });
    });
  });
};

// const Dom = {};
// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//   Dom["url"] = msg.url;
//   Dom["title"] = msg.title;
//   Dom["content"] = msg.content;
//   console.log("bg dom", Dom);
// });

// const title = Dom.title;
// const content = Dom.content;
// const queryJSON = JSON.stringify({
//   query: `
//         mutation($title: String $content: String) {
//           addArticle(title: $title, content: $content){
//             title
//           }
//         }
//     `,
//   variables: {
//     title,
//     content
//   }
// });
// fetch("http://headless-capstone-1810.herokuapp.com/", {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   },
//   body: queryJSON
// })
//   .then(response => {
//     console.log("res to query\n\n\n", response.json());
//   })
//   .catch(err => {
//     console.log(err);
//   });
