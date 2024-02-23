export class Article {
  constructor(id, name, category, price, image) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.image = image;
  }

  displayCard() {
    const cardContainer = document.querySelector("#card-container");
    cardContainer.innerHTML += `<div id="${this.id}" cart-container class="group relative">
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <img
          src="${this.image}"
          alt="Front of men&#039;s Basic Tee in black."
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div data-cardid="${this.id}" class="mt-4 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">
            <a>
              ${this.name}
            </a>
       
          </h3>
          <p class="mt-1 text-sm text-gray-500">${this.category}</p>
         
        </div>
        <p class="text-sm font-medium text-gray-900">${this.price}€</p>
        <i class="cart-icon fa-solid fa-cart-shopping"></i>
      </div>
      </div>
      `;
  }

  //ajout article
  addToCart() {
    const cartItemContainer = document.querySelector("#cart-item-container");
    const articleId = this.id;
    cartItemContainer.innerHTML += `<li id="${this.id}" class="flex py-6">
  <div
    class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
  >
    <img
      src="${this.image}"
      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
      class="h-full w-full object-cover object-center"
    />
  </div>

  <div class="ml-4 flex flex-1 flex-col">
    <div>
      <div class="flex justify-between text-base font-medium text-gray-900">
        <h3>
          <a href="#">${this.name}</a>
        </h3>
        <p class="ml-4">${this.price}€/pc</p>
      </div>
   
    </div>
    <div class="flex flex-1 items-end justify-between text-sm">
      <p id="${articleId}" class="item-quantity text-gray-500"></p>

      <div class="flex">
        <button
        id="${articleId}"
          type="button"
          class="btn-remove font-medium text-indigo-600 hover:text-indigo-500"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</li>

    `;
  }

  modifyName(newName) {
    this.name = newName;
  }

  modifyCategory(newCategory) {
    this.category = newCategory;
  }

  modifyPrice(newPrice) {
    this.price = newPrice;
  }

  modifyImage(newImage) {
    this.image = newImage;
  }
}
