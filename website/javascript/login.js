const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
});


let submitButton = document.getElementById('submit-btn-login');

submitButton.addEventListener('click', () => {
    let email = document.getElementById('email-login').value;
    let password = document.getElementById('password-login').value;
   
   if(email.length !=0 && password.length!=0){
    console.log(email)
    sendMessageToTheServer(`http://localhost:8080/retrieve?email=${email}&password=${password}`)
   }
    
    
})

const sendMessageToTheServer = async (url) => {
    const request = await fetch(url);

    try {
        const response = await request.json();
        if (response == '1') {
            window.location.href = `home.html`
        } else {
            document.getElementById('error-msg-login').innerText='Email or password wrong'
        }

    } catch (error) {
        console.log(error)
    }
}


