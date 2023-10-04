document.addEventListener("DOMContentLoaded", async function () {
  const featureCheckbox = document.getElementById("switch");

  // Retrieve the stored checkbox state on popup opening
  await chrome.storage.local.get(["featureEnabled"]).then((result) => {
    featureCheckbox.checked = result.featureEnabled || false;
  });

  featureCheckbox.addEventListener("change", function () {
    chrome.storage.local
      .set({ featureEnabled: featureCheckbox.checked })
      .then(() => {
        console.log("Value is set");
      });
  });
});
