import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";

const bannerUrl = baseUrl + "/home";

createMenu();


(async function() {


    
    const bannerContainer = document.querySelector(".banner-container");

    try {
        const response = await fetch(bannerUrl);
        const json = await response.json();

            bannerContainer.innerHTML = 
                                            `<div class="carousel-item active embed-responsive-item" style="background-image:url(${baseUrl + json.hero_banner.formats.large.url});">
                                            <span class="background-image" role="img" aria-label=" A large image of ${json.hero_banner_alt_text}"></span>
                                            </div>`;


        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occured when uploading the banner", ".banner-container");
    }



})();






