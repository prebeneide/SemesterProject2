import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

const productsUrl = baseUrl + "/products";

(async function() {

    
    const row = document.querySelector(".row");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        

        json.forEach(function (product) {
            row.innerHTML += `                      <div class="col-md-6 col-lg-3">
                                                        <div class="card product">
                                                            <div class="card-img-top embed-responsive embed-responsive-4by3"
                                                                style="background-image:  url(${baseUrl + product.image_url});
                                                                background-repeat: no-repeat
                                                                background-position: center;
                                                                background-size: cover;"></div>
                                                            <div class="card-body">
                                                                <h5 class="card-title">${product.title}</h5>
                                                                <p class="card-text">Price: ${product.price} $</p>
                                                                <a href="edit-product.html?id=${product.id}" class="btn btn-primary">Edit product</a>
                                                            </div>
                                                        </div>
                                                    </div>`;
                                    
        });

    } catch (error) {
        displayMessage("alert alert-danger", error, ".message-container");
    }



})();