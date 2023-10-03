chrome.runtime.onMessage.addListener(async function (request) {
  if (request.action === "createNewTab") {
    chrome.tabs.create({ url: request.url });
  }
});
