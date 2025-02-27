document.addEventListener("DOMContentLoaded", function () {
  const signinForm = document.getElementById("signin-form");

  signinForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get input values
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Create new user object
      const newUser = { email, password, cart: [], wishlist: [] };

      // Fetch existing users from JSON
      fetch("users.json")
          .then(response => response.json())
          .then(users => {
              // Check if user already exists
              if (users.some(user => user.email === email)) {
                  alert("User already exists! Please log in.");
                  return;
              }

              // Add new user and update JSON
              users.push(newUser);
              saveUsersToFile(users);

              alert("Sign-up successful! Please log in.");
              window.location.href = "login.html"; // Redirect to login page
          })
          .catch(error => console.error("Error fetching users:", error));
  });

  // Function to save updated users list to JSON
  function saveUsersToFile(users) {
      fetch("save_users.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(users)
      });
  }
});
