function applyTheme(){
    const savedTheme = localStorage.getItem("axisTheme");

    if(savedTheme === "dark"){
        document.body.classList.add("dark-mode");
        document.documentElement.classList.add("dark-mode");
    }else{
        document.body.classList.remove("dark-mode");
        document.documentElement.classList.remove("dark-mode");
    }
}

function toggleTheme(){
    document.body.classList.toggle("dark-mode");
    document.documentElement.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("axisTheme","dark");
    }else{
        localStorage.setItem("axisTheme","light");
    }
}

let currentLang = localStorage.getItem("axisLang") || "en";

const translations = {
    en: {
        langBtn: "العربية",

        dashboard: "Dashboard",
        orderManagement: "Order Management",
        doctorsManagement: "Doctors Management",
        patientsManagement: "Patients Management",
        employeesManagement: "Employees Management",
        inventory: "Inventory",
        qualityControl: "Quality Control",
        notifications: "Notifications",
        rolesPermissions: "Roles & Permissions",
        activityLogs: "Activity Logs",
        settings: "Settings",
        logout: "Logout",

        overdueOrders: "Overdue Orders",
        inProgressOrders: "In Progress Orders",
        completedOrders: "Completed Orders",
        todaysOrders: "Today's Orders",
        totalRevenue: "Total Revenue",
        viewDetails: "View Details ›",
        newOrdersText: "new orders",
        ordersText: "orders",
        thisMonth: "This Month",
        vsLastMonth: "↗ 0% vs last month",

        topTechnicians: "Top Technicians",
        topDentists: "Top Dentists",
        quickNotifications: "Quick Notifications",
        dashboardLinked: "Orders dashboard linked successfully",
        ordersReady: "Order Management is ready",
        demoReady: "System ready for client demo",
        ordersByStatus: "Orders By Status",
        ordersOverview: "Orders Overview",
        exportReport: "Export Report",
        thisMonthBtn: "This Month",

        newStatus: "🔵 New - ",
        progressStatus: "🟠 In Progress - ",
        reviewStatus: "🟢 Review - ",
        readyStatus: "🟣 Ready - ",
        deliveredStatus: "🟢 Delivered - ",
        overdueStatus: "🔴 Overdue - "
    },

    ar: {
        langBtn: "English",

        dashboard: "لوحة التحكم",
        orderManagement: "إدارة الطلبات",
        doctorsManagement: "إدارة الأطباء",
        patientsManagement: "إدارة المرضى",
        employeesManagement: "إدارة الموظفين",
        inventory: "المخزون",
        qualityControl: "مراقبة الجودة",
        notifications: "الإشعارات",
        rolesPermissions: "الصلاحيات",
        activityLogs: "سجل العمليات",
        settings: "الإعدادات",
        logout: "تسجيل الخروج",

        overdueOrders: "الطلبات المتأخرة",
        inProgressOrders: "الطلبات قيد العمل",
        completedOrders: "الطلبات المكتملة",
        todaysOrders: "طلبات اليوم",
        totalRevenue: "إجمالي الإيرادات",
        viewDetails: "عرض التفاصيل ›",
        newOrdersText: "طلبات جديدة",
        ordersText: "طلبات",
        thisMonth: "هذا الشهر",
        vsLastMonth: "↗ 0% مقارنة بالشهر الماضي",

        topTechnicians: "أكثر الفنيين إنجازًا",
        topDentists: "أكثر الأطباء إرسالًا",
        quickNotifications: "تنبيهات سريعة",
        dashboardLinked: "تم ربط لوحة التحكم بالطلبات بنجاح",
        ordersReady: "إدارة الطلبات جاهزة",
        demoReady: "النظام جاهز للعرض على العميل",
        ordersByStatus: "الطلبات حسب الحالة",
        ordersOverview: "نظرة عامة على الطلبات",
        exportReport: "تصدير التقرير",
        thisMonthBtn: "هذا الشهر",

        newStatus: "🔵 جديد - ",
        progressStatus: "🟠 قيد العمل - ",
        reviewStatus: "🟢 مراجعة - ",
        readyStatus: "🟣 جاهز - ",
        deliveredStatus: "🟢 تم التسليم - ",
        overdueStatus: "🔴 متأخر - "
    }
};

