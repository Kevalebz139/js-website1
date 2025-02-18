import {products} from './products.js';
import {navbarShadow} from './common.js';
import {cart,addToCart,updateCartQuantity} from './cart.js';

navbarShadow();
updateCartQuantity();
const containerId = localStorage.getItem('container');
console.log(containerId);
let matchingProduct;
products.forEach((product) => {
    if ( containerId === product.id) {
        matchingProduct = product;
    }
});

const itemName = document.querySelector('.js-item-name');
const itemId = document.querySelector('.js-item-id');
const itemPrice = document.querySelector('.js-item-price');
const itemColor = document.querySelector('.js-item-color');
const button = document.querySelector('.js-add-to-cart');
const itemImage = document.querySelector('.js-item-image');
const itemQuantity = document.querySelector('.js-item-quantity-input');
let itemQuantityValue;

itemName.innerHTML = matchingProduct.name;
itemId.innerHTML = matchingProduct.id;
itemPrice.innerHTML = `$${(matchingProduct.priceCents / 100).toFixed(2)}`;
itemColor.innerHTML = matchingProduct.color;
itemImage.src = matchingProduct.image;
button.dataset.productId = matchingProduct.id;

button.addEventListener('click', (event) => {
    event.stopPropagation(); 
    const productId = button.dataset.productId;
    itemQuantityValue = itemQuantity.value;
    console.log(itemQuantityValue);
    addToCart(productId);
    updateCartQuantity();
});
