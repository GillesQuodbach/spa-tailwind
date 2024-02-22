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
  addArticleToCard();
}

function displayCart(array) {
  cartItemContainer.innerHTML = "";
  array.forEach((article) => {
    const card = new Article(
      article.id,
      article.name,
      article.category,
      article.price,
      article.image
    );
    card.addToCart();
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

//! Attente du chargement du DOM
window.addEventListener("DOMContentLoaded", () => {
  displayCards(data);
});

function addArticleToCard() {
  //Gestion ajout au panier
  const addToCartIcon = document.querySelectorAll(".cart-icon");
  let addToCartIconArray = Array.from(addToCartIcon);
  addToCartIconArray.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      const cartContainer = e.target.closest("div");

      const cardId = cartContainer.getAttribute("data-cardid");

      const clickedCard = data.find((item) => item.id == cardId);
      console.log("clickedCard", clickedCard);
      // addToCart();
      cartArray.push(clickedCard);

      const totalAmountContainer = document.querySelector("#total-amount");
      console.log("totalAmount", totalAmountContainer);

      totalAmountContainer.innerHTML = "";
      let totalAMount = 0;
      cartArray.forEach((article) => {
        totalAMount += +article.price;
      });
      totalAmountContainer.innerHTML = `${totalAMount}€`;
      openCart();
      displayCart(cartArray);
    });
  });
}
