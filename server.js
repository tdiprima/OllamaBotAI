// node server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;

const ollamaModel = 'mistral';  // The model to use

app.use(express.json());
app.use(express.static('public'));

// API route to send a request to Ollama
app.post('/api/query', async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }
    try {
        console.log(`Received prompt: ${prompt}`);
        const response = await axios.post('http://localhost:11434/api/generate', { 
            prompt,
            model: ollamaModel
        });
        console.log('Ollama response:', response.data);  // Log the response from Ollama
        res.json(response.data);  // Send the response back to the client
    } catch (error) {
        console.error('Error communicating with Ollama:', error.message);
        if (error.response) {
            console.error('Ollama API response:', error.response.data);
            res.status(500).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Failed to communicate with Ollama' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
