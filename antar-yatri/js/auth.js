// antar-yatri/js/auth.js

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // 🔹 Registration Logic
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!name || !username || !password) {
        alert("⚠️ Please fill in all fields.");
        return;
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(user => user.username === username);

      if (existingUser) {
        alert("❌ Username already exists. Try another.");
        return;
      }

      users.push({ name, username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("✅ Registration successful! Please log in.");
      window.location.href = "login.html";
    });
  }

  // 🔹 Login Logic
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (!username || !password) {
        alert("⚠️ Enter both username and password.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("✅ Login successful. Welcome back, " + user.name + "!");
        window.location.href = "dashboard.html";
      } else {
        alert("❌ Incorrect username or password.");
      }
    });
  }
});
