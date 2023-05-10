// listen for the extension to be clicked and run the function showPopup
chrome.action.onClicked.addListener((tab) => {
  // get the value of the "darkModeActive" setting
  chrome.storage.sync.get("darkModeActive", (result) => {
    const { darkModeActive } = result;

    // pass the value of "darkModeActive" as an argument to "showPopup"
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        args: [darkModeActive ? true : false],
        function: showPopup,
      },
      () => chrome.runtime.lastError
    );
  });
});

// this function is needed only to open or close the popup when the extension icon is clicked
function showPopup(darkMode) {
  console.log(darkMode);
  try {
    //check if the popup is already open
    let popup = document.querySelector(".popup-bing-ai-unique-class-name");

    if (popup) {
      //if the popup is hidden, show it and return
      if (popup.classList.contains("hidden")) {
        popup.classList.remove("hidden");
        popup.style.transform = "scale(1)";
        return;
      }
      // if the popup is visible, hide it and return
      popup.style.transform = "scale(0)";
      popup.classList.add("hidden");
      return;
    }

    // if the popup doesn't exist, create it
    // create a div element to hold the popup content
    popup = document.createElement("div");

    popup.style.cssText = `
      position: fixed;
      z-index: 99999;
      top: 0;
      right: 0;
      width: 500px;
      height: 600px;
      display: block;
      background: ${darkMode ? "rgb(43, 43, 43)" : "white"};
      margin: 15px;
      border-radius: 10px;
      overflow: hidden;
      transform-origin: top right;
      transform: scale(0);
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      transition: transform 0.2s ease-in-out;
    `;

    popup.className = "popup-bing-ai-unique-class-name";

    // create an iframe element to hold the bing ai page
    const iframe = document.createElement("iframe");
    const darkModeValue = "darkschemeovr";
    if (!darkMode) {
      darkModeValue = "lightschemeovr";
    }
    iframe.src = `https://edgeservices.bing.com/edgediscover/query?&FORM=SHORUN&udscs=1&udsnav=1&setlang=en-US&${darkModeValue}=1&features=udssydinternal&clientscopes=windowheader,coauthor,chat,&udsframed=1`;
    iframe.style.cssText = `
      background: ${darkMode ? "rgb(43, 43, 43)" : "white"};
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 10px;
      margin: 0;
      padding: 0;
      background: ${darkMode ? "rgb(43, 43, 43)" : "white"};
    `;

    iframe.className = "popup-iframe-bing-ai-unique-class-name";

    //allow the iframe to copy to clipboard
    iframe.setAttribute("allow", "clipboard-read *; clipboard-write");

    // append the iframe to the popup
    popup.appendChild(iframe);

    // append the popup element to the document body
    document.body.parentNode.appendChild(popup);

    // use setTimeout to show the popup after a small delay
    // this will trigger the CSS transition and animate the transform property
    setTimeout(() => {
      popup.style.transform = "scale(1)";
    }, 10);
  } catch (e) {}
}
