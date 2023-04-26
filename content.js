// get the popup setting value from the storage
chrome.storage.sync.get("popupActive", function (result) {
  if (result.popupActive == undefined || result.popupActive == true) {
    //listen for mouseup and call showTextPopup function and send the event object to it
    document.addEventListener("mouseup", showTextPopup);
  }
});

//variable to hold the dark mode setting value
var darkMode = true;
//get the dark mode setting value from the storage
chrome.storage.sync.get("darkModeActive", function (result) {
  if (result.darkModeActive == undefined) {
    darkMode = true;
  } else {
    darkMode = result.darkModeActive;
  }
});

// function to show the text popup
function showTextPopup(event) {
  var popup = document.querySelector(
    ".popup-selectedtext-bing-ai-unique-class-name"
  );
  // if the click is on the popup, return
  if (
    event.target.classList.contains("popup-button-bing-ai-unique-class-name")
  ) {
    return;
  }

  if (popup) {
    //if the popup existing has the same text as the new one, remove it and return (the id of the popup is the text that was selected)
    if (popup.id == window.getSelection().toString()) {
      popup.remove();
      return;
    }
    popup.remove();
  }
  var textHighlighted = window.getSelection().toString();

  if (textHighlighted.length > 0 && textHighlighted.length < 1950) {
    //create a div element to hold the popup content
    var popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.zIndex = "99999";
    popup.style.top = event.pageY + "px";
    popup.style.left = event.pageX + 5 + "px";
    popup.style.overflow = "hidden";
    popup.style.background = "white";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow =
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
    popup.className = "popup-selectedtext-bing-ai-unique-class-name";
    // set the id of the popup to the text that is selected
    popup.id = textHighlighted;
    //insert in the popup 4 buttons, each one has an emoji that represents the action, one for summarization, one for explanation, one for answer questioning, one for translation
    popup.innerHTML = `
        <button class="popup-button-bing-ai-unique-class-name" id="summarize" style="background: none; border: none; outline: none; cursor: pointer; padding: 6px; padding-bottom:10px; margin: 0; font-size: 20px;" title="Summarize">📝 </button>
        <button class="popup-button-bing-ai-unique-class-name" id="explain" style="background: none; border: none; outline: none; cursor: pointer; padding: 6px;padding-bottom:10px; margin: 0; font-size: 20px;" title="Explain"> 📖 </button>
        <button class="popup-button-bing-ai-unique-class-name" id="answer" style="background: none; border: none; outline: none; cursor: pointer; padding: 6px;padding-bottom:10px; margin: 0;font-size: 20px;" title="Answer"> ❓ </button>
        <button class="popup-button-bing-ai-unique-class-name" id="translate" style="background: none; border: none; outline: none; cursor: pointer; padding: 6px;padding-bottom:10px; margin: 0;font-size: 20px;" title="Translate"> 🌐</button>
        `;
    //append the popup to the parent of the body element
    document.body.parentNode.appendChild(popup);
    //add an event listener to the popup
    popup.addEventListener("click", function (event) {
      // get the id of the button that was clicked (that is the prompt) and send it to the showPopup function along with the text that was selected
      showPopup(event.target.id, textHighlighted);
      popup.remove();
    });
  }
}

// function to show the bing ai popup
function showPopup(prompt, textToInject) {
  console.log(darkMode);
  try {
    //check if the popup is already open
    var popup = document.querySelector(".popup-bing-ai-unique-class-name");
    if (popup) {
      //if injectedText is not empty
      if (textToInject) {
        popup.classList.remove("hidden");
        popup.style.transform = "scale(1)";
        //get the iframe element
        var iframe = popup.querySelector("iframe");
        // send a message to the iframe to inject the text
        // this message will be received in the script loaded in the iframe
        iframe.contentWindow.postMessage(
          { prompt: prompt, textToInject: textToInject },
          "*"
        );
        return;
      }
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
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.zIndex = "99999";
    popup.style.top = "0";
    popup.style.right = "0";
    popup.style.width = "500px";
    popup.style.height = "600px";
    popup.style.display = "block";
    if (darkMode) {
      popup.style.background = "rgb(43,43,43)";
    } else {
      popup.style.background = "white";
    }
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

    var darkModeValue = "darkschemeovr";
    if (!darkMode) {
      darkModeValue = "lightschemeovr";
    }
    iframe.src = `https://edgeservices.bing.com/edgediscover/query?&FORM=SHORUN&udscs=1&udsnav=1&setlang=en-US&${darkModeValue}=1&features=udssydinternal&clientscopes=windowheader,coauthor,chat,&udsframed=1`;

    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "10px";
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    iframe.className = "popup-iframe-bing-ai-unique-class-name";

    //allow the iframe to copy to clipboard
    iframe.setAttribute("allow", "clipboard-write");

    // append the iframe to the popup
    popup.appendChild(iframe);

    // append the popup element to the document body
    document.body.parentNode.appendChild(popup);

    // use setTimeout to show the popup after a small delay
    // this will trigger the CSS transition and animate the transform property
    setTimeout(() => {
      popup.style.transform = "scale(1)";
      // this check is needed because the if the popup is just created, it could also be called with a textToInject parameter
      if (textToInject) {
        //get the iframe element
        var iframe = popup.querySelector("iframe");
        //wait for the iframe to load
        iframe.addEventListener("load", function () {
          // we wait a second to make sure the iframe is fully loaded, maybe this is not needed
          setTimeout(() => {
            // send a message to the iframe to inject the text
            iframe.contentWindow.postMessage(
              { textToInject: textToInject, prompt: prompt },
              "*"
            );
          }, 1000);
        });
      }
    }, 10);
  } catch (e) {}
}
