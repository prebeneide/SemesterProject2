import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";

const bannerUrl = baseUrl + "/banners";

createMenu();

(async function () {
  const bannerContainer = document.querySelector(".banner-container");

  try {
    const response = await fetch(bannerUrl);
    const { data } = await response.json();
    const json = data[0];

    bannerContainer.innerHTML = `<div class="carousel-item active embed-responsive-item" style="background-image:url(${json.attributes.hero_banner_url});">
                                            <span class="background-image" role="img" aria-label=" A large image of ${json.attributes.hero_banner_alt_text}"></span>
                                            </div>`;
  } catch (error) {
    console.log(error);
    displayMessage(
      "error",
      "An error occured when uploading the banner",
      ".banner-container"
    );
  }
})();





