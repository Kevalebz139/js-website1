let productsHTML = '';

products.forEach((product) => {
  productsHTML +=`
  <div class="product-container col-lg-3 col-md-6">
        <div class="product-image-container">
            <img class="product-image"
            src="${product.image}">
        </div>
    
        <div class="product-name">
            ${product.name}
        </div>
        
        <div class="product-price mt-3">
            $${(product.priceCents / 100).toFixed(2)}
        </div>
    
        <div class="added-to-cart">
            <img src="/assets/images/checkmark.png">
            Added
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


document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      let matchingItem;

      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        });
      }

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

        console.log(cart);

  });
});