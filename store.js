//Have code check document is loaded than try to acess 
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

//set up event listners
function ready(){

    //select remove buttons and add an event to them 

    //returns all the different elemeent of our page with btn danger
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    //store buttons with that exact class 

    console.log(removeCartItemButtons);

    //add eventlistner so now we need to loop through each one.


    for(var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
    }


    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked);
    }
    
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked);




}//end of ready 

function purchaseClicked(){
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();

}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value || input.value <= 0)){
        input.value = 1;
    }

    updateCartTotal();
} 

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title, price,imageSrc);
    addItemToCart(title , price , imageSrc);
    updateCartTotal();

function addItemToCart(title, price , imageSrc){
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        var cartItems = document.getElementsByClassName('cart-items')[0];
        //cartItems.append(cartRow);
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
        for( var i = 0; i < cartItemNames.length; i++){
            if(cartItemNames[i].innerText == title){
                alert('The item is already added to the cart');
                return; //exists the method 
            }
        }
        var cartRowContents = `
        
            <div class="cart-item cart-column">
                <img class="cart-item-image" src = "${imageSrc}" width = 100 height = 100 >
                <span class="cart-item-title"> ${title} </span>
            </div>

            <span class="cart-price cart-column"> ${price}</span>

            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type = "number" value = 1>
                <button class="btn btn-danger cart-quantity-button" role = "button">REMOVE</button>
            </div>`
        
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);

        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    }
}






//go through every single row in our cart and find price and times by quantiy and add
function updateCartTotal(){
    //returns array of elements but retursn the first 
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        console.log(priceElement, quantityElement);
        var price = parseFloat(priceElement.innerText.replace('$', ''));

        var quantity = quantityElement.value;
        console.log(price);
        console.log(quantity);
        total = total + (price * quantity);

    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText ='$' + total;



   // cartItemCOntainer.getElementsByClassName('cart-row')

}
