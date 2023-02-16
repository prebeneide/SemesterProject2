import { getExistingCart } from "./utils/cartFunctions.js";
import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;

(async function () {
  try {
    const response = await fetch(productUrl);
    const { data } = await response.json();
    const details = data;

    document.title = details.attributes.title;

    const productContainer = document.querySelector(".product-content");

    const productsInCart = getExistingCart();

    let cssClass = "btn-add-to-cart";
    let btnText = "Add to cart";

    const doesObjectExist = productsInCart.find(function (buy) {
      return parseInt(buy.id) === details.id;
    });

    if (doesObjectExist) {
      cssClass = "btn-dark";
      btnText = "Remove from cart";
    }

    productContainer.innerHTML += `<div class="row">
                                            <div class="col-md">
                                                <h2>${details.attributes.title}</h2>
                                                <p>
                                                    ${details.attributes.description}
                                                </p>
                                            </div>
                                            <div class="col-md">
                                                <ul class="product-list d-flex justify-content-center">
                                                    <li><i class="fa fa-tag"></i> Price: ${details.attributes.price} $</li>
                                                </ul>
                                                <div class="d-flex justify-content-center">
                                                  <button class="btn product ${cssClass} " data-id="${details.id}" data-title="${details.attributes.title}" data-price="${details.attributes.price}" data-image="${details.attributes.image_url}" id="detail-buy-button">${btnText}  <i class="fa fa-shopping-bag" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </div>`;

    const buyButton = document.querySelector("#detail-buy-button");

    buyButton.addEventListener("click", handleClick);

    function handleClick() {
      this.classList.toggle("btn-add-to-cart");
      this.classList.toggle("btn-dark");

      const id = this.dataset.id;
      const title = this.dataset.title;
      const price = this.dataset.price;
      const image = this.dataset.image;

      const currentCart = getExistingCart();
      const productExists = currentCart.find(function (buy) {
        return buy.id === id;
      });

      if (productExists === undefined) {
        const product = { id: id, title: title, price: price, image: image };
        currentCart.push(product);
        saveBuys(currentCart);
        this.innerText = "Remove from cart";
        $("#success").toast("show");
      } else {
        $("#danger").toast("show");
        const newBuys = currentCart.filter((buy) => buy.id !== id);
        this.innerHTML = `Add to cart  <i class="fa fa-shopping-bag" aria-hidden="true"></i>`;
        saveBuys(newBuys);
      }
    }

    function saveBuys(buys) {
      localStorage.setItem("productsInCart", JSON.stringify(buys));
    }

    const pageHeading = document.querySelector(".product-top h1");

    pageHeading.innerHTML = `${details.attributes.title}`;

    const breadCrumb = document.querySelector(".breadcrumb-item.active");

    breadCrumb.innerHTML = `${details.attributes.title}`;

    const productImage = document.querySelector(
      ".embed-responsive.embed-responsive-21by9"
    );

    productImage.innerHTML = `<div class="embed-responsive-item product-detail-image" style="background-image: url(${details.attributes.image_url});">
                                    <span class="background-image" role="img" aria-label="A large productimage of ${details.attributes.title}"></span>   
                                    `;
  } catch (error) {
    displayMessage("error", error, ".detail-container");
  }
})();
