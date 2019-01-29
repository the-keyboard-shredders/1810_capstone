const grabDom = () => {
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

const Dom = grabDom();
console.log("content Dom", Dom);
chrome.runtime.sendMessage({
  url: Dom.url,
  title: Dom.title,
  content: Dom.content
});
