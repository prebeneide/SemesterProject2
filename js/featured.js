import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";

const productsUrl = baseUrl + "/products";

(async function() {


    
    const featuredContainer = document.querySelector(".featured .row");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        

        json.forEach(function (product) {
            if(product.featured) {
            featuredContainer.innerHTML += `        <div class="col-md-6 col-lg-3">
                                                        <div class="card product">
                                                            <div class="card-img-top embed-responsive embed-responsive-4by3"
                                                                style="background-image:  url(${baseUrl + product.image_url}); 
                                                                background-repeat: no-repeat;
                                                                background-position: center;
                                                                background-size: cover;">
                                                                <span class="background-image" role="img" aria-label="Productimage of ${product.title}"></span>
                                                            </div>
                                                            <div class="card-body">
                                                                <h5 class="card-title">${product.title}</h5>
                                                                <p class="card-text">Price: ${product.price} $</p>
                                                                <a href="product.html?id=${product.id}" class="btn btn-primary">Productinfo</a>
                                                            </div>
                                                        </div>
                                                    </div>`;
            }              
        });

    } catch (error) {
        displayMessage("error", error, ".product-container-test");
    }



})();