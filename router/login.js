const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('Login')
})

module.exports = login