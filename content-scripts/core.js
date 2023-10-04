window.onload = async function () {
  const searchButton = document.querySelector("button#search-icon-legacy");
  const inputFIeld = document.querySelector("input#search");
  let featureEnabled = false;

  // Retrieve the stored state on extension startup
  await chrome.storage.local.get(["featureEnabled"]).then((result) => {
    featureEnabled = result.featureEnabled || false;
  });

  // user events
  if (featureEnabled) {
    searchButton.addEventListener("click", performSearchNewTab);
    inputFIeld.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        performSearchNewTab(e);
      }
    });
  }

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
