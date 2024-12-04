import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();  // Load environment variables from .env file

const app = express();
const apiKey = process.env.OPENWEATHER_API_KEY;  // OpenWeather API key from .env

const allowedOrigins = ['http://localhost:3000']; // React frontend during development
app.use(cors({ origin: allowedOrigins }));

// Route to fetch location data based on user input
app.get('/api/locations', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        // Use OpenWeather Geo API to get location data
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(500).json({ message: 'Failed to fetch location data from OpenWeather API' });
        }

        const data = await response.json();
        res.json(data);  // Send the location data back to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
