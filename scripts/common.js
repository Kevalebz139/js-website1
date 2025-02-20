export function navbarShadow(){
    document.addEventListener("DOMContentLoaded", () => {
      const navbar = document.getElementById("navbar");
    
      window.addEventListener("scroll", function () {
          if (window.scrollY > 50) {
              navbar.classList.add("nav-shadow");
          } else {
              navbar.classList.remove("nav-shadow");
          }
      });
    });
  };

  export function collapseNavbar() {
    const navBarButton = document.querySelector('.show-navbar-button');
    const navBar = document.querySelector('.collapsed-navbar');
    const fullNavBar = document.querySelector('.navbar-section');

    function hideNavBar () {
        navBar.classList.remove('show-navbar');
        fullNavBar.classList.remove('hidden-navbar-section');
    }
    function showNavBar () {
        navBar.classList.add('show-navbar');
        fullNavBar.classList.add('hidden-navbar-section');
    }
    navBarButton.addEventListener('click', () => {
        if (navBar.classList.contains('show-navbar')) {
            hideNavBar();
        } else {
            showNavBar();
        }
    });
}