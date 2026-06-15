const users = [
  {
    username: "admin",
    password: "123456",
    role: "admin",
    name: "Lab Manager"
  },
  {
    username: "assistant",
    password: "123456",
    role: "assistant",
    name: "Assistant Manager"
  },
  {
    username: "technician",
    password: "123456",
    role: "technician",
    name: "Technician"
  }
];

function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("axisUser", JSON.stringify(user));
    window.location.href = "pages/dashboard.html";
  } else {
    alert("Invalid username or password");
  }
}
function logout() {
    localStorage.removeItem("axisUser");
    window.location.href = "/AXIS/";
}