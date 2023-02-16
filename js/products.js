import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import { searchProducts } from "./ui/searchProducts.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const productsUrl = baseUrl + "/products?pagination[start]=0&pagination[limit]=100";

async function getProducts() {
  try {
    const response = await fetch(productsUrl);
    const { data } = await response.json();

    const products = data;

    renderProducts(products);
    searchProducts(products);
  } catch (error) {
    displayMessage("alert alert-danger", error, ".message-container");
  }
}

getProducts();
