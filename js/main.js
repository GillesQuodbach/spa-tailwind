import { data } from "../data/stock.js";
import { Article } from "./Article.js";

const btnOpenCart = document.querySelector("#btn-open-cart");
const btnCloseCart = document.querySelector("#btn-close-cart");
const cart = document.querySelector("#cart-container");
const cardContainer = document.querySelector("#card-container");

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
// ! gestion panier
btnOpenCart.addEventListener("click", openCart);
function openCart() {
  cart.classList.remove("translate-x-0");
}

btnCloseCart.addEventListener("click", closeCart);
function closeCart() {
  cart.classList.add("translate-x-0");
}

// ! gestion cards
// ? Affichage de toute les cartes

// console.log("****data*****", data);

// Affiche des cartes

// console.log(plaArticleArray);
window.addEventListener("DOMContentLoaded", displayCards(data));
