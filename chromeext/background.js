const Dom = {};
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  Dom["url"] = msg.url;
  Dom["title"] = msg.title;
  Dom["content"] = msg.content;
  console.log("bg dom", Dom);
});

let userEmail = "";
chrome.storage.sync.get("email", function(result) {
  userEmail = result.email;
  console.log("EMAIL: ", userEmail);
});

chrome.browserAction.onClicked.addListener(function() {
  if (userEmail !== "") {
    const title = Dom.title;
    const content = Dom.content;
    const queryJSON = JSON.stringify({
      query: `
        mutation($title: String $content: String $userEmail: String) {
          addArticle(title: $title, content: $content, userEmail: $userEmail){
            title
          }
        }
    `,
      variables: {
        title,
        content,
        userEmail
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
