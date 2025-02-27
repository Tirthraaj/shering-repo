document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let emptyCartMessage = document.getElementById("empty-cart");
    
    cartContainer.innerHTML = "";

    if (cartItems.length === 0) {
        emptyCartMessage.style.display = "block";
    } else {
        emptyCartMessage.style.display = "none";
        cartItems.forEach((item, index) => {
            let productCard = document.createElement("div");
            productCard.classList.add("cart-item");
            productCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">₹${item.price}</p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(productCard);
        });
    }
}

function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCart();
}

