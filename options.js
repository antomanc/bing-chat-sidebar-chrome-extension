const popupCheckBox = document.getElementById("popupActive");
const darkModeCheckBox = document.getElementById("darkModeActive");

// set the popup checkbox to the value stored in chrome storage or to true if it doesn't exist
chrome.storage.sync.get(["popupActive"], function (result) {
  if (result.popupActive == undefined) {
    popupCheckBox.checked = true;
  } else {
    popupCheckBox.checked = result.popupActive;
  }
});

// set the dark mode checkbox to the value stored in chrome storage or to false if it doesn't exist
chrome.storage.sync.get(["darkModeActive"], function (result) {
  if (result.darkModeActive == undefined) {
    darkModeCheckBox.checked = false;
  } else {
    darkModeCheckBox.checked = result.darkModeActive;
  }
});

// add an onchange event listener to the popup checkbox
popupCheckBox.addEventListener("change", function () {
  const value = popupCheckBox.checked;
  setPopup(value);
});

// add an onchange event listener to the dark mode checkbox
darkModeCheckBox.addEventListener("change", function () {
  const value = darkModeCheckBox.checked;
  setDarkMode(value);
});

// function to set the dark mode value
function setDarkMode(value) {
  chrome.storage.sync.set({ darkModeActive: value }, function () {});
}

// function to set the popup value
function setPopup(value) {
  chrome.storage.sync.set({ popupActive: value }, function () {});
}
