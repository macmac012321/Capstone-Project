const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/joke', async (req, res) => {
    const { name } = req.body;
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?type=single&contains=${name}`);
        const joke = response.data.joke;
        res.render('joke', { joke, name });
    } catch (error) {
        console.error(error);
        res.send('Oops! Something went wrong fetching the joke.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
