const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
});


let submitButton = document.getElementById('submit-btn-login');

submitButton.addEventListener('click', () => {
    let email = document.getElementById('email-login').value;
    let password = document.getElementById('password-login').value;
    console.log(email)
    sendMessageToTheServer(`http://localhost:8080/retrieve?email=${email}.com&password=${password}`)
})

const sendMessageToTheServer = async (url) => {
    const request = await fetch(url);

    try {
        const response = await request.json();
        if (response == 1) {
           window.location.href = 'home.html'
        } else {

        }

    } catch (error) {
        console.log(error)
    }
}


