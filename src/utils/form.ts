export default class Form {
	// Static method to clear the previous message by its ID
	static clearPreviousMessage(id: string) {
	  const messageElement = document.getElementById(id);
	  if (messageElement) {
		messageElement.remove();
	  }
	}
  
	// Static method to add a new message element inside a given element
	static addMessageElement(message: string, parentElement: HTMLElement) {
	  // Create a new paragraph element for the message
	  const p = document.createElement("p");
  
	  // Set the id, className, and innerText for the paragraph
	  p.id = "message"; // Ensure a unique ID if multiple messages are needed
	  p.className = `message text-pink-300 mt-2 px-2`;
	  p.innerText = message;
  
	  // Append the paragraph to the parent element
	  parentElement.appendChild(p);
	}
  }
  