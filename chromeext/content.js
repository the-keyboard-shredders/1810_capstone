//config file houses websites and the classes that contain their text
const configFile = [
  {searchString: 'medium.com', class: 'postArticle-content js-postField'},
  {searchString: 'bloomberg', tag: 'p'},
  {searchString: 'nytimes.com', class: 'css-1ygdjhk evys1bk0'},
  {searchString: 'time.com', tag: 'p'},
  {searchString: 'wired.com', tag: 'p'},
  {searchString: 'cnn.com', class: 'zn-body__paragraph'}
];

//function that parses configFile for matching url
//returns identifier used to parse doc
//default return is <p>
const parseConfigFile = url => {
  for (let i = 0; i < configFile.length; i++) {
    let result = url.search(configFile[i].searchString);
    if (result >= 0) {
      return configFile[i];
    }
  }
  return {tag: 'p'};
};

const getDom = () => {
  //This is currently only for medium.com
  //must reconfigure this
  const url = document.URL;
  const title = document.title;
  let body = '';

  //scan for url
  const whichID = parseConfigFile(url);

  //assign body a class or tag to search for text
  if (whichID.class) {
    body = document.body.getElementsByClassName(whichID.class);
  } else if (whichID.tag) {
    body = document.body.getElementsByTagName(whichID.tag);
  }

  console.log('body here', body);

  const contentArr = [];
  for (let i = 0; i < body.length; i++) {
    contentArr.push(body[i].innerText);
  }
  const content = contentArr.join('\n');
  return {url, title, content};
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.getArticle) {
    const dom = getDom();
    sendResponse({
      url: dom.url,
      title: dom.title,
      content: dom.content
    });
  } else if (msg.saved) {
    alert(msg.saved);
  } else if (msg.error) {
    alert(msg.error);
  }
});
