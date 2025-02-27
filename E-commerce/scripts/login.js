document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("users.json")
            .then(response => response.json())
            .then(users => {
                // Find user by email and password
                const user = users.find(user => user.email === email && user.password === password);

                if (user) {
                    alert("Login successful!");
                    localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store user data

                    // Redirect to profile
                    window.location.href = "my_profile.html";
                } else {
                    alert("Invalid email or password. Please try again.");
                }
            })
            .catch(error => console.error("Error fetching users:", error));
    });
});
