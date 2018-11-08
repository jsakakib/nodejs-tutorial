const express = require('express');
const router = express.Router();

app.get('/', (req, res) => {
    res.render('index', { title: 'My First Express App', message: 'Hello World from Express App!!!' });
});

module.exports = router;