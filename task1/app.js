//dropdown
document.addEventListener("DOMContentLoaded", function () {
  let dropdowns = document.querySelectorAll(".dropdown-btn");

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("click", function () {
      let dropdownContent = this.nextElementSibling;

      closeOtherDropdowns(this);

      if (dropdownContent.style.display === "flex") {
        dropdownContent.style.display = "none";
        dropdown.classList.remove("up");
      } else {
        dropdownContent.style.display = "flex";
        dropdown.classList.add("up");
      }
    });
  });
});

function closeOtherDropdowns(clickedDropdown) {
  let allDropdowns = document.querySelectorAll(".dropdown-btn");

  allDropdowns.forEach(function (dropdown) {
    if (dropdown !== clickedDropdown) {
      let dropdownContent = dropdown.nextElementSibling;

      dropdownContent.style.display = "none";
      dropdown.classList.remove("up");
    }
  });
}

//mobile-menu
function toggleNavList() {
  let mobileMenuBtn = document.getElementById("mobile-menu");
  let navList = document.getElementById("nav-list");

  navList.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");
}
