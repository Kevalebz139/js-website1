import {cart, addToCart, updateCartQuantity} from './cart.js';
import {products} from './products.js';
import { navbarShadow, collapseNavbar} from './common.js';
import {wishlist, renderWishList, collapseWishList, addToWishlist, renderWishlistSummary, updateWishlistButtons} from './wishlist.js';

navbarShadow();
collapseNavbar();
renderWishList();
collapseWishList();
let productsHTML = '';

products.forEach((product) => {
  productsHTML +=`
      <div class="product-container js-product-container col-lg-3 col-md-6" data-container-id="${product.id}">
        <div class="product-image-container" data-aos="flip-left" data-aos-duration="1000" data-aos-delay="100" data-aos-easing="ease-in-out">
            <img class="product-image default" src="${product.image}" data-image-number="${product.productNumber}">
            <img class="product-image hover" src="${product.hoverImage}" data-image-number="${product.productNumber}">
        </div>
    
        <div class="product-name">
            ${product.name}
        </div>
        
        <div class="product-price mt-3">
            $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-add-button">
          <button class="add-to-cart-button js-add-to-cart button-primary mt-3"
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
        <div class="wishlist-add-button">
          <button class="add-to-wishlist-button js-add-to-wishlist button-primary mt-3"
            data-product-id="${product.id}">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    `;
});
document.querySelector('.js-products-grid').innerHTML = productsHTML;

updateWishlistButtons();
let addToWishlistButton = document.querySelectorAll('.js-add-to-wishlist');
 

addToWishlistButton.forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const productId = button.dataset.productId;
    addToWishlist(productId);
    renderWishlistSummary();
  });
});

// document.querySelectorAll('.product-image')
// .forEach((image) => {
//   image.addEventListener('mouseover', () => {
//     const imageNumber = image.dataset.imageNumber;
//     image.src = `/assets/images/image${imageNumber}.jpg`;
//   });
//   image.addEventListener('mouseout', () => {
//     const imageNumber = image.dataset.imageNumber;
//     image.src = `assets/images/product-image-${imageNumber}.jpg`;
//   });
// });

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents the div's click event from firing
      const productId = button.dataset.productId;//data-product-is is in kebab case and it automatically changes into camel case which is productId

      addToCart(productId, 1);
      updateCartQuantity();
  
  });
});

document.querySelectorAll('.js-product-container')
.forEach((container) => {
  container.addEventListener('click', (event) => {
    if (event.target.closest(".js-add-to-cart") || event.target.closest(".js-add-to-wishlist")) {
      return;
  }
  
    const containerId = container.dataset.containerId;
    localStorage.setItem('container', containerId);
    window.location.href="product-details.html";
  });
});




