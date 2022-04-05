import { getExistingCart } from "./utils/cartFunctions.js";
import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js"
import createMenu from "./components/common/createMenu.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if(!id) {
    document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;

(async function() {
    try {

        const response = await fetch(productUrl);
        const details = await response.json();
    
        document.title = details.title;

        const productContainer = document.querySelector(".product-content");

        const productsInCart = getExistingCart();

        let cssClass = "btn-dark";

        const doesObjectExist = productsInCart.find(function(buy) {

            return parseInt(buy.id) === details.id;
        });

        if(doesObjectExist) {
            cssClass = "btn-add-to-cart";
        }

        productContainer.innerHTML +=             
                                        `<div class="row">
                                            <div class="col-md">
                                                <h2>${details.title}</h2>
                                                <p>
                                                    ${details.description}
                                                </p>
                                            </div>
                                            <div class="col-md">
                                                <ul class="product-list">
                                                    <li><i class="fa fa-tag"></i> Price: ${details.price} $</li>
                                                </ul>
                                                <a class="btn product ${cssClass}" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-image="${details.image_url}" id="detail-buy-button">Add to cart  <i class="fa fa-shopping-bag" aria-hidden="true"></i></a>
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

            if(productExists === undefined) {
                const product = { id: id, title: title, price: price, image: image };
                currentCart.push(product);
                saveBuys(currentCart);
            }
            else {
                const newBuys = currentCart.filter((buy) => buy.id !== id);
                saveBuys(newBuys);
            }
        
        }


        function saveBuys(buys) {
            localStorage.setItem("productsInCart", JSON.stringify(buys));
        }


        const pageHeading = document.querySelector(".product-top h1");

        pageHeading.innerHTML = `${details.title}`;

        const breadCrumb = document.querySelector(".breadcrumb-item.active");

        breadCrumb.innerHTML = `${details.title}`;

        const productImage = document.querySelector(".embed-responsive.embed-responsive-21by9");

        productImage.innerHTML =    `<div class="embed-responsive-item product-detail-image" style="background-image: url(${baseUrl + details.image_url});">
                                    <span class="background-image" role="img" aria-label="A large productimage of ${details.title}"></span>   
                                    `;
    
    }
    catch (error) {
        displayMessage("error", error, ".detail-container");
    }

})();