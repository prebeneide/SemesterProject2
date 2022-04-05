import { baseUrl } from "./settings/api.js";
import { getExistingCart } from "./utils/cartFunctions.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";

const token = getToken();

if (token) {
    location.href = "/";
}

createMenu();


const productsInCart = getExistingCart();

const cartContainer = document.querySelector(".cart-container");



if(productsInCart.length === 0) {
    displayMessage("alert alert-secondary", "No products in cart yet", ".message-container");
}

const totalContainer = document.querySelector(".total-price");
let total = 0;

cartContainer.innerHTML = "";

productsInCart.forEach(cart => {
    total += parseFloat(cart.price);
    cartContainer.innerHTML += 
                                                            `<div class="col-md-12 col-lg-12">
                                                                <div class="card product">
                                                                    <div class="card-body" id="cart-card">
                                                                        <div class="row align-items-center">
                                                                            <div class="col-sm order-sm-1">
                                                                                <div class="embed-responsive embed-responsive-4by3"
                                                                                style="background-image:  url(${baseUrl + cart.image});
                                                                                background-repeat: no-repeat;
                                                                                background-position: center;
                                                                                background-size: cover;" id="cart-product-image">
                                                                                <span class="background-image" role="img" aria-label="Productimage of ${cart.title}"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-sm order-sm-2">
                                                                                <h5 class="card-title" id="cart-title">${cart.title}</h5>
                                                                            </div>
                                                                            <div class="col-sm order-sm-3">
                                                                                <p class="card-text">${cart.price} $ </p>
                                                                            </div>
                                                                            <div class="col-sm order-sm-4">
                                                                                <a href="product.html?id=${cart.id}" class="btn btn-primary">Productinfo</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>`;

    totalContainer.innerHTML = `<div class="col-9">Total Price: </div> <div class="col-3"> ${total} $ </div>`;

});