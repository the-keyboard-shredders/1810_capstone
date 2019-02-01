//fires when user clicks save article button
function saveArticle() {
  const dom = {};
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let myTabId = tabs[0].id;
    chrome.tabs.sendMessage(myTabId, {getArticle: 'get article'}, function(
      response
    ) {
      if (response) {
        dom.url = response.url;
        dom.title = response.title;
        dom.content = response.content;
      } else {
        console.log('Invalid Response');
      }
    });
    fetch('http://localhost:4000/auth/me')
      .then(function(response) {
        return response.text();
      })
      .then(function(googleId) {
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
            chrome.tabs.sendMessage(myTabId, {saved: 'Saved!'});
          })
          .catch(err => {
            console.log(err);
          });
      });
  });
}
