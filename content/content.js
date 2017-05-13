document.onkeydown = function(e) {
    console.log(e)
    if(e.key === 'Z') {
        // document.body.style = 'background: #f00'
        // do code to test other keys
    }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('here')
})