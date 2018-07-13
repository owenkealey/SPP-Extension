chrome.identity.getProfileUserInfo(function(info) { email = info.email; });
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(email)
});