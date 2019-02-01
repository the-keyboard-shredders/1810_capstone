//fires when user clicks extension icon
function saveArticle() {
  const dom = {};
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let myTabId = tabs[0].id;
    chrome.tabs.sendMessage(myTabId, {msg: 'message here'}, function(response) {
      dom.url = response.url;
      dom.title = response.title;
      dom.content = response.content;
    });

    //verify userId here
    // all login is done server-side
    fetch('http://localhost:4000/auth/me')
      .then(function(response) {
        return response.text();
      })
      .then(function(userId) {
        //userId = mongoDB id
        //checks whether you've been redirected to HTML page (our login screen)
        //if not then take websitedata and send it to our server
        if (!userId.includes('DOCTYPE')) {
          const url = dom.url;
          const title = dom.title;
          const content = dom.content;
          //create input query in order to input data to our DB
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
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          chrome.tabs.create({url: 'index.html'});
        }
      });
  });
}
