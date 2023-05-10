const popupCheckBox = document.getElementById("popupActive");
const darkModeCheckBox = document.getElementById("darkModeActive");

// set the popup checkbox to the value stored in chrome storage or to true if it doesn't exist
chrome.storage.sync.get(["popupActive"], function (result) {
  popupCheckBox.checked = result.popupActive ?? true;
});

// set the dark mode checkbox to the value stored in chrome storage or to false if it doesn't exist
chrome.storage.sync.get(["darkModeActive"], function (result) {
  darkModeCheckBox.checked = result.darkModeActive ?? false;
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
const setDarkMode = (value) => {
  chrome.storage.sync.set({ darkModeActive: value }, function () {});
};

// function to set the popup value
const setPopup = (value) => {
  chrome.storage.sync.set({ popupActive: value }, function () {});
};
