document.addEventListener("DOMContentLoaded", function () {
  const wishlistContainer = document.getElementById("wishlist-items");
  const emptyMessage = document.getElementById("empty-message");

  // Load wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  function updateWishlist() {
      wishlistContainer.innerHTML = "";

      if (wishlist.length === 0) {
          emptyMessage.style.display = "block";
      } else {
          emptyMessage.style.display = "none";

          wishlist.forEach((item, index) => {
              const itemCard = document.createElement("div");
              itemCard.classList.add("wishlist-item");
              itemCard.innerHTML = `
                  <img src="${item.image}" alt="${item.name}">
                  <h3>${item.name}</h3>
                  <p class="price">${item.price}</p>
                  <button class="remove-btn" onclick="removeFromWishlist(${index})">Remove</button>
              `;
              wishlistContainer.appendChild(itemCard);
          });
      }

      // Save updated wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  // Remove item from wishlist
  window.removeFromWishlist = function (index) {
      wishlist.splice(index, 1);
      updateWishlist();
  };

  updateWishlist();
});
