
const buyButtons = document.querySelectorAll('.buy-btn');

let user= JSON.parse(sessionStorage.getItem("userData"));

let addToCart= (user,item)=>{
    
    for(let i =0;i<user.cart.length;i++){
        if(user.cart[i].itemName== item.itemName){
            user.cart[i].numberOfItems++;
            user.cart[i].cost+=item.cost;
            user.totalCost+=item.cost
            return;
        }
    }
    user.cart.push({itemName:item.itemName,numberOfItems:1,cost:item.cost})
    user.totalCost+=item.cost
   
}
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      

      addToCart(user,{itemName:button.getAttribute('name'),cost:parseFloat(button.dataset.price)})
      sessionStorage.setItem("userData", JSON.stringify(user));

      // Update user's cart items
     updateCart('http://localhost:8080/addItems',user);
      // Redirect user to cart page
      window.location.href='cart.html'
   
    });
  });


let updateCart= async (url,user)=>{
    let request= await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(user),
      });
      try{
        let respone= await request.json()
        console.log(respone)
      }catch(error){
        console.log(error)
      }

}
 