const darkModeCheckBox = document.getElementById("darkModeActive");

// set the dark mode checkbox to the value stored in chrome storage or to false if it doesn't exist
const darkModeActiveCallback = (result) => {
  darkModeCheckBox.checked = result.darkModeActive ?? false;
};
chrome.storage.sync.get(["darkModeActive"], darkModeActiveCallback);

// add an onchange event listener to the dark mode checkbox
const darkModeCheckboxChangeEventHandler = () => {
  const value = darkModeCheckBox.checked;
  setDarkMode(value);
};
darkModeCheckBox.addEventListener("change", darkModeCheckboxChangeEventHandler);

// function to set the dark mode value
const setDarkMode = (value) => {
  chrome.storage.sync.set({ darkModeActive: value });
};

// function to set the popup value
const setPopup = (value) => {
  chrome.storage.sync.set({ popupActive: value });
};
