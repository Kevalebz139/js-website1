import {cart, addToCart, updateCartQuantity} from './cart.js';
import {products} from './products.js';


let productsHTML = '';

products.forEach((product) => {
  productsHTML +=`
  <div class="product-container col-lg-3 col-md-6">
        <div class="product-image-container">
            <img class="product-image"
            src="${product.image}" data-image-number="${product.productNumber}">
        </div>
    
        <div class="product-name">
            ${product.name}
        </div>
        
        <div class="product-price mt-3">
            $${(product.priceCents / 100).toFixed(2)}
        </div>
        <div>
        <button class="add-to-cart-button js-add-to-cart button-primary mt-3"
            data-product-id="${product.id}">
            Add to Cart
        </button>
        </div>
    </div>
  `;
});
document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.product-image')
.forEach((image) => {
  image.addEventListener('mouseover', () => {
    const imageNumber = image.dataset.imageNumber;
    image.src = `/assets/images/image${imageNumber}.jpg`;
  });
  image.addEventListener('mouseout', () => {
    const imageNumber = image.dataset.imageNumber;
    image.src = `assets/images/product-image-${imageNumber}.jpg`;
  });
});

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents the div's click event from firing
      const productId = button.dataset.productId;//data-product-is is in kebab case and it automatically changes into camel case which is productId

      addToCart(productId);
      updateCartQuantity();
  
  });
});
