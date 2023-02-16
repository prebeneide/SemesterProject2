import { getExistingCart } from "../utils/cartFunctions.js";

export function renderProducts(productsToRender) {
  const productContainer = document.querySelector(".products-container");

  const productsInCart = getExistingCart();

  productContainer.innerHTML = "";

  productsToRender.forEach(function (product) {
    let cssClass = "btn-add-to-cart";
    let btnText = "Add to cart";

    const doesObjectExist = productsInCart.find(function (buy) {
      console.log(buy);

      return parseInt(buy.id) === product.id;
    });

    console.log(doesObjectExist);

    if (doesObjectExist) {
      cssClass = "btn-dark";
      btnText = "Remove from cart";
    }

    productContainer.innerHTML += `                      <div class="col-md-6 col-lg-3">
                                                                <div class="card product">
                                                                    <div class="card-img-top embed-responsive embed-responsive-4by3"
                                                                        style="background-image:  url(${product.attributes.image_url});
                                                                        background-repeat: no-repeat;
                                                                        background-position: center;
                                                                        background-size: cover;">
                                                                        <span class="background-image" role="img" aria-label="A productimage of ${product.attributes.title}"></span>
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <h5 class="card-title">${product.attributes.title}</h5>
                                                                        <p class="card-text">Price: ${product.attributes.price} $</p>
                                                                        <a href="product.html?id=${product.id}" class="btn btn-dark">Productinfo</a>
                                                                        <a class="btn ${cssClass} btn-gap" data-id="${product.id}" data-title="${product.attributes.title}" data-price="${product.attributes.price}" data-image="${product.attributes.image_url}" id="products-buy-button">${btnText}  <i class="fa fa-shopping-bag" aria-hidden="true"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>`;
  });

  const buyButtons = document.querySelectorAll("#products-buy-button");

  buyButtons.forEach(function (button) {
    button.addEventListener("click", handleClick);
  });

  function handleClick() {
    event.preventDefault();
    this.classList.toggle("btn-add-to-cart");
    this.classList.toggle("btn-dark");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const currentBuys = getExistingCart();

    const productExists = currentBuys.find(function (buy) {
      return buy.id === id;
    });

    if (productExists === undefined) {
      const product = { id: id, title: title, price: price, image: image };
      currentBuys.push(product);
      this.innerText = "Remove from cart";
      $("#success").toast("show");
      savebuys(currentBuys);
    } else {
      $("#danger").toast("show");

      const newbuys = currentBuys.filter((buy) => buy.id !== id);
      this.innerHTML =
        'Add to cart <i class="fa fa-shopping-bag" aria-hidden="true"></i>';
      savebuys(newbuys);
    }
  }

  function savebuys(buys) {
    localStorage.setItem("productsInCart", JSON.stringify(buys));
  }
}
