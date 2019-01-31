//fires when user clicks extension icon
chrome.browserAction.onClicked.addListener(function() {
  const dom = {};
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var myTabId = tabs[0].id;
    chrome.tabs.sendMessage(myTabId, 'message here');
  });

  //receives document info from content.js page (page user wants to keep)
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log('sent from here', sender.tab.id);

    dom.url = msg.url;
    dom.title = msg.title;
    dom.content = msg.content;

    //verify userId
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
          console.log(dom);
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
});
