document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    document.getElementById("customer-name").textContent = userData.email || "Guest";
});
