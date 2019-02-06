//config file houses websites and the classes that contain their text
const configFile = [
  { searchString: 'medium.com', class: 'postArticle-content js-postField' },
  { searchString: 'bloomberg', tag: 'p' },
  { searchString: 'nytimes.com', class: 'css-1ygdjhk evys1bk0' },
  { searchString: 'time.com', tag: 'p' },
  { searchString: 'wired.com', tag: 'p' },
  { searchString: 'cnn.com', class: 'zn-body__paragraph' }
];
/*
const configFile = [
  {
    searchString: 'default.default',
    title: {
      identifier: ''
    },
    content: {
      identifier: 'tag',
      name: 'p'
    }
  },
  {
    searchString: 'medium.com',
    title: {
      identifier: ''
    },
    content: {
      identifier: 'class',
      name: 'postArticle-content js-postField'
    }
  },
  {
    searchString: 'bloomberg',
    title: {
      identifier: ''
    },
    content: {
      identifier: 'tag',
      name: 'p'
    }
  },
  {
    searchString: 'nytimes.com',
    title: {
      identifier: ''
    },
    content: {
      identifier: 'class',
      name: 'css-1ygdjhk evys1bk0'
    }
  },
  {
    searchString: 'time.com',
    title: {
      identifier: ''
    },
    content: {
      identifier: 'tag',
      name: 'p'
    }
  },
  {
    searchString: 'wired.com',
    title: {
      identifier: ''
    },
    content: {
      identifier: 'tag',
      name: 'p'
    }
  },
  {
    searchString: 'cnn.com',
    title: {
      identifier: ''
    },
    content: {
      identifier: 'class',
      name: 'zn-body__paragraph'
    }
  }
];
*/
//function that parses configFile for matching url
//returns identifier used to parse doc
//default return is <p>

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
    let result = configFile.filter((address) => this.url.includes(address.searchString) !== -1);
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
      tempBody = Array.from(document.body.getElementsByClassName(this.articleType.class));
    } else if (this.articleType.tag) {
      tempBody = Array.from(document.body.getElementsByTagName(this.articleType.tag));
    }
    console.log(tempBody)
    // reduces tempBody array into string of only text separated by two line breaks
    // this is the content wished to display
    const joinedBody = tempBody.reduce((accumulator, current) => {
      accumulator.concat(`${current.innerText} \n\n`);
    }, '');

    return joinedBody;
  }
}
// const parseConfigFile = url => {
//   for (let i = 0; i < configFile.length; i++) {
//     let result = url.search(configFile[i].searchString);
//     if (result >= 0) {
//       return configFile[i];
//     }
//   }
//   return {tag: 'p'};
// };



// const getDom = () => {
//This is currently only for medium.com
//must reconfigure this
// const scrapedSite = new Scraped(document.URL, document.body, document.title);
// const title = document.title;
// let body = '';

//scan for url
// const whichID = parseConfigFile(url);

//assign body a class or tag to search for text
// if (whichID.class) {
//   body = document.body.getElementsByClassName(whichID.class);
// } else if (whichID.tag) {
//   body = document.body.getElementsByTagName(whichID.tag);
// }

// console.log('body here', scrapedSite.scrapedBody);

// const contentArr = [];
// for (let i = 0; i < body.length; i++) {
//   contentArr.push(body[i].innerText);
// }
// const content = contentArr.join('\n\n');
//   return scrapedSite;
// };

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.getArticle) {
    // const dom = getDom();
    const scrapedSite = new Scraped(document.URL, document.body, document.title);
    sendResponse(scrapedSite);
  } else if (msg.saved) {
    alert(msg.saved);
  } else if (msg.error) {
    alert(msg.error);
  }
});
