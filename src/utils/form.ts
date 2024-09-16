import { isInputError } from "astro:actions";

export default class Form {
	// Private method to clear the previous message by its ID
	private static clearPreviousMessage(id: string) {
	  const messageElement = document.getElementById(id);
	  if (messageElement) {
		messageElement.remove();
	  }
	}
  
	// Private method to add a new message element inside a given element
	private static addMessageElement(message: string, parentElement: HTMLElement) {
	  // Create a new paragraph element for the message
	  const p = document.createElement("p");
  
	  // Set the id, className, and innerText for the paragraph
	  p.id = "message"; // Ensure a unique ID if multiple messages are needed
	  p.className = "message text-pink-300 mt-2 px-2";
	  p.innerText = message;
  
	  // Append the paragraph to the parent element
	  parentElement.appendChild(p);
	}
  
	// Static method to render the message based on error or data
	static renderMessage(error: any, data: any, form: HTMLFormElement, url: URL) {
	  // Clear previous message if it exists
	  this.clearPreviousMessage('message'); // Ensure previous messages are removed
  
	  // Check if there’s an error
	  if (error && isInputError(error)) {
		const message = error.fields.email && error.fields.email[0];
		this.addMessageElement(message || "", form);
	  } else {
		if (data?.strapiErrors) {
		  const message = data?.strapiErrors.message;
		  this.addMessageElement(message, form);
		} else {
		  setTimeout(() => {
			window.location.replace(url.href); // Redirect to a URL
		  }, 1000);
		}
	  }
	}
  
	
  }
  