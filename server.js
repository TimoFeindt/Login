const express = require('express');
const app = express();

app.use(express.static('public'))
//app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))

app.post('/', (req, res) => {
    const username = req.body.inputUsername
    const password = req.body.înputPassword
    console.log(username)
    res.redirect('/')
})

app.get('/', (req, res) => {
    
    res.render('index')
})

app.set(express.static('index'))
app.listen(3000)