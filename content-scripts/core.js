window.onload = async function () {
  const searchButton = document.querySelector("button#search-icon-legacy");
  const inputFIeld = document.querySelector("input#search");
  let featureEnabled = false;

  // Retrieve the stored state on extension startup
  await chrome.storage.local.get(["featureEnabled"]).then((result) => {
    featureEnabled = result.featureEnabled || false;
  });

  // Watch for changes to the user's options & apply them
  chrome.storage.onChanged.addListener((changes, area) => {
    for (var key in changes) {
      if (key === "featureEnabled") {
        featureEnabled = changes.featureEnabled.newValue;
      }
    }
  });

  // user events
  searchButton.addEventListener("click", () => {
    if (featureEnabled) {
      performSearchNewTab(event);
    }
  });
  inputFIeld.addEventListener("keydown", function (e) {
    if (featureEnabled && e.key === "Enter") {
      performSearchNewTab(event);
    }
  });

  function performSearchNewTab(e) {
    e.stopImmediatePropagation();

    const newTabURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      inputFIeld.value
    )}`;
    chrome.runtime.sendMessage({ action: "createNewTab", url: newTabURL });

    inputFIeld.value = "";
    inputFIeld.focus();
  }
};
