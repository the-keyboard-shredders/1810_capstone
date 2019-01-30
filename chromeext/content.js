const grabDom = () => {
  //This is currently only for medium.com
  const domHead = document.head;
  const domBody = document.body;
  const url = domHead.getElementsByTagName("link")[0].href;
  const title = domHead.getElementsByTagName("title")[0].innerHTML;
  const body = domBody.getElementsByClassName(
    "postArticle-content js-postField js-notesSource js-trackPostScrolls"
  );
  const contentArr = [];
  for (let i = 0; i < body.length; i++) {
    contentArr.push(body[i].innerText);
  }
  const content = contentArr.join("\n");
  return { url, title, content };
};

const dom = grabDom();
chrome.runtime.sendMessage({
  url: dom.url,
  title: dom.title,
  content: dom.content
});
