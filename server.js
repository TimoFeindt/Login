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
    let result = '';
    try {
        result = await db.query('SELECT * FROM users');
        const users = result.rows 
        console.log('Connection zur DB läuft')
        res.render('userDashboard', { users })
    } catch (error) {
        res.send('Fehler in der Datenbank Connection ' + error)
    }
})

// Kannich die als Middleware benutzen? -Erster Gedanke war ja jedoch ist mein zweiter Gedanke nein, da ich die Funktion erst ausführen kann nachdem ich eine Abfrage geleistet habe. 
const capitalizeFirstLetter = (word) => {
    const firstArray = Array.from(word);
    const arrayFirstLetter = firstArray[0].toUpperCase();
    const arrayWithoutFirstLetter = firstArray.slice(1);
    const arrayWithCapitalizedFirstLetter = arrayWithoutFirstLetter.unshift(arrayFirstLetter);
    const joinArray = arrayWithoutFirstLetter.join('')

    return joinArray
}

//app.set(express.static('index'))
app.listen(3000)