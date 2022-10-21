# EUPHORY (SEMESTER PROJECT 2)

This was our semester project 2. The goal here was to create an e-commerce website that had both customer-facing and admin sections. Both sections should be responsive and the website needed to be populated by a Strapi API supplied by Noroff.

## Description

### Brief

- I needed to build an e-commerce website.
- I could choose the theme of the website.
- It should follow the site architecture described below.
- I needed to find a suitable logo, or create one myself.I created one myself
- I needed to apply all that we have learned in the studies so far(at that time)
- The site should have good user experience and UI design.

- I needed to build a frontend with home, product list, product details and cart pages.
- I also needed to build admin pages to create, update and delete products.
- The website should be responsive on all devices.
- Building a checkout and payment system is not a part of the project.


### Strapi API

- We could choose between using the school´s api locally or making our own api public.

#### Customer-facing pages

##### Home page

The home page should include:

- A hero banner with an image that is uploaded to Strapi.
- A list of featured products.
- On Strapi products can be marked as ‘featured’.
- When a product is marked as ‘featured’ it should be displayed on the homepage.

##### Products page

The products page should include:

- A list of all products added to Strapi.
- Each product must display its title, price and image.
- The product should link to its products detail page.
- A search text box. When searching (filtering), only the products that include the searched text in their title or description should be listed.

##### Product details page

This page is reached by a user clicking on a product on the product list page. The product details page should include:

- title
- description
- image
- price
- an add to cart button. (This will toggle the product in and out of a cart array stored in local storage)

##### Cart/Basket page

- The cart/basket page should display a list of all products added to the cart.
- If the cart is empty display a message indicating this.

Each product in the cart should display:

- title
- price
- a link to the product view page
- image

- After the list of products, display the total price of all the products in the cart.

- Note: the cart page is not a checkout page. No payments or user details are required to be taken.


#### Admin section

The admin section (apart from the log in form) can only be accessible to logged in admin users and should include the following features:

- Login/Logout
- Create an admin login form that allows administrator users to login. Use local storage to keep the user logged in.

- When logged in, display a logout button in the layout that logs the user out.
- Logging out must not clear the cart.
- Add/edit products

- We needed to create form(s) that allow products to be added and edited.
- The form needed to allow the user to toggle whether a product is featured.

###### Product images

For adding/editing product images we needed to use either of these 2 methods:

- Use a file upload field to upload images to Strapi, or use a text input that allows a URL to be entered.

###### Delete existing product

- Allow products to be deleted.
- Before a product is deleted it must display a confirmation dialog.
- The product should only be deleted if the user confirms.

- I could use CSS libraries like Bootstrap(I used Bootstrap)
- I could use either Sass or Styled Components for our styles.(I used Sass)
- Using BEM was optional but using proper class names was important.
- I used vanilla (regular) JavaScript for the project and split my code up using modules (imports/exports).


## Built With

- [SASS](https://sass-lang.com/)
- [JavaScript](https://www.javascript.com/)
- [Bootstrap](https://getbootstrap.com)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com:prebeneide/Public-Semester-Project-2.git
```

2. Install the dependencies:

```
npm install
```

3. Click on index.html and open with live server(or browser).



## Contact

[www.linkedin.com/in/prebeneide](www.linkedin.com)
