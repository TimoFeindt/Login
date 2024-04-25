const express = require('express');
const app = express();
const db = require('./dbConnection')

//app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/login', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/login', (req, res) => {
    const userObj = req.body.userObj
    console.log(userObj)
    res.redirect('/login')
})

app.get('/userDashboard', async (req, res) => {
    console.log('USERDASHBOARD')
    try {
        const result = await db.query('SELECT * FROM users');
        console.log(result)
        console.log('Connection zur DB läuft')
        res.render('userDashboard')
    } catch (error) {
        res.send('Fehler in der Datenbank Connection ' + error)
    }
})

//app.set(express.static('index'))
app.listen(3000)