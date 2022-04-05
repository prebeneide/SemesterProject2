import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if(!id) {
    document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;


const loading = document.querySelector(".loading");
const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#image-url");
const idInput = document.querySelector("#id");
const featured = document.querySelector("#featured");

(async function() {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        title.value = details.title;
        price.value = details.price;
        description.value = details.description;
        featured.checked = details.featured;
        idInput.value = details.id;
        imageUrl.value = details.image_url;

        deleteButton(details.id);

    }
    catch (error) {
        console.log(error);
    }
    finally {
        loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const featuredValue = featured.checked;
    const idValue = idInput.value;
    const imageUrlValue = imageUrl.value;

    if(titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageUrlValue.length === 0 ) {
        return displayMessage("alert alert-warning", "Please supply proper values", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, featuredValue, idValue, imageUrlValue );
}

async function updateProduct(title, price, description, featured, id, image) {

    const url = baseUrl + "/products/" + id;

    const data = JSON.stringify({ title: title, price: price, description: description, featured: featured, image_url: image, id: id })

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if(json.updated_at) {
            displayMessage("alert alert-success", "Product successfully updated", ".message-container");
        }

        if (json.error) {
            displayMessage("alert alert-danger", json.message , ".message-container");
        }

    }
    catch(error) {
        console.log(error);
    }
}


