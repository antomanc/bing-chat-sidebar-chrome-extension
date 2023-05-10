//listen for a windows message and print it to the console
const messageListener = (event) => {
  injectText(promptToText(event.data.prompt) + event.data.textToInject);
};

window.addEventListener("message", messageListener, false);

// function to inject text into the text area and send the message
const injectText = (text) => {
  // if the text is empty or not a string, or NaN, return
  if (!text || typeof text !== "string" || text == "NaN") {
    return;
  }
  // select all the elements needed to get to the text area
  const firstElement = document.querySelector(".cib-serp-main").shadowRoot;
  const secondElement = firstElement.querySelector(
    "#cib-action-bar-main"
  ).shadowRoot;
  // get the text area
  const textArea = secondElement.querySelector("textarea");
  // set the text area value to the text to inject
  textArea.value = text;
  // trigger the event to update the text area
  const event = new Event("input", { bubbles: true });
  textArea.dispatchEvent(event);
  // click the send button
  secondElement.querySelector(".button.primary").click();
}

// function to transform the short prompt to the full prompt text
const promptToText = (prompt) => {
  if (prompt === 'summarize') {
    return 'Summarize the following text: ';
  } else if (prompt === 'answer') {
    return 'Answer the following question: ';
  } else if (prompt === 'explain') {
    return 'Explain this: ';
  } else if (prompt === 'translate') {
    return 'Translate the following text: ';
  }
}
