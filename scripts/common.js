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