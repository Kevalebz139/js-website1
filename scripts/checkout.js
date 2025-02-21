import {updateCartQuantity} from "./cart.js";
import { navbarShadow, collapseNavbar} from './common.js';
import {wishlist, renderWishList, collapseWishList} from './wishlist.js';

navbarShadow();
collapseNavbar();
renderWishList();
collapseWishList();
updateCartQuantity();