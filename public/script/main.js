const loginButton = document.querySelector('[data-login]')
const username = document.querySelector('[data-username]')
const password = document.querySelector('[data-password]')
const email = document.querySelector('[data-email]')

loginButton.addEventListener('click', async () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();
    console.log(usernameValue)
    if (usernameValue === '') {
        console.log('username unvalid')
    }
    if (passwordValue === '') {
        console.log('password unvalid')
    }
    if (emailValue === '') {
        //TODO: genauere specificationen für email
        console.log('email unvalid')
    }

    const userObj = {
        username: usernameValue,
        password: passwordValue,
        email: emailValue
    }

    try {
        const response = await fetch(`/login`, {
            method: 'POST',
            body: JSON.stringify({userObj}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.body)
        if (response.ok) {
            // DAten Übermittlung erfolgreich, Aktualisierung der Anzeige oder Weiterleitung
        } else {
            console.error('Fehler beim Weiterleiten des Usernamen');
        }
    } catch (error) {
        console.error('FFehler beim Weiterleiten des Usernamen', error);
    }
})