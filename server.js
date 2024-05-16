const express = require('express');
const app = express();
const db = require('./dbConnection');


app.set('view engine', 'ejs')
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let userData = {};
let inputClass = {inputClass:''};

app.get('/login', (req, res)=> {
    res.render('index', inputClass)
})

app.post('/login', async (req, res, next) => {
    const userObj = req.body.userObj  
    const query = "SELECT username FROM users WHERE email='" + userObj.email + "' AND password='" + userObj.password + "'"
    //console.log(query)
    let result = '';
    try {
        result = await db.query(query);
        const users = result.rows 
        console.log('Connection zur DB läuft')
        userData = {name: users[0].username}
        res.redirect('/userDashboard');
    } catch (error) {
        console.log('error: ' + error)
        inputClass.inputClass =  'wrongInput'
        res.redirect('/login');
    }
})

app.get('/userDashboard', async (req, res) => {
    const jsonData = userData;
    inputClass.inputClass = '';
    res.render('userDashboard', {jsonData})
        
})

app.get('/register', (req,res)=> {
    res.sendFile(__dirname + '/public/register.html')
})

app.post('/register', async (req,res) => {
    const userName = req.body.newUser.username;
    const userEmail = req.body.newUser.email;
    const userPassword = req.body.newUser.password;
   
    let result = '';
    try {
        result = await db.query(`INSERT INTO users (username,email,password) VALUES ('${userName}', '${userEmail}', '${userPassword}')`);
        console.log('Einpflegen von User erfolgreich!')
    } catch (error) {
        res.send('Fehler beim Einpflegen in die Datenbank: ' + error)
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

app.listen(3000)