window.onload = function () {
  const searchButton = document.querySelector("button#search-icon-legacy");
  const inputFIeld = document.querySelector("input#search");

  searchButton.addEventListener("click", function (e) {
    e.stopImmediatePropagation();

    const newTabURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      inputFIeld.value
    )}`;
    chrome.runtime.sendMessage({ action: "createNewTab", url: newTabURL });
  });
};
