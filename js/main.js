import { data } from "../data/stock.js";
import { Article } from "./Article.js";

// ! gestion panier
const btnOpenCart = document.querySelector("#btn-open-cart");
const btnCloseCart = document.querySelector("#btn-close-cart");
const cart = document.querySelector("#cart-container");
const cardContainer = document.querySelector("#card-container");
const cartItemContainer = document.querySelector("#cart-item-container");
const cartArray = [];

btnOpenCart.addEventListener("click", openCart);
function openCart() {
  cart.classList.remove("translate-x-0");
}

btnCloseCart.addEventListener("click", closeCart);
function closeCart() {
  cart.classList.add("translate-x-0");
}

//ajout article
function addToCart() {
  openCart();
  cartItemContainer.innerHTML += `<li class="flex py-6">
  <div
    class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
  >
    <img
      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
      class="h-full w-full object-cover object-center"
    />
  </div>

  <div class="ml-4 flex flex-1 flex-col">
    <div>
      <div class="flex justify-between text-base font-medium text-gray-900">
        <h3>
          <a href="#">Throwback Hip Bag</a>
        </h3>
        <p class="ml-4">$90.00</p>
      </div>
      <p class="mt-1 text-sm text-gray-500">Salmon</p>
    </div>
    <div class="flex flex-1 items-end justify-between text-sm">
      <p class="text-gray-500">Qty 1</p>

      <div class="flex">
        <button
          type="button"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</li>

    `;
}

// ! gestion des catégories
const categoryALL = document.querySelector("#btn-accueil");
const categoryPLA = document.querySelector("#btn-pla");
const categoryPETG = document.querySelector("#btn-petg");
const categoryABS = document.querySelector("#btn-abs");

let plaArticleArray = data.filter((article) => {
  return article.category === "PLA";
});

let petgArticleArray = data.filter((article) => {
  return article.category === "PETG";
});

let absArticleArray = data.filter((article) => {
  return article.category === "ABS";
});

function displayCards(array) {
  cardContainer.innerHTML = "";
  array.forEach((article) => {
    const card = new Article(
      article.id,
      article.name,
      article.category,
      article.price,
      article.image
    );
    card.displayCard();
  });
}

// ! gestion de l'affichage des catégories
categoryALL.addEventListener("click", () => {
  displayCards(data);
});
categoryPLA.addEventListener("click", () => {
  displayCards(plaArticleArray);
});

categoryPETG.addEventListener("click", () => {
  displayCards(petgArticleArray);
});
categoryABS.addEventListener("click", () => {
  displayCards(absArticleArray);
});

// ! gestion cards
// ? Affichage de toute les cartes

// console.log("****data*****", data);

// Affiche des cartes

// console.log(plaArticleArray);
window.addEventListener("DOMContentLoaded", displayCards(data));
