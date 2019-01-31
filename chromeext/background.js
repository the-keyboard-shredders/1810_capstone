const dom = {};
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  dom.url = msg.url;
  dom.title = msg.title;
  dom.content = msg.content;
});

chrome.browserAction.onClicked.addListener(function() {
  fetch('http://localhost:4000/auth/me')
    .then(function(response) {
      return response.text();
    })
    .then(function(userId) {
      if (userId !== undefined) {
        const url = dom.url;
        const title = dom.title;
        const content = dom.content;
        const queryJSON = JSON.stringify({
          query: `
            mutation($userId: String $url: String $title: String $content: String) {
              addArticle(userId: $userId, url: $url, title: $title, content: $content){
                title
              }
            }
          `,
          variables: {
            url,
            title,
            content,
            userId
          }
        });
        fetch('http://localhost:4000/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: queryJSON
        })
          .then(response => {
            console.log(response.json());
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        chrome.tabs.create({url: 'index.html'});
      }
    });
});
