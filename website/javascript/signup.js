const form2 = document.getElementById('signup-form');

form2.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
});

let submitButton2 = document.getElementById('submit-btn-signup');

submitButton2.addEventListener('click', () => {
    let email2 = document.getElementById('email-signup').value;
    let password2 = document.getElementById('password-signup').value;
    let name = document.getElementById('name-signup').value;
   
   if(email2.length !=0 && password2.length!=0 && name.length!=0){
    console.log(email2)
    RegisterUser(`http://localhost:8080/addUser`,{email: email2,name:name, password: password2,cart:[]});
  }
    
   
})

const RegisterUser= async (url,data)=>{
    const request= await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
      });

      try{
        const response= await request.json();
        if (response == '1') {
            window.location.href = `home.html`
        } else {
            document.getElementById('error-msg-signup').innerText='Email is already taken'
        }

      }catch(error){
        console.log(error)
      }

}

