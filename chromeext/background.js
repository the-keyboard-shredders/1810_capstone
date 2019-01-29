const Dom = {};
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  Dom["url"] = msg.url;
  Dom["title"] = msg.title;
  Dom["content"] = msg.content;
  console.log("bg dom", Dom);
});

let email = "";
chrome.storage.sync.get("email", function(result) {
  email = result.email;
  console.log("EMAIL: ", email);
});

chrome.browserAction.onClicked.addListener(function() {
  if (email !== "") {
    const title = Dom.title;
    const content = Dom.content;
    const queryJSON = JSON.stringify({
      query: `
        mutation($title: String $content: String) {
          addArticle(title: $title, content: $content){
            title
          }
        }
    `,
      variables: {
        title,
        content
      }
    });
    fetch("http://headless-capstone-1810.herokuapp.com/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: queryJSON
    })
      .then(response => {
        console.log("res to query\n\n\n", response.json());
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    chrome.tabs.create({ url: "index.html" });
  }
});

// chrome.browserAction.onClicked.addListener(function() {
//   chrome.tabs.create({ url: "index.html" });
// });

// chrome.storage.sync.get("email", function(result) {
//   console.log("RESULT: ", result.email);
// });
