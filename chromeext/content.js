const getDom = () => {
  //This is currently only for medium.com
  const url = document.URL;
  const title = document.title;
  const body = document.body.getElementsByClassName(
    'postArticle-content js-postField'
  );
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
