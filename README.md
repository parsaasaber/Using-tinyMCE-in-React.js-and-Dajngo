## TinyMCE editor, integrating with React.js and Django
This is a simple React-based web application that allows users to manage a list of names and images. Users can add items by submitting their names and descriptions through a form, and the data is displayed in a table. The application uses TinyMCE as a rich text editor and document uploader and Axios for HTTP requests to interact with a backend server.

### Features
* Add new items with names and descriptions and documents.
* Display a list of items with their names and HTML-formatted descriptions.
* Use TinyMCE for rich text editing.
* Sanitize input to prevent XSS attacks using DOMPurify.
* Fetch and display student data from a backend API.
### Technologies Used
* React: Frontend library for building the UI.
* Axios: For making HTTP requests to the backend.
* TinyMCE: Rich text editor used for editing the items description.
* DOMPurify: Library used for sanitizing user input to prevent XSS attacks.
* CSS: For basic styling.
## Setup Instructions
### Prerequisites
* Node.js and npm installed on your machine.
* A backend server running at http://127.0.0.1:8000 with appropriate API endpoints.
## Installation
### Clone the repository:
```
git clone https://github.com/parsaasaber/Using-tinyMCE-in-React.js-and-Dajngo.git

cd TinyMCE_React_Django
```
### Install the dependencies:

```
npm install
```
### Start the development server:

```
npm start
```
This will start the React development server at http://localhost:3000.

### Backend API
The app expects the following backend API routes to be available:

* GET /app/view/: Retrieves all items from the backend.
* POST /app/create/: Saves a new item with name and description fields.
### Adding Items
* Fill in the item's name in the input field.
* Use the TinyMCE editor to enter the item's description (supports rich text).
* Click the "SUBMIT" button to send the data to the backend and refresh the list of students.
### Dependencies
* `axios`: For handling HTTP requests.
* `@tinymce/tinymce-react`: For integrating the TinyMCE editor.
* `dompurify`: For sanitizing the HTML content before submission.
## Code Overview
### App Component
The main component, `App`, handles:
* State Management: Uses React's useState to manage the list of students, loading status, and the rich text editor content.
* Refs: useRef is used to manage references to the item's name and description fields.
* Effects: useEffect is used to fetch item data when the component mounts or when new data is added.
* Editor: TinyMCE rich text editor for handling the description input.
* Sanitization: Uses DOMPurify to clean the HTML content before sending it to the server.
### Functions:
* `handleEditorChange`: Updates the content state when the editor's content changes.
* `handleSubmit`: Handles form submission, sanitizes the content, and sends a POST request to the server.
* `useEffect`: Fetches the item data on component mount and after submission.# Using-tinyMCE-in-React.js-and-Dajngo
