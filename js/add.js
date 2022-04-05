import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#image-url");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim().toUpperCase();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageUrlValue = imageUrl.value;
    const featuredValue = featured.checked;

    if(titleValue.length === 0 || titleValue.length > 16 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageUrlValue.length === 0 ) {
        return displayMessage("alert alert-warning", "Please supply proper values", ".message-container");
    }

    addProduct(titleValue, priceValue, descriptionValue, featuredValue, imageUrlValue);
}

async function addProduct(title, price, description, featured, image) {

    const url = baseUrl + "/products";

    
    const data = JSON.stringify({ title: title, price: price, description: description, featured: featured, image_url: image });


    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if(json.created_at) {
            displayMessage("alert alert-success", "Product successfully created", ".message-container");
            form.reset();
        }

        if(json.error) {
            displayMessage("alert alert-danger", json.message , ".message-container");
        }
    }
    catch(error) {
        console.log(error);
        displayMessage("alert alert-danger", "An error occured, please try again", ".message-container");
    }
}