function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// todos unmarked count
function setBadge(todos) {
  if (chrome.browserAction) {
    const count = todos.filter(todo => !todo.marked).length;
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
      setBadge(state.todos);
    });
    return store;
  };
}

export function saveDatas(mList) {
    for (var i in mList) {
        var mObj = mList[i];
        localStorage.setItem(mObj.url, JSON.stringify(mObj));
    }
}
export function getDatas() {
    var mList = [];
    for (var i in window.localStorage) {
        mList.push(JSON.parse(window.localStorage[i]));
    }
    return mList;
}
//不存在返回-1
export function getCount(url) {
    if (hasData(url)) {
        return JSON.parse(localStorage.getItem(url)).count;
    } else {
        return -1;
    }
}
//在原本Count基础上+1
function addCount(url) {
    if (hasData(url)) {
        var mData=JSON.parse(localStorage.getItem(url));
        mData.count++;
        localStorage.setItem(url,JSON.stringify(mData));
    }
}
//存在返回true,否则false
export function hasData(url) {
    var tmp = localStorage.getItem(url);
    if (tmp == null) {
        return false;
    } else {
        return true;
    }
}