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

    showAxisMessage(
      "تسجيل الدخول",
      "أهلاً وسهلاً بك في نظام AXIS Dental Laboratory 🌟<br>نتمنى لك يوماً مليئاً بالإنجاز والنجاح.<br>شكراً لجهودك ودورك في تقديم أفضل خدمة لعملائنا.",
      function () {
        window.location.href = "pages/dashboard.html";
      }
    );

  } else {
    alert("Invalid username or password");
  }
}

function logout() {
  localStorage.removeItem("axisUser");

  showAxisMessage(
    "تسجيل خروج",
    "شكراً لجهودك اليوم 🙏<br>تم تسجيل خروجك بنجاح.<br>نتمنى لك وقتاً سعيداً ونراك قريباً.",
    function () {
      window.location.href = "https://mahmoudkareem.github.io/AXIS/index.html";
    }
  );
}