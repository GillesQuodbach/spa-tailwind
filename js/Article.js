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
    cardContainer.innerHTML += `<div id="${this.id}" class="group relative">
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <img
          src="${this.image}"
          alt="Front of men&#039;s Basic Tee in black."
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${this.name}
            </a>
          </h3>
          <p class="mt-1 text-sm text-gray-500">${this.category}</p>
        </div>
        <p class="text-sm font-medium text-gray-900">${this.price}€</p>
      </div>
      </div>
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
