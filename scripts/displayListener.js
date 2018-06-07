chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({/*active: true, currentWindow: true*/}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, {message: 'display'}, function (response) {});
        }
        /*chrome.tabs.sendMessage(tabs[0].id, {}, function (response) {
          window.alert('hello world');
        });*/
    });
});