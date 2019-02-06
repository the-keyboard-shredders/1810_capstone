//config object houses websites and the classes that contain their text
const configFile = [
  {searchString: 'medium.com', class: 'postArticle-content js-postField'},
  {searchString: 'bloomberg', tag: 'p'},
  {searchString: 'nytimes.com', class: 'css-1ygdjhk evys1bk0'},
  {searchString: 'time.com', tag: 'p'},
  {searchString: 'wired.com', tag: 'p'},
  {searchString: 'cnn.com', class: 'zn-body__paragraph'}
];

class Scraped {
  constructor(url, body, title) {
    this.url = url;
    this.body = body;
    this.title = title;
    this.articleType = this.indentifier();
    this.content = this.getBody();
  }

  // specifies identifiers (by referencing configFile) used to scrape text
  indentifier() {
    let result = configFile.filter(address =>
      this.url.includes(address.searchString)
    );

    if (result.length === 1) {
      return result[0];
    } else {
      return configFile[0];
    }
  }

  // scrapes document.body using identifiers of selected configFile (class/tag/etc)
  getBody() {
    // returns an array of all dom.body elements that match the identifier
    let tempBody;
    if (this.articleType.class) {
      tempBody = Array.from(
        document.body.getElementsByClassName(this.articleType.class)
      );
    } else if (this.articleType.tag) {
      tempBody = Array.from(
        document.body.getElementsByTagName(this.articleType.tag)
      );
    }

    // reduces tempBody array into string of only text separated by two line breaks
    // this is the content wished to display
    const joinedBody = tempBody.reduce((accumulator, current) => {
      accumulator += `${current.innerText} \n\n`;
      return accumulator;
    }, '');

    return joinedBody;
  }
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.getArticle) {
    const scrapedSite = new Scraped(
      document.URL,
      document.body,
      document.title
    );
    sendResponse(scrapedSite);
  } else if (msg.saved) {
    alert(msg.saved);
  } else if (msg.error) {
    alert(msg.error);
  }
});
