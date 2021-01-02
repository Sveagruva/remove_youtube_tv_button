"use strict";
//originally created by sveagruva

chrome.storage.sync.get(['enabled'], async result => {
    if(result.enabled !== true)
        return;

    const sleep = m => new Promise(r => setTimeout(r, m));
    const getElement = async selectror => {
        while(true){
            if(document.querySelector(selectror) != null)
                return document.querySelector(selectror);
            else
                await sleep(100);
        }
    };

    const recurseRemove = element => {
        var parent = element.parentElement;
        while(true){
            if(parent.tagName == "HTML")
                return false;
            
            if(parent.tagName == "BUTTON"){
                parent.classList.add("remove_yb_tv_button_123323_ok_unique_i_hope");
                return true;
            }

            element = parent;
            parent = element.parentElement;
        }
    };

    const check = element => element.getAttribute("d") == "M27,9 L9,9 C7.9,9 7,9.9 7,11 L7,14 L9,14 L9,11 L27,11 L27,25 L20,25 L20,27 L27,27 C28.1,27 29,26.1 29,25 L29,11 C29,9.9 28.1,9 27,9 L27,9 Z M7,24 L7,27 L10,27 C10,25.34 8.66,24 7,24 L7,24 Z M7,20 L7,22 C9.76,22 12,24.24 12,27 L14,27 C14,23.13 10.87,20 7,20 L7,20 Z M7,16 L7,18 C11.97,18 16,22.03 16,27 L18,27 C18,20.92 13.07,16 7,16 L7,16 Z";
    
    const potentials = [
        "path#ytp-id-22", // youtube.com
        "path#ytp-id-21" // iframes
    ];

    const checkPotentials = () => potentials.forEach(selector => document.querySelectorAll(selector).forEach(element => (element != null && check(element)) && recurseRemove(element)));
    checkPotentials();

    const ytd_app = await getElement("ytd-app");

    new MutationObserver(mutations => {
        checkPotentials();
    }).observe(ytd_app, {attributes: true});
});