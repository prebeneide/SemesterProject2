import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
    const { pathname } = document.location;


    const container = document.querySelector(".menu-container");

    const username = getUsername();

    let authLink =     `<li class="${pathname === "/login.html" ? "active" : ""}">
                            <a class="nav-link" href="login.html">Login</a>
                        </li>`;

    let cartLink =      `<li class="${pathname === "/cart.html" ? "active" : ""}">
                            <a class="nav-link" href="cart.html">Cart</a>
                        </li>`;


    if(username) {
        authLink = `    

                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ${pathname === "/add.html" || pathname === "/edit-products.html" ? "active" : ""}" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        MENU
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item ${pathname === "/add.html" ? "active" : ""}" href="add.html">Add Product</a>
                        <a class="dropdown-item ${pathname === "/edit-products.html" ? "active" : ""}" href="edit-products.html">Edit Product</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" id="logout" href="#">LOGOUT ${username}</a>
                        </div>
                        </li>`;

        cartLink =      "";
    }


    container.innerHTML = 
                            `<li class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">
                            <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="${pathname === "/products.html" || pathname === "/product.html"? "active" : ""}">
                            <a class="nav-link" href="products.html">Products</a>
                            </li>
                            ${authLink}
                            <li class="${pathname === "/about.html" ? "active" : ""}">
                            <a class="nav-link" href="about.html">About</a>
                            </li>
                            <li class="${pathname === "/contact.html" ? "active" : ""}">
                            <a class="nav-link" href="contact.html">Contact</a>
                            </li>
                            ${cartLink}`;


    logoutButton();
}