function setText(selector, text){
    const elements = document.querySelectorAll(selector);

    elements.forEach(function(element){
        element.textContent = text;
    });
}

function applyLanguage(){
    const t = translations[currentLang];

    const langBtn = document.getElementById("langBtn");
    if(langBtn){
        langBtn.textContent = t.langBtn;
    }

    const menuLinks = document.querySelectorAll(".side-menu a");

    if(menuLinks.length >= 11){
        menuLinks[0].textContent = t.dashboard;
        menuLinks[1].textContent = t.orderManagement;
        menuLinks[2].textContent = t.doctorsManagement;
        menuLinks[3].textContent = t.patientsManagement;
        menuLinks[4].textContent = t.employeesManagement;
        menuLinks[5].textContent = t.inventory;
        menuLinks[6].textContent = t.qualityControl;
        menuLinks[7].textContent = t.notifications;
        menuLinks[8].textContent = t.rolesPermissions;
        menuLinks[9].textContent = t.activityLogs;
        menuLinks[10].textContent = t.settings;
    }

    setText(".logout-btn", t.logout);

    translateDashboard(t);
    translateOrdersPage(t);

    updateDate();
}

function translateDashboard(t){
    const pageTitle = document.querySelector(".welcome-section h1");
    if(pageTitle){
        pageTitle.textContent = t.dashboard;
    }

    const cardTitles = document.querySelectorAll(".stat-card h3");
    if(cardTitles.length >= 5){
        cardTitles[0].textContent = t.overdueOrders;
        cardTitles[1].textContent = t.inProgressOrders;
        cardTitles[2].textContent = t.completedOrders;
        cardTitles[3].textContent = t.todaysOrders;
        cardTitles[4].textContent = t.totalRevenue;
    }

    const cardLinks = document.querySelectorAll(".stat-card span");
    cardLinks.forEach(function(link){
        link.textContent = t.viewDetails;
    });

    const revenueCard = document.querySelector(".stat-card.purple");
    if(revenueCard){
        const p = revenueCard.querySelector("p");
        const span = revenueCard.querySelector("span");

        if(p) p.textContent = t.thisMonth;
        if(span) span.textContent = t.vsLastMonth;
    }

    const infoTitles = document.querySelectorAll(".info-box h2");
    if(infoTitles.length >= 3){
        infoTitles[0].textContent = t.topTechnicians;
        infoTitles[1].textContent = t.topDentists;
        infoTitles[2].textContent = t.quickNotifications;
    }

    const notifications = document.querySelectorAll(".notification-item");
    if(notifications.length >= 3){
        notifications[0].textContent = t.dashboardLinked;
        notifications[1].textContent = t.ordersReady;
        notifications[2].textContent = t.demoReady;
    }

    const chartTitles = document.querySelectorAll(".chart-header h2");
    if(chartTitles.length >= 2){
        chartTitles[0].textContent = t.ordersByStatus;
        chartTitles[1].textContent = t.ordersOverview;
    }

    const chartButtons = document.querySelectorAll(".chart-header button");
    if(chartButtons.length >= 2){
        chartButtons[0].textContent = t.thisMonthBtn;
        chartButtons[1].textContent = t.exportReport;
    }
}

function toggleLanguage(){
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("axisLang", currentLang);
    applyLanguage();
}

function updateDate() {
    const dateBox = document.getElementById("currentDate");

    if (!dateBox) return;

    const now = new Date();

    const locale = currentLang === "ar" ? "ar-JO" : "en-US";

    dateBox.innerHTML =
        "📅 " +
        now.toLocaleDateString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}

