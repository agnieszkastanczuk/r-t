const productCardTemplate = document.querySelector("[data-product-template]");
const productCardContainer = document.querySelector(
  "[data-product-cards-container]"
);
const searchInput = document.querySelector("[data-search]");
const searchIcon = document.getElementById("search-icon");
const noProductsMessageContainer = document.getElementById(
  "no-products-message"
);
let products = [];

//searching
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = searchInput.value;
    productCardContainer.innerHTML = "";
    searchIcon.src = "./assets/loading-icon.png";
    fetchProducts(value);
  }
});

function fetchProducts(query) {
  fetch(`https://dummyjson.com/products/search?q=${query}&limit=5&delay=1000`)
    .then((res) => res.json())
    .then((data) => {
      searchIcon.src = "./assets/search_icon.png";

      if (data.products.length === 0) {
        noProductsMessageContainer.style.display = "block";
      } else {
        data.products.forEach((product) => {
          const card = productCardTemplate.content.cloneNode(true).children[0];
          noProductsMessageContainer.style.display = "none";

          const title = card.querySelector("[data-title]");
          const price = card.querySelector("[data-price]");

          title.textContent = product.title;
          price.textContent = `$${product.price}`;

          productCardContainer.append(card);

          products.push({
            title: product.title,
            price: product.price,
            element: card,
          });
        });
      }
    });
}

//show/hide search-label
const searchLabel = document.getElementById("search-label");

searchInput.addEventListener("input", () => {
  const inputValue = searchInput.value.trim();
  searchLabel.style.display = inputValue ? "block" : "none";
});

searchLabel.style.display = searchInput.value.trim() ? "block" : "none";
