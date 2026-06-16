const staffUsers = [
  {
    username: "admin",
    password: "123456",
    role: "admin",
    name: "Lab Manager",
    accountType: "staff"
  },
  {
    username: "assistant",
    password: "123456",
    role: "assistant",
    name: "Assistant Manager",
    accountType: "staff"
  },
  {
    username: "technician",
    password: "123456",
    role: "technician",
    name: "Technician",
    accountType: "staff"
  }
];

const doctorUsers = [
  {
    username: "doctor",
    password: "123456",
    role: "doctor",
    name: "Dr. Ahmed",
    doctorName: "Dr. Ahmed",
    accountType: "doctor"
  },
  {
    username: "sara",
    password: "123456",
    role: "doctor",
    name: "Dr. Sara",
    doctorName: "Dr. Sara",
    accountType: "doctor"
  },
  {
    username: "kareem",
    password: "123456",
    role: "doctor",
    name: "Dr. Kareem",
    doctorName: "Dr. Kareem",
    accountType: "doctor"
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

function addAuthLog(user, actionType){
  const logs = JSON.parse(localStorage.getItem("axisActivityLogs")) || [];
  const now = new Date();

  logs.unshift({
    user: user && user.name ? user.name : "System User",
    actionType: actionType,
    section: "Authentication",
    description:
      (user && user.name ? user.name : "User") +
      (actionType === "Login" ? " logged into the system" : " logged out from the system"),
    date: now.toLocaleDateString("en-US"),
    time: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  localStorage.setItem("axisActivityLogs", JSON.stringify(logs));
}

function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const loginType = localStorage.getItem("axisLoginType") || "employee";

  let user = null;
  let redirectPage = "pages/dashboard.html";

  if(loginType === "doctor"){
    user = doctorUsers.find(
      u => u.username === username && u.password === password
    );

    redirectPage = "pages/doctor-dashboard.html";
  }else{
    user = staffUsers.find(
      u => u.username === username && u.password === password
    );

    redirectPage = "pages/dashboard.html";
  }

  if(user){
    localStorage.setItem("axisUser", JSON.stringify(user));
    localStorage.setItem("axisAccountType", user.accountType);

    addAuthLog(user, "Login");

    const welcomeTitle = user.accountType === "doctor"
      ? "تسجيل دخول الطبيب"
      : "تسجيل الدخول";

    const welcomeMessage = user.accountType === "doctor"
      ? "أهلاً وسهلاً بك في لوحة الطبيب 🦷<br>يمكنك متابعة طلباتك وإضافة طلب جديد وحجز موعد"
      : "أهلاً وسهلاً بك في نظام المختبر 🌟<br>نتمنى لك يوماً مليئاً بالإنجاز والنجاح<br>شكراً لجهودك ودورك في تقديم أفضل خدمة لعملائنا";

    showAxisMessage(
      welcomeTitle,
      welcomeMessage,
      function () {
        window.location.href = redirectPage;
      }
    );

  }else{
    if(loginType === "doctor"){
      alert("Invalid doctor username or password");
    }else{
      alert("Invalid staff username or password");
    }
  }
}

function logout() {
  const currentUser = JSON.parse(localStorage.getItem("axisUser"));

  addAuthLog(currentUser, "Logout");

  localStorage.removeItem("axisUser");
  localStorage.removeItem("axisAccountType");

  showAxisMessage(
    "تسجيل خروج",
    "شكراً لجهودك اليوم 🙏<br>تم تسجيل خروجك بنجاح<br>نتمنى لك وقتاً سعيداً ونراك قريباً",
    function () {
      window.location.href = "../index.html";
    }
  );
}