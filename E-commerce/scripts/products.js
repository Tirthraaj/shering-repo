document.addEventListener("DOMContentLoaded", () => {
    createCategoryButtons(); // Create category buttons with images
});

function createCategoryButtons() {
    let categoryContainer = document.getElementById("category-buttons");
    let categories = [
        { id: "men", name: "Men's Clothing", image: "images/wo.jpeg" },
        { id: "women", name: "Women's Clothing", image: "images/wo.jpg" },
        { id: "accessories", name: "Accessories", image: "images/ass.jpg" },
    ];

    let buttonsHTML = "";
    categories.forEach(category => {
        buttonsHTML += `
            <button class="category-btn" onclick="loadProducts('${category.id}')">
                <img src="${category.image}" alt="${category.name}">
                <span>${category.name}</span>
            </button>
        `;
    });

    categoryContainer.innerHTML = buttonsHTML;
}

function loadProducts(category) {
    console.log(`Loading category: ${category}`);

    let xmlFile = `${category}_products.xml`; // Select the correct XML file

    fetch(xmlFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            let products = data.getElementsByTagName("product");
            let output = "";

            if (products.length === 0) {
                output = "<p>No products available in this category.</p>";
            } else {
                for (let i = 0; i < products.length; i++) {
                    let name = products[i].getElementsByTagName("name")[0].textContent;
                    let price = products[i].getElementsByTagName("price")[0].textContent;
                    let description = products[i].getElementsByTagName("description")[0].textContent;
                    let image = products[i].getElementsByTagName("image")[0].textContent;

                    output += `
                        <div class="product-card">
                            <img src="${image}" alt="${name}">
                            <h2>${name}</h2>
                            <p>${description}</p>
                            <p class="price">₹${price}</p>
                            <button class="cart-btn" onclick="addToCart('${name}', '${price}', '${image}')">Add to Cart</button>
                            <button class="wishlist-btn" onclick="addToWishlist('${name}', '${price}', '${image}')">❤️ Wishlist</button>
                        </div>
                    `;
                }
            }

            document.getElementById("product-list").innerHTML = output;
        })
        .catch(error => {
            console.error("Error loading XML file:", error);
            document.getElementById("product-list").innerHTML = "<p>Failed to load products. Please try again later.</p>";
        });
}

// Function to add product to Cart
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart!");
}

// Function to add product to Wishlist
function addToWishlist(name, price, image) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push({ name, price, image });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist!");
}


document.addEventListener("DOMContentLoaded", () => {
    displayWishlist();
});

function displayWishlist() {
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlistContainer = document.getElementById("wishlist");
    
    wishlistContainer.innerHTML = "";

    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    } else {
        wishlistItems.forEach((item, index) => {
            let productCard = document.createElement("div");
            productCard.classList.add("wishlist-item");
            productCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">₹${item.price}</p>
                <button class="remove-btn" onclick="removeFromWishlist(${index})">Remove</button>
            `;
            wishlistContainer.appendChild(productCard);
        });
    }
}

function removeFromWishlist(index) {
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlistItems.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    displayWishlist();
}


