sessionStorage.setItem("sessionStarted", "true");
const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
});


let submitButton = document.getElementById('submit-btn-login');

submitButton.addEventListener('click', () => {
    let email = document.getElementById('email-login').value;
    let password = document.getElementById('password-login').value;
   
   if(email.length !=0 && password.length!=0){
    sendMessageToTheServer(`http://localhost:8080/retrieve?email=${email}&password=${password}`)
   }
    
    
})

const sendMessageToTheServer = async (url) => {
    // GET request 
    const request = await fetch(url);
    try {
        // Server Response 
        const userData = await request.json();
        if (userData.success == false) {
            // Show the user an error message 
            document.getElementById('error-msg-login').innerText='Email or password wrong'
        } else {
            // Set a session storage item
            sessionStorage.setItem("userData", JSON.stringify(userData));
            // Redirect user to home page
            window.location.href = `home.html`
        }

    } catch (error) {
        console.log(error)
    }
}