applyTheme();
applyLanguage();
function translateOrdersPage(t){

    const pageTitle = document.querySelector(".orders-header h1");
    if(pageTitle){
        pageTitle.textContent = currentLang === "ar"
            ? "إدارة الطلبات"
            : "Order Management";
    }

    const pageDesc = document.querySelector(".orders-header p");
    if(pageDesc){
        pageDesc.textContent = currentLang === "ar"
            ? "إدارة طلبات المختبر وسير العمل"
            : "Manage dental laboratory orders and workflow";
    }

    const newOrderBtn = document.querySelector(".primary-btn");
    if(newOrderBtn){
        newOrderBtn.textContent = currentLang === "ar"
            ? "+ طلب جديد"
            : "+ New Order";
    }

    const toolbarBtns = document.querySelectorAll(".orders-toolbar button");

    if(toolbarBtns.length >= 2){
        toolbarBtns[0].textContent = currentLang === "ar"
            ? "🖨️ طباعة"
            : "🖨️ Print";

        toolbarBtns[1].textContent = currentLang === "ar"
            ? "⬇️ تصدير"
            : "⬇️ Export";
    }

    const searchInput = document.getElementById("searchInput");

    if(searchInput){
        searchInput.placeholder = currentLang === "ar"
            ? "ابحث باسم المريض أو رقم الطلب"
            : "Search by patient name or order ID";
    }

    const tableTitle = document.querySelector(".table-title strong");

    if(tableTitle){
        const totalOrders = JSON.parse(localStorage.getItem("axisOrders")) || [];

        tableTitle.textContent = currentLang === "ar"
            ? `إجمالي الطلبات: ${totalOrders.length}`
            : `Total Orders: ${totalOrders.length}`;
    }

    const headers = document.querySelectorAll(".orders-table th");

    if(headers.length >= 10){

        headers[0].textContent = currentLang === "ar" ? "الإجراءات" : "Actions";
        headers[1].textContent = currentLang === "ar" ? "الحالة" : "Status";
        headers[2].textContent = currentLang === "ar" ? "رقم الطلب" : "Order ID";
        headers[3].textContent = currentLang === "ar" ? "اسم المريض" : "Patient Name";
        headers[4].textContent = currentLang === "ar" ? "نوع العمل" : "Type of Work";
        headers[5].textContent = currentLang === "ar" ? "تاريخ الطلب" : "Order Date";
        headers[6].textContent = currentLang === "ar" ? "تاريخ التسليم" : "Due Date";
        headers[7].textContent = currentLang === "ar" ? "الطبيب" : "Doctor";
        headers[8].textContent = currentLang === "ar" ? "الفني" : "Technician";
        headers[9].textContent = currentLang === "ar" ? "الإنجاز" : "Progress";
    }

    const modalTitle = document.querySelector(".modal-header h2");

    if(modalTitle){
        modalTitle.textContent = currentLang === "ar"
            ? "إضافة طلب جديد"
            : "Add New Order";
    }

    const labels = document.querySelectorAll(".form-group label");

    if(labels.length >= 8){
        labels[0].textContent = currentLang === "ar" ? "اسم المريض" : "Patient Name";
        labels[1].textContent = currentLang === "ar" ? "الطبيب" : "Doctor";
        labels[2].textContent = currentLang === "ar" ? "نوع العمل" : "Type Of Work";
        labels[3].textContent = currentLang === "ar" ? "الفني" : "Technician";
        labels[4].textContent = currentLang === "ar" ? "تاريخ التسليم" : "Delivery Date";
        labels[5].textContent = currentLang === "ar" ? "الأولوية" : "Priority";
        labels[6].textContent = currentLang === "ar" ? "صور الحالة" : "Case Images";
        labels[7].textContent = currentLang === "ar" ? "ملاحظات" : "Notes";
    }

    const cancelBtn = document.querySelector(".cancel-btn");

    if(cancelBtn){
        cancelBtn.textContent = currentLang === "ar"
            ? "إلغاء"
            : "Cancel";
    }

    const saveBtn = document.querySelector(".modal-actions .primary-btn");

    if(saveBtn){
        saveBtn.textContent = currentLang === "ar"
            ? "حفظ الطلب"
            : "Save Order";
    }
}