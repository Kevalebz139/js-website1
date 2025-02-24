import {products} from './products.js'
export let wishlist = JSON.parse(localStorage.getItem('wishlist'));

if (!wishlist) {
    wishlist = [
    // {
    //     productId: "PROD-1001"
    // },
    // {
    //     productId: "PROD-1002"
    // }
];
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
        // return;
        removeFromWishlist(matchingItem.productId);
        renderWishlistSummary();
        console.log(wishlist);
    } else {
      wishlist.unshift({
        productId: productId
      });
    }
    saveWishlistToStorage();
    renderWishlistSummary();
    updateWishlistButtons();
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
    renderWishlistSummary();
    updateWishlistButtons();
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
document.querySelector('.go-to-cart-button').addEventListener('click', () => {
    window.location.href='orders.html';
});
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



 export function renderWishlistSummary() {
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
                        <p class="product-color">${matchingProduct.color}</p>
                    </div>
                    <div class="price-block">
                    <div class="product-price">
                    ${(matchingProduct.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="view-product">
                    <button class="js-view-product-button" data-product-id="${matchingProduct.id}">View Product</button>
                    </div>
                    </div>
                </div>
                <hr>    
            </div>
          `
          ;
  
      });
  
      document.querySelector('.js-wishlist-container').innerHTML = wishlistSummaryHTML;
  };

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll('.js-view-product-button')
        .forEach(button => {
            button.addEventListener('click', () => {
                const containerId = button.dataset.productId;
                localStorage.setItem('container', containerId);
                window.location.href="product-details.html";
            });
        });
    });



  export function updateWishlistButtons() {
    document.querySelectorAll('.js-add-to-wishlist').forEach(button => {
        const productId = button.getAttribute('data-product-id');
  
        const isInWishlist = wishlist.some(item => item.productId === productId);
  
        const icon = button.querySelector('i');
  
        if (isInWishlist) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid', 'active');
        } else {
            icon.classList.remove('fa-solid', 'active');
            icon.classList.add('fa-regular');
        }
    });
  }
  
  updateWishlistButtons(); 

