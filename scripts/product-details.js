import {products} from './products.js';
import {cart,addToCart,updateCartQuantity} from './cart.js';
import { navbarShadow, collapseNavbar} from './common.js';
import {wishlist, renderWishList, collapseWishList} from './wishlist.js';

navbarShadow();
collapseNavbar();
renderWishList();
collapseWishList();
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
const mainImage = document.querySelector('.js-main-image');
const itemQuantity = document.querySelector('.js-item-quantity-input');
const mainThumbnail = document.querySelector('.main-thumbnail');
const designThumbnail = document.querySelector('.design-thumbnail');

let itemQuantityValue;

itemName.innerHTML = matchingProduct.name;
itemId.innerHTML = matchingProduct.id;
itemPrice.innerHTML = `$${(matchingProduct.priceCents / 100).toFixed(2)}`;
itemColor.innerHTML = matchingProduct.color;
mainImage.src = matchingProduct.image;
button.dataset.productId = matchingProduct.id;
mainThumbnail.src = matchingProduct.image;
designThumbnail.src = matchingProduct.hoverImage;

button.addEventListener('click', (event) => {
    event.stopPropagation(); 
    const productId = button.dataset.productId;
    itemQuantityValue = Number(itemQuantity.value);
    console.log(itemQuantityValue);
    addToCart(productId, itemQuantityValue);
    updateCartQuantity();
});

mainThumbnail.addEventListener('click', () => {
    mainImage.src = matchingProduct.image;
});
designThumbnail.addEventListener('click', () => {
    mainImage.src = matchingProduct.hoverImage;
});