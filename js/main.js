import { data } from "../data/stock.js";
import { Article } from "./Article.js";

let btnOpenCart = document.querySelector("#btn-open-cart");
let btnCloseCart = document.querySelector("#btn-close-cart");

let cart = document.querySelector("#cart-container");

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
console.log("****data*****", data);

function displayAllCards() {
  data.forEach((article) => {
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

window.addEventListener("DOMContentLoaded", displayAllCards);
