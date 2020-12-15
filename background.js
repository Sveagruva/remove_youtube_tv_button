chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        chrome.storage.sync.set({"enabled": true}, function(){});
    }else if(details.reason == "update") {
        // chrome.storage.sync.set({"enabled": true}, function(){});
    }
});

chrome.browserAction.onClicked.addListener(() => {
    chrome.storage.sync.get("enabled", prefs => {
        chrome.storage.sync.set({"enabled": !prefs.enabled}, function(){});

        if(prefs.enabled){
            chrome.browserAction.setIcon({
                path : {
                    "16": "icons/16_enabled.png",
                    "48": "icons/48_enabled.png",
                    "128": "icons/128_enabled.png"
                }
            });
        }else{
            chrome.browserAction.setIcon({
                path : {
                    "16": "icons/16_disabled.png",
                    "48": "icons/48_disabled.png",
                    "128": "icons/128_disabled.png"
                }
            });
        }
    })
});