"use strict";
//originally created by sveagruva

chrome.storage.sync.get(['enabled'], function(result) {
    if(result.enabled !== true)
        return;

    var observed = [];
    const recurseRemoveByL = (rule, element) => {
        var parent = element.parentElement;
        while(true){
            if(parent.tagName == "HTML")
                return false;
            
            if(rule(parent)){
                if(observed.includes(parent))
                    return true;

                parent.style.display = "none";
                // removing result in big slow downs in cast script of which I don't have control, so I just hide it
                new MutationObserver(mutations => parent.style.display = "none").observe(parent, {attributes: true});
                // script might show it again but this undos his work
                observed.push(parent);
                // observer pattern (not accualy)

                return true;
            }

            element = parent;
            parent = element.parentElement;
        }
    };

    const removeButton = e => recurseRemoveByL(element => element.tagName == "BUTTON", e);
    const check = element => element.getAttribute("d") == "M27,9 L9,9 C7.9,9 7,9.9 7,11 L7,14 L9,14 L9,11 L27,11 L27,25 L20,25 L20,27 L27,27 C28.1,27 29,26.1 29,25 L29,11 C29,9.9 28.1,9 27,9 L27,9 Z M7,24 L7,27 L10,27 C10,25.34 8.66,24 7,24 L7,24 Z M7,20 L7,22 C9.76,22 12,24.24 12,27 L14,27 C14,23.13 10.87,20 7,20 L7,20 Z M7,16 L7,18 C11.97,18 16,22.03 16,27 L18,27 C18,20.92 13.07,16 7,16 L7,16 Z";
    
    const potentials = [
        "path#ytp-id-22", // youtube.com
        "path#ytp-id-21" // iframes
    ];

    potentials.forEach(selector => document.querySelectorAll(selector).forEach(element => (element != null && check(element)) && removeButton(element)));

    // document.head.parentElement.setAttribute("data-cast-api-enabled", "false"); // it's ignoring it so 
    // var element = document.querySelector('video'); // youtube video element
    // if src changes page did reloaded without reloading and youtube player get new button
    // new MutationObserver(mutations => doIt).observe(element, {attributes: true});
    // not actually checking for src cz lazy
});