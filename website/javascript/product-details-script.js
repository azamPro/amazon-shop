let ProductImg = document.getElementById("ProductImg")
let btn =document.getElementsByClassName("btn")

btn[0].onclick = function(){
    ProductImg.src = "image/71LhJ2ssqbL._AC_SX679_.jpg";


    for (bt of btn){
        bt.classList.remove("active");
    }
    this.classList.add('active');
}


btn[1].onclick = function(){
    ProductImg.src = "image/91WCME041EL._AC_SX679_.jpg";
    for (bt of btn){
        bt.classList.remove("active");
    }
    this.classList.add('active');
}


btn[2].onclick = function(){
    ProductImg.src = "image/71HMLWj9JsL._AC_SX679_.jpg";
    for (bt of btn){
        bt.classList.remove("active");
    }
    this.classList.add('active');
}
