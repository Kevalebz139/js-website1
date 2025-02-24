export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: "PROD-1001",
        quantity: 2,
    },
    {
        productId: "PROD-1002",
        quantity: 5,
    },
    {
        productId: "PROD-1003",
        quantity: 3,
    }];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId, itemQuantityValue) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += itemQuantityValue;
    } else {
      cart.unshift({
        productId: productId,
        quantity: itemQuantityValue
      });
    }
    saveToStorage();
  };

  export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
  };

  export function updateCartQuantity() {
    let cartQuantity = 0;
    
    
    if (cart) {
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      })
    }
    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
};