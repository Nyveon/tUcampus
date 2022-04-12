// Creates settings on first load of the extension
chrome.runtime.onInstalled.addListener(function() {
    const settings = {
        "homepage-url": "ucampus.uchile.cl",
    }

    chrome.storage.local.set({"settings": settings}, function() {
        console.log("tUcampus: Default settings set successfully.");
    });
});

let homepageUrl = "ucampus.uchile.cl"

// Update settings on storage change
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        const storageChange = changes[key];
        if (key == "settings") {
            homepageUrl = storageChange.newValue["homepage-url"];
        }
    }
});

// Function to add https to a url if necessary
function addHttps(url) {
    if (url.startsWith("http://")) {
        return "https://" + url.substring(7);
    } else if (url.startsWith("https://")) {
        return url;
    } else {
        return "https://" + url;
    }
}

// Adds the redirect listener
chrome.storage.local.get("settings", function (data) {
    const settings = data["settings"] ?? {};
    homepageUrl = settings["homepage-url"] ?? homepageUrl;

    // Add a listener that redirects to homepageUrl if the current url is the ucampus url
    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            return {redirectUrl: addHttps(homepageUrl)};
        }
        ,
        {urls: ["*://ucampus.uchile.cl/"]},
        ["blocking"]
    );
});

