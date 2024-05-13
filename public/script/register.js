//Register new User

const newUserName = document.querySelector('[data-register-username]');
        const newUserPassword = document.querySelector('[data-register-password]');
        const newUserEmail = document.querySelector('[data-register-email]');
        const registerButton = document.querySelector('[data-register-button]');

        registerButton.addEventListener('click', async () => {
            const newUser = {
                username: newUserName.value,
                email: newUserEmail.value,
                password: newUserPassword.value,
            }
            await submitNewUserData(newUser);
            
            newUserName.value = '';
            newUserEmail.value = '';
            newUserPassword.value = '';
        })

        const submitNewUserData = async (newUser) => {        
            try {
                const response = await fetch(`/register`, {
                    method: 'POST',
                    body: JSON.stringify({newUser}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            if (response.ok) {
                // Daten Übermittlung erfolgreich, Aktualisierung der Anzeige oder Weiterleitung
            } else {
                console.error('Fehler beim Weiterleiten des Usernamen');
            }
            } catch (error) {
                console.error('Fehler beim Weiterleiten des Usernamen', error);
            }
        }