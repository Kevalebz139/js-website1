import {cart, removeFromCart, updateCartQuantity} from './cart.js';
import {products} from './products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {navbarShadow} from './common.js'


navbarShadow();

document.querySelector(".js-promocode-button").addEventListener("click", function(event) {
    event.preventDefault();
    
    let div = document.querySelector(".js-toggle-promocode");
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    } else {
        div.style.display = "none"; 
    }
});

function renderCartSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        

        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
            
        });

        cartSummaryHTML += `
        <div class="cart-grid js-cart-grid-${matchingProduct.id}">
            <div class="row mx-2 cart-grid-raw">
                <div class="col-sm-6 col-8">
                    <div class="product-information d-flex">
                        <div class="product-image">
                            <img src="${matchingProduct.image}" alt="image product">
                        </div>
                        <div class="product-data">
                            <p>${matchingProduct.name}</p>
                            <p>${(matchingProduct.priceCents / 100).toFixed(2)}</p>
                            <div class="d-flex"><p>Color:&nbsp;</p><p>${matchingProduct.color}</p></div>
                            
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-8 price-quantity-container align-items-start">
                    <div class="product-quantity-container">
                        <p>Quantity: ${cartItem.quantity}</p>
                    </div>
                    <div class="product-order-price">
                        $${((matchingProduct.priceCents * cartItem.quantity) / 100).toFixed(2)}
                    </div>
                    <div class="trash-can-button">
                        <button class="remove-from-cart-button js-remove-from-cart-button button-primary"
                        data-product-id="${matchingProduct.id}">
                        <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
        ;

    });

    document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-remove-from-cart-button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-grid-${productId}`);
            container.remove();
            // renderCartSummary();
            renderOrderSummary();
            updateCartQuantity();
            enterOrderDetails();
        });
    });
};
renderCartSummary();

function renderOrderSummary() {
    let subTotal = 0;
    const today = dayjs();
    const deliveryDate = today.add(4 , 'days');
    const formatDeliveryDate = deliveryDate.format('dddd, MMMM D');


    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        

        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
           
        });
        subTotal += Number(((matchingProduct.priceCents * cartItem.quantity) / 100).toFixed(2));
        
    });


    const orderSummaryHTML = `
        <div class="row">
            <div class="col-6">
                <p>Subtotal</p>
                <p>Delivery</p>
            </div>
            <div class="col-6 d-flex justify-content-end">
                <div><p>$${subTotal}</p>
                <p>FREE</p></div>
            </div>
        </div>
        <hr>
        <div class="row final-order">
            <div class="col-6">
                <p>Total</p>
            </div>
            <div class="col-6 d-flex justify-content-end">
                <p>$${subTotal}</p>
            </div>
        </div>
        <div class="text-center mt-3">
            <button class="checkout-button js-checkout-button">Enter Order Details</button>
            <small class="d-block text-muted mt-2">Expected Delivery By ${formatDeliveryDate}</small>
        </div>
    `
    document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;


};

function enterOrderDetails() {
    const orderDetails = document.querySelector('.js-checkout-button');
orderDetails.addEventListener('click', () => {
    if(cart.length === 0) {
        alert('Add something n cart');
    }
    else {
        window.location.href = "checkout.html";
    }
});
};

renderOrderSummary();
updateCartQuantity();
enterOrderDetails();

