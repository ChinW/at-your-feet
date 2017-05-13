chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log('tab x')
	if (tab.url.indexOf("www.baidu.com") > -1) {
		console.log(123)
		chrome.tabs.sendMessage(tabId, { keyword: "123" }, function (response) {});
	}
});