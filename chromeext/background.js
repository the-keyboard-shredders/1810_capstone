//fires when user clicks save article button
function saveArticle() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let myTabId = tabs[0].id;
    chrome.tabs.sendMessage(myTabId, { getArticle: 'get article' }, function (
      response
    ) {
      if (!response) {
        chrome.tabs.sendMessage(myTabId, {
          error: 'There was an error! Article was not saved.'
        });
      } else if (!response.url || !response.title || !response.content) {
        chrome.tabs.sendMessage(myTabId, {
          error: 'There was an error! Article was not saved.'
        });
      } else {
        const dom = {};
        dom.url = response.url;
        dom.title = response.title;
        dom.content = response.content;
        fetch('https://headless-capstone-1810.herokuapp.com/auth/me')
          .then(function (response) {
            return response.text();
          })
          .then(function (googleId) {
            const url = dom.url;
            const title = dom.title;
            const content = dom.content;
            //create input query in order to input data to our DB
            const queryJSON = JSON.stringify({
              query: `
            mutation($googleId: String! $url: String! $title: String! $content: String!) {
              addArticle(googleId: $googleId, url: $url, title: $title, content: $content){
                title
              }
            }
          `,
              variables: {
                url,
                title,
                content,
                googleId
              }
            });
            //posting our article data to our DB
            fetch('https://headless-capstone-1810.herokuapp.com', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: queryJSON
            })
              .then(response => {
                if (response.status === 200) {
                  chrome.tabs.sendMessage(myTabId, { saved: 'Saved!' });
                }
              })
              .catch(err => {
                console.error(err);
              });
          });
      }
    });
  });
}
