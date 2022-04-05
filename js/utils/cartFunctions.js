export function getExistingCart() {
    const buys = localStorage.getItem("productsInCart");

    if(buys === null) {
        return [];
    } else {
        return JSON.parse(buys);
    }
}