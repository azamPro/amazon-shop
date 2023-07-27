// In your main JavaScript file
let user = JSON.parse(sessionStorage.getItem("userData"));

let firstRow = document.querySelector('.tit');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let total = document.getElementById('total');
console.log(user)
window.addEventListener('load', () => {
    for (let i = 0; i < user.cart.length; i++) {
        let newRow = `
        <tr>
            <td >
                <div class=" cart-info">
                    <div '>
                        <p  '>${user.cart[i].itemName}</p>
                        <small >Price: ${user.cart[i].cost}$</small>
                        <br>
                    </div>
                </div>
            </td>
            <td >${user.cart[i].numberOfItems}</td>
            <td  >${user.cart[i].cost}</td>
        </tr>`;
        firstRow.insertAdjacentHTML('afterend', newRow);

        // Select the remove button and add an event listener

    }
    price.innerText = user.totalCost;
    tax.innerText = calculateTax();
    total.innerText = user.totalCost + calculateTax();

});

// Calculate the tax
function calculateTax() {
    const taxRate = 0.15; // 15% tax rate
    const tax = taxRate * user.totalCost;
    return tax;
}