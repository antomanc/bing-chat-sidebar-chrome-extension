const waitForElement = (selector, context = document) => {
  return new Promise((resolve) => {
    if (context.querySelector(selector)) {
      const element = context.querySelector(selector);

      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      const foundElement = mutations.find((record) => !!Array.from(record.addedNodes).find((node) => node.matches(selector)));

      if (foundElement) {
        resolve(foundElement);
        observer.disconnect();
        return;
      }
    });

    observer.observe(context.getRootNode(), {
      childList: true,
      subtree: true,
    });
  });
};

const injectText = (prompt, textToInject) => {
  // if the prompt is empty or not a string, or NaN, return
  if (!prompt || typeof prompt !== "string" || prompt == "NaN") {
    return;
  }
  if (!textToInject || typeof textToInject !== "string" || textToInject == "NaN") {
    return;
  }

  if (prompt === 'summarize') {
    prompt = 'Summarize the following text: ';
  } else if (prompt === 'answer') {
    prompt = 'Answer the following question: ';
  } else if (prompt === 'explain') {
    prompt = 'Explain this: ';
  } else if (prompt === 'translate') {
    prompt = 'Translate the following text: ';
  } else {
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
  textArea.value = prompt + textToInject;
  // trigger the event to update the text area
  const event = new Event("input", { bubbles: true });
  textArea.dispatchEvent(event);
  // click the send button
  secondElement.querySelector(".button.primary").click();
};

//listen for a windows message and print it to the console
const messageListener = async (event) => {
  await waitForElement('.cib-serp-main');

  injectText(event.data.prompt, event.data.textToInject);
};

window.addEventListener("message", messageListener, false);
