import { clearStorage } from "../../utils/storage.js";

export default function logoutButton() {

    const logout = document.querySelector("#logout");

    if(logout) {
        logout.onclick = function() {
            const doLogout = confirm("Are you sure?");

            if(doLogout) {
                clearStorage();
                location.href = "/";
            }
        };
    }

}