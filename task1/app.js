//

document.addEventListener("DOMContentLoaded", function () {
  let dropdowns = document.querySelectorAll(".dropdown-btn");

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("click", function () {
      let dropdownContent = this.nextElementSibling;
      let icon = this.querySelector("img");

      if (dropdownContent.style.display === "flex") {
        dropdownContent.style.display = "none";
        icon.src = "./assets/icon_down.png";
        dropdown.classList.remove("up");
      } else {
        dropdownContent.style.display = "flex";
        icon.src = "./assets/icon_up.png";
        dropdown.classList.add("up");
      }
    });
  });
});

//mobile-menu
function toggleNavList() {
  let mobileMenuBtn = document.getElementById("mobile-menu");
  let navList = document.getElementById("nav-list");

  navList.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");
}
