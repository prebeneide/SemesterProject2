import { renderProducts } from "./renderProducts.js";

export function searchProducts(products) {
  const search = document.querySelector("#search");

  search.onkeyup = function () {
    const searchValue = event.target.value.trim().toLocaleLowerCase();
    const filteredProducts = products.filter(function (product) {
      if (product.attributes.title.toLocaleLowerCase().includes(searchValue)) {
        return true;
      }
    });

    renderProducts(filteredProducts);
  };
}
