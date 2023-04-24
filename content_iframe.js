//listen for a windows message and print it to the console
window.addEventListener(
  "message",
  function (event) {
    // before injecting the text, transform the short prompt to the full prompt text and add it to the text to inject
    injectText(promptToText(event.data.prompt) + event.data.textToInject);
  },
  false
);

// function to inject text into the text area and send the message
function injectText(text) {
  // select all the elements needed to get to the text area
  var firstElement = document.querySelector(".cib-serp-main").shadowRoot;
  var secondElement = firstElement.querySelector(
    "#cib-action-bar-main"
  ).shadowRoot;
  // get the text area
  var textArea = secondElement.querySelector("textarea");
  // set the text area value to the text to inject
  textArea.value = text;
  // trigger the event to update the text area
  const event = new Event("input", { bubbles: true });
  textArea.dispatchEvent(event);
  // click the send button
  secondElement.querySelector(".button.primary").click();
}

// function to transform the short prompt to the full prompt text
function promptToText(prompt) {
  if (prompt == "summarize") {
    return "Summarize the following text: ";
  }
  if (prompt == "answer") {
    return "Answer the following question: ";
  }
  if (prompt == "explain") {
    return "Explain this: ";
  }
  if (prompt == "translate") {
    return "Translate the following text: ";
  }
}