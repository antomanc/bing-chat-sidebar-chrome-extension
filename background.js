// Called when the user clicks on the extension's icon.
chrome.action.onClicked.addListener((tab) => {
  try {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: simulatePopup,
      },
      () => chrome.runtime.lastError
    );
  } catch (e) {}
});

// function to show/hide the popup
function simulatePopup() {
  try {
    //check if the popup is already open
    var popup = document.querySelector(".popup-bing-ai-unique-class-name");
    if (popup) {
      //if the popup has the hidden class, show it
      if (popup.classList.contains("hidden")) {
        popup.classList.remove("hidden");
        popup.style.transform = "scale(1)";
        return;
      }
      // if the popup is already open, close it
      popup.style.transform = "scale(0)";
      // add 'hidden' class to the popup to hide it
      popup.classList.add("hidden");
      return;
    }
    // create a div element to hold the popup content
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.zIndex = "99999";
    popup.style.top = "0";
    popup.style.right = "0";
    popup.style.width = "500px";
    popup.style.height = "600px";
    popup.style.display = "block";
    popup.style.background = "grey";
    popup.style.margin = "15px";
    popup.style.borderRadius = "10px";
    popup.style.overflow = "hidden";
    popup.style.border = "1px solid black";
    popup.className = "popup-bing-ai-unique-class-name";
    popup.style.transformOrigin = "top right";
    popup.style.transform = "scale(0)";
    popup.style.boxShadow =
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";
    popup.style.transition = "transform 0.2s ease-in-out";

    // create an iframe element to hold the bing ai page
    var iframe = document.createElement("iframe");
    iframe.src =
      "https://edgeservices.bing.com/edgediscover/query?&lightschemeovr=2&FORM=SHORUN&udscs=1&udsnav=1&setlang=en-US&features=udssydinternal&clientscopes=windowheader,coauthor,chat,&udsframed=1";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "10px";
    iframe.style.margin = "0";
    iframe.style.padding = "0";

    // append the iframe to the popup
    popup.appendChild(iframe);

    // append the popup element to the document body
    document.body.parentNode.appendChild(popup);

    // use setTimeout to show the popup after a small delay
    // this will trigger the CSS transition and animate the transform property
    setTimeout(() => {
      // set the transform property to scale up the popup to normal size
      // this will make the popup visible and expand from the top right corner
      popup.style.transform = "scale(1)";
    }, 50);
  } catch (e) {}
}
