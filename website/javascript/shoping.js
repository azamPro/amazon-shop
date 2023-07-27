
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
      window.location.href='cart.html'
   
    });
  });



 