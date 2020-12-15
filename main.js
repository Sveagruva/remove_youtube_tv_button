"use strict";
//originally created by sveagruva

chrome.storage.sync.get(['enabled'], function(result) {
    if(result.enabled !== true)
        return;

    let element = document.querySelector('#ytp-id-22');
    console.log(element);
    if(element == null)
        return;
    element.parentElement.parentElement.remove();
});