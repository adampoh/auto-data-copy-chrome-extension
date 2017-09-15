chrome.tabs.getSelected(null, function(tab) {
    var tabId = tab.id;
    var tabUrl = tab.url;
    // alert(tabUrl.indexOf('filcker'));
    if (tabUrl.indexOf('flickr') > 0) {
        getInfo();
    }
    if (tabUrl.indexOf('getty') > 0) {
        putInfo();
    }
});

chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        window.close();
        // document.body.innerText = request.source;
    }
    if (request.action == "putSource") {
        window.close();
        // document.body.innerText = request.source;
    }
});

//button click event
copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', getInfo);

pasteBtn = document.getElementById('pasteBtn');
pasteBtn.addEventListener('click', putInfo);

//button click event configuration

function getInfo() {
    chrome.tabs.executeScript(null, {
        file: "getSource.js"
    }, function() {
        if (chrome.extension.lastError) {
            alert('There was an error injecting scripts!');
        }
    });
}

function putInfo() {
    chrome.tabs.executeScript(null, {
        file: "putSource.js"
    }, function() {
        if (chrome.extension.lastError) {
            alert('There was an error injecting scripts!');
        }
    });
}