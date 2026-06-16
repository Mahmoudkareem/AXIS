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

function showAxisMessage(title, message, callback) {
  const box = document.createElement("div");

  box.className = "axis-message-overlay";

  box.innerHTML = `
    <div class="axis-message-box">
      <h2>${title}</h2>
      <p>${message}</p>
    </div>
  `;

  document.body.appendChild(box);

  setTimeout(function () {
    if (callback) callback();
  }, 2200);
}

function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {

    localStorage.setItem("axisUser", JSON.stringify(user));

    const logs = JSON.parse(localStorage.getItem("axisActivityLogs")) || [];

    logs.unshift({
      user: user.name,
      actionType: "Login",
      section: "Authentication",
      description: user.name + " logged into the system",
      date: new Date().toLocaleDateString("en-US"),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    localStorage.setItem("axisActivityLogs", JSON.stringify(logs));

    showAxisMessage(
      "تسجيل الدخول",
      "أهلاً وسهلاً بك في نظام المختبر 🌟<br>نتمنى لك يوماً مليئاً بالإنجاز والنجاح<br>شكراً لجهودك ودورك في تقديم أفضل خدمة لعملائنا",
      function () {
        window.location.href = "pages/dashboard.html";
      }
    );

  } else {
    alert("Invalid username or password");
  }
}

function logout() {

  const currentUser = JSON.parse(localStorage.getItem("axisUser"));

  const logs = JSON.parse(localStorage.getItem("axisActivityLogs")) || [];

  logs.unshift({
    user: currentUser ? currentUser.name : "System User",
    actionType: "Logout",
    section: "Authentication",
    description: (currentUser ? currentUser.name : "User") + " logged out from the system",
    date: new Date().toLocaleDateString("en-US"),
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  localStorage.setItem("axisActivityLogs", JSON.stringify(logs));

  localStorage.removeItem("axisUser");

  showAxisMessage(
    "تسجيل خروج",
    "شكراً لجهودك اليوم 🙏<br>تم تسجيل خروجك بنجاح<br>نتمنى لك وقتاً سعيداً ونراك قريباً",
    function () {
      window.location.href = "../index.html";
    }
  );
}