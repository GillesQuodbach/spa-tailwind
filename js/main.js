import { data } from "../data/stock.js";
import { Article } from "./Article.js";

//! Fonction principale
window.addEventListener("DOMContentLoaded", () => {
  generateCategoryButtons([...setCategoryArray]);
  displayCards(articlesArray);
  cartHandle();
  calcTotal();
});

// ! gestion des données
// Création des articles
const articlesArray = [];
data.forEach((article) =>
  articlesArray.push(
    new Article(
      article.id,
      article.name,
      article.category,
      article.price,
      article.image
    )
  )
);

// Créations des catégories
const categoryArray = [];
data.forEach((article) => categoryArray.push(article.category));
const setCategoryArray = new Set(categoryArray);

// ! gestion panier
const overlay = document.querySelector("#cart-overlay");
const btnOpenCart = document.querySelector("#btn-open-cart");
const btnCloseCart = document.querySelector("#btn-close-cart");
const cart = document.querySelector("#cart-container");
const cardContainer = document.querySelector("#card-container");
const cartItemContainer = document.querySelector("#cart-item-container");
let cartArray = [];

// ! gestion des catégories
const homeBtn = document.querySelector("#btn-accueil");
homeBtn.addEventListener("click", function (e) {
  console.log("accueil");
  displayCards(articlesArray);
  cartHandle();
});
//! Gestion du paiement
const payBtn = document.querySelector("#pay-btn");
const payModal = document.querySelector("#confirm-modal");
const emptyCartModal = document.querySelector("#empty-cart-modal");
const emptyCartBtn = document.querySelector("#empty-btn");
const confirmBtn = document.querySelector("#confirm-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const confirmCheckout = document.querySelector("#confirm-checkout");

//! Fonctions

//Affichage des articles
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

//Ouverture/fermeture panier
const openCart = () => {
  cart.classList.remove("translate-x-0");
};
const closeCart = () => {
  cart.classList.add("translate-x-0");
};

function displayCart(array) {
  cartItemContainer.innerHTML = "";
  array?.forEach((article) => {
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

// Génère les boutons des catégories
function generateCategoryButtons(categories) {
  const categoriesContainer = document.querySelector("#categories-container");
  categories.forEach((category) => {
    const button = document.createElement("a");
    button.innerHTML = `<div id="btn-${category}" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">${category}</div>`;
    // button.classList.add("category-btn");
    button.addEventListener("click", () => {
      const filteredArticles = articlesArray.filter(
        (article) => article.category === category
      );
      displayCards(filteredArticles);
      cartHandle();
    });
    categoriesContainer.appendChild(button);
  });
}

// Gestion ajout au panier
function cartHandle() {
  // Ouverture/fermeture panier
  btnOpenCart.addEventListener("click", openCart);
  btnCloseCart.addEventListener("click", closeCart);

  const addToCartIcon = document.querySelectorAll(".cart-icon");
  let addToCartIconArray = Array.from(addToCartIcon);
  addToCartIconArray.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      const cartContainer = e.target.closest("div");
      const cardId = cartContainer.getAttribute("data-cardid");
      const clickedArticle = articlesArray.find((item) => item.id == cardId);
      const existingArticleId = cartArray.findIndex(
        (article) => article.id == clickedArticle.id
      );
      if (existingArticleId !== -1) {
        cartArray[existingArticleId].quantity++;
      } else {
        clickedArticle.quantity = 1;
        cartArray.push(clickedArticle);
      }
      console.log(cartArray);
      openCart();
      displayCart(cartArray);
      calcTotal();
      qtyUpdate();
    });
  });
  cartRemoveHandle();

  // Si panier vide
  emptyCartBtn.addEventListener("click", function (e) {
    console.log("empty cart");
    emptyCartModal.classList.add("translate-x-0");
  });

  // Annulation commande
  cancelBtn.addEventListener("click", function (e) {
    payModal.classList.add("translate-x-0");
  });
  // Confirmation commande
  confirmBtn.addEventListener("click", function (e) {
    payModal.classList.add("translate-x-0");
    cart.classList.add("translate-x-0");
    cartArray = [];
    displayCart(cartArray);
    setTimeout(() => {
      confirmCheckout.classList.remove("translate-x-0");
      setTimeout(() => {
        confirmCheckout.classList.add("translate-x-0");
      }, 2000);
    }, 1000);
  });

  // Bouton payer
  payBtn.addEventListener("click", function (e) {
    if (cartArray.length === 0) {
      emptyCartModal.classList.remove("translate-x-0");
    } else {
      payModal.classList.remove("translate-x-0");
    }
  });
}

// Gestion de suppression d'un article
function cartRemoveHandle() {
  const cartItemContainer = document.querySelector("#cart-item-container");
  cartItemContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-remove")) {
      const btn = event.target;
      const articleId = btn.getAttribute("id");
      const articleToRemove = cartArray.find((item) => item.id === +articleId);
      if (articleToRemove.quantity > 1) {
        articleToRemove.quantity--;
      } else {
        const indexArticleInCartArray = cartArray.findIndex(
          (item) => item.id === +articleId
        );
        cartArray.splice(indexArticleInCartArray, 1);
      }
      const clickedCard = articlesArray.find((item) => item.id == articleId);
      if (clickedCard) {
        clickedCard.quantity = articleToRemove.quantity;
      }
      displayCart(cartArray);
      calcTotal();
      qtyUpdate();
    }
  });
}

//Calcul des quantités
function qtyUpdate() {
  const quantityContainers = document.querySelectorAll(".item-quantity");
  quantityContainers.forEach((quantityContainer) => {
    const currentId = quantityContainer.getAttribute("id");
    const currentArticle = cartArray.find((item) => item.id === +currentId);
    if (currentArticle && currentArticle.quantity > 0) {
      quantityContainer.innerHTML = `Qty: ${currentArticle.quantity}`;
    } else {
      quantityContainer.innerHTML = "";
    }
  });
}

//Montant du panier
function calcTotal() {
  const totalAmountContainer = document.querySelector("#total-amount");
  totalAmountContainer.innerHTML = "";
  let totalAMount = 0;
  cartArray.forEach((article) => {
    totalAMount += +article.price * article.quantity;
  });
  totalAmountContainer.innerHTML = `${totalAMount}€`;
}
