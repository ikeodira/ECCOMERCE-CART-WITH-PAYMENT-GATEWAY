//Cart
let TotalPrice;

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.addEventListener("click", ()=>{
    cart.classList.add("active");
})
closeCart.addEventListener("click", ()=>{
    cart.classList.remove("active");
})

// Cart Working JS
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}


// Making Function
function ready(){
    // Remove Items from Cart
    let removeCartButtons = document.querySelectorAll(".cart-remove");
    console.log(removeCartButtons);
    for(let i = 0; i<removeCartButtons.length; i++){
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Quantity Changes
    let quantityInputs = document.querySelectorAll(".cart-quantity");
    for(let i = 0; i<quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add To Cart
    let addCart = document.querySelectorAll(".add-cart");
    addCart.forEach(button =>{
        button.addEventListener("click", addCartClicked)
    })

    // Buy Button Work
    document.querySelector(".btn-buy").addEventListener("click", buyButtonClicked);

}

// Buy Button
function buyButtonClicked(){
    Tprice = TotalPrice.replace("$", "");
    FlutterwaveCheckout({        
        public_key: "FLWPUBK_TEST-83ff7f10c5e05bc7bea5fac09d797f6e-X",
        tx_ref: "titanic-48981487343MDI0NzMx",
        amount: parseFloat(Tprice),
        currency: "USD",
        payment_options: "card, mobilemoneyghana, ussd",
        redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
        meta: {
          consumer_id: 23,
          consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
          email: "rose@unsinkableship.com",
          phone_number: "08102909304",
          name: "Rose DeWitt Bukater",
        },
        customizations: {
          title: "The Titanic Store",
          description: "Payment for an awesome cruise",
          logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
        },
      });
    
    updateTotal();
}

// Remove Items From Cart
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove(); 
    updateTotal();
}

// Quantity Changed
function quantityChanged(event){ 
    let input = event.target;
    if(input.value <= 0 || isNaN(input.value)){
        input.value = 1;
    }
    updateTotal();
}

// Add To Cart
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.querySelector(".product-title").innerText;
    let price = shopProducts.querySelector(".price").innerText;
    let productImg = shopProducts.querySelector(".product-img").src;
    addProductToCart(title, price, productImg);
    updateTotal();    
}

function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.querySelector(".cart-content");
    let cartItemsNames = cartItems.querySelectorAll(".cart-product-title");
    for(let i = 0; i<cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText === title){
            alert("You have already added this item to the cart");
            return;
        }       
    }
    
    let cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- Remove Cart -->
            <i class="bx bxs-trash-alt cart-remove"></i>
            `;
    cartShopBox.innerHTML = cartBoxContent;  
    cartItems.append(cartShopBox);
    cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
    cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged)

}





//Update Total
function updateTotal(){
    let cartContent = document.querySelector(".cart-content");
    let cartBoxes = cartContent.querySelectorAll(".cart-box");
    console.log(cartBoxes);
    let total = 0;
    cartBoxes.forEach((cartBox)=>{
        let quantityElement = cartBox.querySelector(".cart-quantity");
        let priceElement = cartBox.querySelector(".cart-price");        
        let price = parseFloat(priceElement.textContent.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    });
     // if price contain some cents value
    total = Math.round(total*100) / 100;
    TotalPrice = document.querySelector(".total-price").textContent = `$${total}`;      
       
}


 