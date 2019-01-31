const getDom = () => {
  //This is currently only for medium.com
  const url = document.URL;
  const title = document.title;
  const body = document.body.getElementsByClassName(
    'postArticle-content js-postField js-notesSource js-trackPostScrolls'
  );
  const contentArr = [];
  for (let i = 0; i < body.length; i++) {
    contentArr.push(body[i].innerText);
  }
  const content = contentArr.join('\n');
  return {url, title, content};
};

const dom = getDom();
chrome.runtime.sendMessage({
  url: dom.url,
  title: dom.title,
  content: dom.content
});
