import { data } from "../data/stock.js";
import { Article } from "./Article.js";

const openCart = () => {
  cart.classList.remove("translate-x-0");
};

const closeCart = () => {
  cart.classList.add("translate-x-0");
};
window.addEventListener("DOMContentLoaded", () => {
  displayCards(data);
  cartHandle();
  calcTotal();
  btnOpenCart.addEventListener("click", openCart);

  btnCloseCart.addEventListener("click", closeCart);
});

// ! gestion panier
const overlay = document.querySelector("#cart-overlay");
const btnOpenCart = document.querySelector("#btn-open-cart");
const btnCloseCart = document.querySelector("#btn-close-cart");
const cart = document.querySelector("#cart-container");
const cardContainer = document.querySelector("#card-container");
const cartItemContainer = document.querySelector("#cart-item-container");
let cartArray = [];

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

//Affichage article panier
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
  cartHandle();
});
categoryPLA.addEventListener("click", () => {
  displayCards(plaArticleArray);
  cartHandle();
});

categoryPETG.addEventListener("click", () => {
  displayCards(petgArticleArray);
  cartHandle();
});
categoryABS.addEventListener("click", () => {
  displayCards(absArticleArray);
  cartHandle();
});

function cartHandle() {
  //Gestion ajout au panier
  const addToCartIcon = document.querySelectorAll(".cart-icon");
  let addToCartIconArray = Array.from(addToCartIcon);
  addToCartIconArray.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      const cartContainer = e.target.closest("div");
      const cardId = cartContainer.getAttribute("data-cardid");

      const clickedCard = data.find((item) => item.id == cardId);
      const existingArticleId = cartArray.findIndex(
        (article) => article.id == clickedCard.id
      );
      if (existingArticleId !== -1) {
        cartArray[existingArticleId].quantity++;
      } else {
        clickedCard.quantity = 1;
        cartArray.push(clickedCard);
      }
      openCart();
      displayCart(cartArray);
      qtyUpdate();
      cartRemoveHandle();
      calcTotal();
    });
  });

  // Gestion paiement
  const payBtn = document.querySelector("#pay-btn");
  const payModal = document.querySelector("#confirm-modal");
  const emptyCartModal = document.querySelector("#empty-cart-modal");
  const emptyCartBtn = document.querySelector("#empty-btn");
  const confirmBtn = document.querySelector("#confirm-btn");
  const cancelBtn = document.querySelector("#cancel-btn");
  const confirmCheckout = document.querySelector("#confirm-checkout");

  // Empty Cart
  emptyCartBtn.addEventListener("click", function (e) {
    console.log("empty cart");
    emptyCartModal.classList.add("translate-x-0");
  });

  // Confirm cart
  // cancel checkout
  cancelBtn.addEventListener("click", function (e) {
    payModal.classList.add("translate-x-0");
  });
  // confirm checkout
  confirmBtn.addEventListener("click", function (e) {
    payModal.classList.add("translate-x-0");
    cart.classList.add("translate-x-0");
    cartArray = [];
    calcTotal();
    displayCart(cartArray);
    setTimeout(() => {
      confirmCheckout.classList.remove("translate-x-0");
      setTimeout(() => {
        confirmCheckout.classList.add("translate-x-0");
      }, 2000);
    }, 1000);
  });

  payBtn.addEventListener("click", function (e) {
    if (cartArray.length === 0) {
      // alert("votre panier est vide");
      emptyCartModal.classList.remove("translate-x-0");
    } else {
      // alert("Merci pour votre commande");
      payModal.classList.remove("translate-x-0");
    }
  });
}

function cartRemoveHandle() {
  // Gestion de suppression d'article
  const removeBtn = document.querySelectorAll(".btn-remove");
  let removeBtnArray = Array.from(removeBtn);
  // console.log("hello from remove");
  removeBtnArray.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const currentId = btn.getAttribute("id");
      // console.log(currentId);
      const articleArrayIndexToRemove = cartArray.findIndex(
        (el) => el.id == currentId
      );
      // console.log("articleIndexToRemove before", articleArrayIndexToRemove);

      const articleToRemove = cartArray[articleArrayIndexToRemove];
      // console.log(articleToRemove);
      if (articleToRemove.quantity > 1) {
        articleToRemove.quantity--;
        qtyUpdate();
        calcTotal();
      } else {
        cartArray.splice(cartArray[articleArrayIndexToRemove], 1);
        displayCart(cartArray);
        calcTotal();
      }
    });
  });
}

function qtyUpdate() {
  const quantityContainer = document.querySelectorAll(".item-quantity");
  // console.log(quantityContainer);
  const quantityContainerArray = Array.from(quantityContainer);
  quantityContainerArray.forEach((qty) => {
    const currentId = qty.getAttribute("id");
    const currentArticle = cartArray.find((item) => item.id === +currentId);
    // console.log(currentArticle.quantity);
    qty.innerHTML = `Qty: ${currentArticle.quantity}`;
  });
}

function calcTotal() {
  //Montant total
  const totalAmountContainer = document.querySelector("#total-amount");
  totalAmountContainer.innerHTML = "";
  let totalAMount = 0;

  cartArray.forEach((article) => {
    totalAMount += +article.price * article.quantity;
  });
  totalAmountContainer.innerHTML = `${totalAMount}€`;
}
