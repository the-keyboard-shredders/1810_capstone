const dom = {};
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  dom.url = msg.url;
  dom.title = msg.title;
  dom.content = msg.content;
});

let userId = '';
fetch('http://localhost:4000/auth/me')
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    userId = data;
  });

chrome.browserAction.onClicked.addListener(function() {
  if (userId !== '') {
    const title = dom.title;
    const content = dom.content;
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
    fetch('http://headless-capstone-1810.herokuapp.com/', {
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
