# Ollama Web Interface
A web interface to ollama

## Ollama Web Interface Setup and Communication

The `server.js` file is necessary because it sets up an API endpoint that the web interface in 
`index.html` can communicate with to send and receive requests from the Ollama model. Here's a 
breakdown of what happens in each part:

1. **HTML File (index.html):**
   - The HTML contains a form with a textarea for user input and a submit button.
   - When the user clicks the submit button, an event listener is triggered in JavaScript that 
fetches data from the `/api/query` endpoint using the POST method.
   - The `fetch` request sends the user's prompt to the backend server.

2. **Node.js Server (server.js):**
   - This script runs a local HTTP server using Node.js Express framework.
   - It defines a single route (`/api/query`) that listens for POST requests from the client-side 
JavaScript code.
   - When this route receives a request, it extracts the prompt from the body of the request and 
sends it to the Ollama API (using axios in this case).
   - The Ollama API then processes the input prompt using the specified model (in this case, 
`mistral`), generating a response.
   - The server then converts the JSON string returned by the Ollama API into an array of JavaScript 
objects and sends it back to the client in its original format.

In summary, the server-side code (`server.js`) is required because it acts as an intermediary between 
the web interface (client-side JavaScript) and the Ollama model itself, allowing it to handle 
requests, communicate with the Ollama API, and relay the responses back to the client for display in 
the web interface.

## Why not just use HTML for everything?

1. **Separation of Concerns**: Separating the frontend UI logic (`index.html`) and 
backend server logic (`server.js`) helps in organizing code better and makes maintenance easier. It 
also avoids cluttering your client-side JavaScript with business logic or security concerns that are 
more appropriately handled on the server.
2. **Security**: Keeping API endpoints on the server ensures they can't be accessed directly by end 
users, which is a crucial step towards securing your application. If you were to handle all 
interactions in `index.html`, it would expose internal APIs and potentially sensitive data or 
functionalities to potential attackers or malicious users.
3. **Performance**: Handling computationally heavy tasks or network-intensive operations on the 
client side (in the browser) can lead to a poor user experience, as the browser might freeze or slow 
down. By offloading these tasks to the server with `server.js`, you ensure that the client remains 
responsive and improves overall performance.
4. **Scalability**: When your application grows, handling everything in one file (`index.html`) can 
become unwieldy and harder to scale. Using a backend service like Express (in `server.js`) allows you 
to handle more requests efficiently, manage state better, and deploy services separately if needed.

### Conclusion:
While it might seem simpler at first to bundle everything into one HTML file, splitting the 
responsibilities between client-side and server-side code is a best practice in web development that 
enhances maintainability, security, performance, and scalability. This separation of concerns allows 
for more robust, secure, and efficient applications.

## CORS

Also, using `server.js` helps avoid Cross-Origin Resource Sharing (CORS) errors.

Here's how:

### What is CORS?
Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers to prevent 
JavaScript code from making requests to a different domain than the one that served the original
(HTML, CSS, JS etc.). This is enforced by most modern web browsers.

When your `index.html` runs in a browser and tries to make an HTTP request to a different origin 
(domain) than the one it was served from (which would be typical if you're trying to communicate with 
an external API like Ollama), the browser will automatically block this request unless the server at 
the other origin explicitly allows it. This is where CORS comes in.

### How does server.js handle CORS?
When you set up a server using Express (`server.js`), you can configure it to include specific 
headers that tell browsers whether or not they should allow requests from different origins.

<mark>**This application fixed the cors error, even without adding the cors module.**

But anyway, here is an example of how to set up the `cors` middleware:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Your other routes go here...

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
```

This will allow any domain to make cross-origin requests to your server.

Install the `cors` package:

```shell
npm install cors
# or
yarn add cors
```

<br>
