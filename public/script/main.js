const loginButton = document.querySelector('[data-login]')
const username = document.querySelector('[data-username]')
const password = document.querySelector('[data-password]')

loginButton.addEventListener('click', () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    if (usernameValue === '') {
        console.log('username unvalid')
    }
    if (passwordValue === '') {
        console.log('password unvalid')
    }

    
})