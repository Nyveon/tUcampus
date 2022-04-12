/**
 * Updates a setting to a new value
 */
 function change_setting(key, value) {
    chrome.storage.local.get("settings", function (data) {
        const settings = data["settings"] ?? {};
        settings[key] = value
        chrome.storage.local.set({"settings": settings}, function () {
            console.log("Setting updated.")
        });
        window.close()
    });
}

/**
 * Inserts the value into the placeholder of the text field
 */
function initialize_field(key, value) {
    const input_field = document.getElementById(key);
    input_field.value = value;
}



document.addEventListener('DOMContentLoaded', function () {
    // Get the settings
    chrome.storage.local.get("settings", function (data) {
        const settings = data["settings"] ?? {};

        initialize_field("homepage-url", settings["homepage-url"] ?? "ucampus.uchile.cl");

        // Add event listeners to the buttons
        document.getElementById("homepage-url-button").addEventListener("click", function () {
            const homepageUrl = document.getElementById("homepage-url").value;
            change_setting("homepage-url", homepageUrl);
        });
    });
});