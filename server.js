const express = require('express');
const app = express();
const db = require('./dbConnection')


app.set('view engine', 'ejs')
app.use('/login', express.static(__dirname + '/public')); 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let userData = {};

app.post('/login', (req, res) => {
    const userObj = req.body.userObj
    console.log(JSON.stringify(userObj) + ' from post')
    
    userData = userObj
    // check ob email und pw in db sind und übereinstimmen und dann redirect nach userDashboard
    res.redirect('/login')
})

app.get('/userDashboard', async (req, res) => {
    const userObj = userData
    console.log(userObj)
    const userEmail = userObj.email
    const userPassword = userObj.password

    //get username from db where email & pw are equal to

    console.log(userEmail)
    console.log(userPassword)
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

app.get('/data', (req, res) => {
    res.json( {message: 'Hello World'} );
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

//app.set(express.static('index'))
app.listen(3000)