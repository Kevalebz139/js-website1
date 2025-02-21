import {products} from './products.js'
export let wishlist = JSON.parse(localStorage.getItem('wishlist'));

if (!wishlist) {
    wishlist = [{
        productId: "PROD-1001"
    },
    {
        productId: "PROD-1002"
    },
    {
        productId: "PROD-1003"
    }];
}

function saveWishlistToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export function addToWishlist(productId) {
    let matchingItem;
  
    wishlist.forEach((wishlistItem) => {
      if (productId === wishlistItem.productId) {
        matchingItem = wishlistItem;
      }
    });
  
    if (matchingItem) {
        return;
    } else {
      wishlist.push({
        productId: productId
      });
    }
    saveWishlistToStorage();
  };

  export function removeFromWishlist(productId) {
    const newWishlist = [];
    wishlist.forEach((wishlistItem) => {
        if (wishlistItem.productId !== productId) {
            newWishlist.push(wishlistItem);
        }
    });
    wishlist = newWishlist;
    saveWishlistToStorage();
  };

//   new changes
export function renderWishList() {
    const wishListButton = document.querySelector('.js-wishlist-page');
    wishListButton.innerHTML = `
        <section class="wishlist-section">
            <div class="wishlist">
                <div class="section-header">
                <h4 class="section-heading">Your Wishlist</h3>
                    <button class="hide-wishlist-button"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <hr>
                <div class="wishlist-container js-wishlist-container">
                    
                </div>
                <div class="page-switch-button">
                    <button class="go-to-cart-button">Go To Cart</button>
                </div>
            </div>
        </section>
        <div class="overlay"></div>
`;
renderWishlistSummary();
}


export function collapseWishList() {
    
    const button = document.querySelector('.js-wishlist-link');
    const wishList = document.querySelector('.wishlist-section');
    const hideButton = document.querySelector('.hide-wishlist-button');
    const overLay = document.querySelector('.overlay');
    function hideWishList () {
        wishList.classList.remove('show-wishlist');
    }
    function showWishList () {
        wishList.classList.add('show-wishlist');
    } 
    button.addEventListener('click', () => {
        showWishList();
    });

    hideButton.addEventListener('click', () => {
        hideWishList();
    });


    overLay.addEventListener('click', () => {
        hideWishList();
    });

}



 function renderWishlistSummary() {
      let wishlistSummaryHTML = '';
  
      wishlist.forEach((wishlistItem) => {
          const productId = wishlistItem.productId;
          
  
          let matchingProduct;
          products.forEach((product) => {
              if (product.id === productId) {
                  matchingProduct = product;
              }
              
          });
  
          wishlistSummaryHTML += `
            <div class="row">
                <div class="wishlist-item">
                    <div class="wishlist-image">
                        <img src="${matchingProduct.image}" alt="product image">
                    </div>
                    <div class="wishlist-item-details">
                        <p class="product-name">${matchingProduct.name}</p>
                        <label for="item-quantity-input-${matchingProduct.productNumber}">Quantity</label><br>
                        <input aria-label="item Quantity" aria-live="assertive" type="number" min="1" max="99" step="1" class="item-quantity-input js-item-quantity-input" id="${matchingProduct.productNumber}" value="1">
                    </div>
                    <div class="product-price">
                    ${(matchingProduct.priceCents / 100).toFixed(2)}
                    </div>
                </div>
                <hr>    
            </div>
          `
          ;
  
      });
  
      document.querySelector('.js-wishlist-container').innerHTML = wishlistSummaryHTML;
  };
