const bluebird = require('bluebird');
import { getDataIndex, saveDatas, clearStorage, addCount } from '../../app/utils/storage'

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (typeof request.greeting !== 'undefined' && request.greeting === "hello") {
            const data = getDataIndex()
            sendResponse({farewell: data});
        } else if (typeof request.href !== 'undefined') {
            addCount(request.href);
            sendResponse({status: 'ok'});
        } else {
            sendResponse(request);
        }
    });

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');
