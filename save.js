btn.addEventListener("click", function (e) {
  const currentId = btn.getAttribute("id");
  const articleIndexToRemove = cartArray.findIndex((el) => el.id == currentId);
  console.log("articleIndexToRemove before", articleIndexToRemove);
  console.log("cartArray before", cartArray);
  if (articleIndexToRemove !== -1) {
    const articleToRemove = cartArray[articleIndexToRemove];
    if (articleToRemove.quantity > 1) {
      articleToRemove.quantity--;
      console.log("quantité modifiée");
      console.log(articleToRemove);
    } else {
      cartArray.splice(articleIndexToRemove, 1);
      console.log("article supprimé");
    }
  }
  console.log("cartArray after", cartArray);
  displayCart(cartArray);
  qtyUpdate();
});
