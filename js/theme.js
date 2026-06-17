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

    localStorage.setItem(
        "axisTheme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
}

let currentLang = localStorage.getItem("axisLang") || "en";

const lang = {
    en: {
        langBtn: "العربية",
        logout: "Logout",
        menu: [
            "Dashboard",
            "Order Management",
            "Doctors Management",
            "Patients Management",
            "Employees Management",
            "Inventory",
            "Quality Control",
            "Notifications",
            "Roles & Permissions",
            "Activity Logs",
            "Appointments",
            "Settings"
        ]
    },
    ar: {
        langBtn: "English",
        logout: "تسجيل الخروج",
        menu: [
            "لوحة التحكم",
            "إدارة الطلبات",
            "إدارة الأطباء",
            "إدارة المرضى",
            "إدارة الموظفين",
            "المخزون",
            "قسم الجودة",
            "الإشعارات",
            "الصلاحيات",
            "سجل العمليات",
            "المواعيد",
            "الإعدادات"
        ]
    }
};

function setText(selector, text){
    const element = document.querySelector(selector);
    if(element) element.textContent = text;
}

function setAllText(selector, text){
    document.querySelectorAll(selector).forEach(function(element){
        element.textContent = text;
    });
}

function setPlaceholder(id, text){
    const element = document.getElementById(id);
    if(element) element.placeholder = text;
}

function setOptionText(id, index, text){
    const select = document.getElementById(id);
    if(select && select.options[index]){
        select.options[index].textContent = text;
    }
}

function setCard(index, title, desc){
    const cards = document.querySelectorAll(".stat-card");

    if(cards[index]){
        const h3 = cards[index].querySelector("h3");
        const p = cards[index].querySelector("p");

        if(h3) h3.textContent = title;
        if(p) p.textContent = desc;
    }
}

function setModalLabels(modalSelector, labelsArray){
    const labels = document.querySelectorAll(modalSelector + " .form-group label");

    labels.forEach(function(label, index){
        if(labelsArray[index]){
            label.textContent = labelsArray[index];
        }
    });
}

function applyLanguage(){
    const isAr = currentLang === "ar";
    const t = lang[currentLang];

    const langBtn = document.getElementById("langBtn");
    if(langBtn) langBtn.textContent = t.langBtn;

    document.querySelectorAll(".side-menu a").forEach(function(link, index){
        if(t.menu[index]) link.textContent = t.menu[index];
    });

    setAllText(".logout-btn", t.logout);

    translateDashboard(isAr);
    translateOrders(isAr);
    translateDoctors(isAr);
    translatePatients(isAr);
    translateEmployees(isAr);
    translateInventory(isAr);
    translateQuality(isAr);
    translateNotifications(isAr);
    translateRoles(isAr);
    translateActivity(isAr);

    if(typeof translateAppointments === "function"){
        translateAppointments(isAr);
    }
    translateActivity(isAr);
    translateAppointments(isAr);
    translateSettings(isAr);

    if(typeof updateDate === "function") updateDate();
}

/* Dashboard */
function translateDashboard(isAr){
    if(!document.querySelector(".welcome-section")) return;

    setText(".welcome-section h1", isAr ? "لوحة التحكم" : "Dashboard");

    setCard(0, isAr ? "الطلبات المتأخرة" : "Overdue Orders", isAr ? "طلبات" : "orders");
    setCard(1, isAr ? "الطلبات قيد العمل" : "In Progress Orders", isAr ? "طلبات" : "orders");
    setCard(2, isAr ? "الطلبات المكتملة" : "Completed Orders", isAr ? "طلبات" : "orders");
    setCard(3, isAr ? "طلبات اليوم" : "Today's Orders", isAr ? "طلبات جديدة" : "new orders");
    setCard(4, isAr ? "إجمالي الإيرادات" : "Total Revenue", isAr ? "هذا الشهر" : "This Month");

    const chartTitles = document.querySelectorAll(".chart-header h2");
    if(chartTitles.length >= 2){
        chartTitles[0].textContent = isAr ? "الطلبات حسب الحالة" : "Orders By Status";
        chartTitles[1].textContent = isAr ? "نظرة عامة على الطلبات" : "Orders Overview";
    }

    const chartBtns = document.querySelectorAll(".chart-header button");
    if(chartBtns.length >= 2){
        chartBtns[0].textContent = isAr ? "هذا الشهر" : "This Month";
        chartBtns[1].textContent = isAr ? "تصدير التقرير" : "Export Report";
    }
}

/* Orders */
function translateOrders(isAr){
    if(!document.getElementById("orderModal")) return;

    setText(".orders-header h1", isAr ? "إدارة الطلبات" : "Order Management");
    setText(".orders-header p", isAr ? "إدارة طلبات مختبر الأسنان وسير العمل" : "Manage dental laboratory orders and workflow");
    setText(".orders-header .primary-btn", isAr ? "+ طلب جديد" : "+ New Order");

    setPlaceholder("searchInput", isAr ? "ابحث باسم المريض أو رقم الطلب" : "Search by patient name or order ID");

    setText("#orderModal .modal-header h2", isAr ? "إضافة طلب جديد" : "Add New Order");

    setModalLabels("#orderModal", isAr
        ? ["اسم المريض", "الطبيب", "نوع العمل", "الفني", "تاريخ التسليم", "الأولوية", "صور الحالة", "ملاحظات"]
        : ["Patient Name", "Doctor", "Type Of Work", "Technician", "Delivery Date", "Priority", "Case Images", "Notes"]
    );

    setText("#orderModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#orderModal .primary-btn", isAr ? "حفظ الطلب" : "Save Order");
}

/* Doctors */
function translateDoctors(isAr){
    if(!document.getElementById("doctorTableBody")) return;

    setText(".orders-header h1", isAr ? "إدارة الأطباء" : "Doctors Management");
    setText(".orders-header p", isAr ? "إدارة الأطباء والسجلات المالية" : "Manage dentists and financial records");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة طبيب" : "+ Add Doctor");

    setCard(0, isAr ? "إجمالي الأطباء" : "Total Doctors", isAr ? "الأطباء المسجلون" : "Registered doctors");
    setCard(1, isAr ? "إجمالي الحالات" : "Total Cases", isAr ? "جميع الحالات المرسلة" : "All submitted cases");
    setCard(2, isAr ? "إجمالي الإيرادات" : "Total Revenue", isAr ? "المبلغ المدفوع" : "Paid amount");
    setCard(3, isAr ? "المبالغ المتبقية" : "Outstanding", isAr ? "دفعات قيد الانتظار" : "Pending payments");

    setPlaceholder("doctorSearch", isAr ? "ابحث عن طبيب..." : "Search doctor...");

    setText("#doctorModal .modal-header h2", isAr ? "إضافة طبيب" : "Add Doctor");

    setModalLabels("#doctorModal", isAr
        ? ["اسم الطبيب", "رقم الهاتف", "العنوان", "إجمالي الحالات", "الإجمالي المستحق", "إجمالي المدفوع"]
        : ["Doctor Name", "Phone Number", "Address", "Total Cases", "Total Due", "Total Paid"]
    );

    setText("#doctorModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#doctorModal .primary-btn", isAr ? "حفظ الطبيب" : "Save Doctor");
}

/* Patients */
function translatePatients(isAr){
    if(!document.getElementById("patientTableBody")) return;

    setText(".orders-header h1", isAr ? "إدارة المرضى" : "Patients Management");
    setText(".orders-header p", isAr ? "إدارة المرضى والحالات الطبية" : "Manage patients and medical cases");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة مريض" : "+ Add Patient");

    setCard(0, isAr ? "إجمالي المرضى" : "Total Patients", isAr ? "المرضى المسجلون" : "Registered patients");
    setCard(1, isAr ? "إجمالي الحالات" : "Total Cases", isAr ? "حالات المرضى" : "Patient cases");
    setCard(2, isAr ? "الأطباء المرتبطون" : "Linked Doctors", isAr ? "الأطباء المعينون" : "Assigned doctors");
    setCard(3, isAr ? "مع ملاحظات" : "With Notes", isAr ? "ملاحظات خاصة" : "Special notes");

    setPlaceholder("patientSearch", isAr ? "ابحث عن مريض..." : "Search patient...");

    setText("#patientModal .modal-header h2", isAr ? "إضافة مريض" : "Add Patient");

    setModalLabels("#patientModal", isAr
        ? ["اسم المريض", "رقم الهاتف", "الطبيب", "نوع الحالة", "تاريخ آخر طلب", "ملاحظات"]
        : ["Patient Name", "Phone Number", "Doctor", "Case Type", "Last Order Date", "Notes"]
    );

    setText("#patientModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#patientModal .primary-btn", isAr ? "حفظ المريض" : "Save Patient");
}

/* Employees */
function translateEmployees(isAr){
    if(!document.getElementById("employeeTableBody")) return;

    setText(".orders-header h1", isAr ? "إدارة الموظفين" : "Employees Management");
    setText(".orders-header p", isAr ? "إدارة الموظفين والصلاحيات والحالة والأداء" : "Manage employees, roles, status and performance");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة موظف" : "+ Add Employee");

    setCard(0, isAr ? "إجمالي الموظفين" : "Total Employees", isAr ? "الموظفون المسجلون" : "Registered employees");
    setCard(1, isAr ? "الموظفون النشطون" : "Active Employees", isAr ? "نشطون حالياً" : "Currently active");
    setCard(2, isAr ? "الفنيون" : "Technicians", isAr ? "فنيو المختبر" : "Lab technicians");
    setCard(3, isAr ? "الأعمال المنجزة" : "Completed Works", isAr ? "هذا الشهر" : "This month");

    setPlaceholder("employeeSearch", isAr ? "ابحث عن موظف..." : "Search employee...");

    setOptionText("employeeStatusFilter", 0, isAr ? "كل الحالات" : "All Status");
    setOptionText("employeeStatusFilter", 1, isAr ? "نشط" : "Active");
    setOptionText("employeeStatusFilter", 2, isAr ? "غير نشط" : "Inactive");

    setText("#employeeModal .modal-header h2", isAr ? "إضافة موظف" : "Add Employee");

    setModalLabels("#employeeModal", isAr
        ? ["اسم الموظف", "اسم المستخدم", "كلمة المرور", "رقم الهاتف", "المسمى الوظيفي", "الصلاحية", "الحالة", "الأعمال المنجزة", "التقييم الشهري"]
        : ["Employee Name", "Username", "Password", "Phone Number", "Job Title", "Role", "Status", "Completed Works", "Monthly Rating"]
    );

    setOptionText("employeeStatus", 0, isAr ? "نشط" : "Active");
    setOptionText("employeeStatus", 1, isAr ? "غير نشط" : "Inactive");

    setText("#employeeModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#employeeModal .primary-btn", isAr ? "حفظ الموظف" : "Save Employee");
}

/* Inventory */
function translateInventory(isAr){
    if(!document.getElementById("inventoryTableBody") && !document.getElementById("inventoryPageTitle")) return;

    setText(".orders-header h1", isAr ? "إدارة المخزون" : "Inventory Management");
    setText(".orders-header p", isAr ? "إدارة مواد مختبر الأسنان ومستويات المخزون" : "Manage dental laboratory materials and stock levels");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة مادة" : "+ Add Item");

    setCard(0, isAr ? "إجمالي المواد" : "Total Items", isAr ? "مواد المخزون" : "Inventory items");
    setCard(1, isAr ? "قيمة المخزون" : "Stock Value", isAr ? "القيمة الإجمالية" : "Total value");
    setCard(2, isAr ? "مخزون منخفض" : "Low Stock", isAr ? "مواد تحتاج تزويد" : "Need restock");
    setCard(3, isAr ? "مواد منتهية" : "Out of Stock", isAr ? "مواد غير متوفرة" : "Unavailable items");

    setPlaceholder("inventorySearch", isAr ? "ابحث باسم المادة أو التصنيف" : "Search by item name or category");

    setText("#inventoryModal .modal-header h2", isAr ? "إضافة مادة للمخزون" : "Add Inventory Item");

    setModalLabels("#inventoryModal", isAr
        ? ["اسم المادة", "التصنيف", "الكمية", "الحد الأدنى", "سعر الوحدة", "المورد", "تاريخ الشراء", "ملاحظات"]
        : ["Item Name", "Category", "Quantity", "Minimum Stock", "Unit Price", "Supplier", "Purchase Date", "Notes"]
    );

    setText("#inventoryModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#inventoryModal .primary-btn", isAr ? "حفظ المادة" : "Save Item");
}

/* Quality */
function translateQuality(isAr){
    if(!document.getElementById("qualityTableBody")) return;

    setText(".orders-header h1", isAr ? "قسم الجودة" : "Quality Control");
    setText(".orders-header p", isAr ? "إدارة الحالات المرتجعة وأداء الجودة" : "Manage returned cases and quality performance");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة حالة مرتجعة" : "+ Add Returned Case");

    setCard(0, isAr ? "إجمالي المرتجعات" : "Total Returns", isAr ? "جميع الحالات المرتجعة" : "All returned cases");
    setCard(1, isAr ? "قيد المعالجة" : "In Treatment", isAr ? "حالات قيد المعالجة" : "Cases in treatment");
    setCard(2, isAr ? "تمت المعالجة" : "Resolved", isAr ? "حالات تمت معالجتها" : "Resolved cases");
    setCard(3, isAr ? "نسبة الأخطاء" : "Error Rate", isAr ? "معدل الأخطاء" : "Quality errors");

    setPlaceholder("qualitySearch", isAr ? "ابحث عن حالة مرتجعة..." : "Search returned case...");

    setText("#qualityModal .modal-header h2", isAr ? "إضافة حالة مرتجعة" : "Add Returned Case");

    setModalLabels("#qualityModal", isAr
        ? ["اسم المريض", "الطبيب", "الفني", "نوع العمل", "سبب الإرجاع", "تاريخ الإرجاع", "حالة المعالجة", "نسبة الخطأ", "ملاحظات الجودة"]
        : ["Patient Name", "Doctor", "Technician", "Work Type", "Return Reason", "Return Date", "Processing Status", "Error Rate", "Quality Notes"]
    );

    setText("#qualityModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#qualityModal .primary-btn", isAr ? "حفظ الحالة" : "Save Case");
}

/* Notifications */
function translateNotifications(isAr){
    if(!document.getElementById("notificationTableBody")) return;

    setText(".orders-header h1", isAr ? "الإشعارات" : "Notifications");
    setText(".orders-header p", isAr ? "إدارة تنبيهات النظام والتحديثات المهمة" : "Manage system alerts and important updates");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة إشعار" : "+ Add Notification");

    setCard(0, isAr ? "إجمالي الإشعارات" : "Total Notifications", isAr ? "جميع تنبيهات النظام" : "All system alerts");
    setCard(1, isAr ? "أولوية عالية" : "High Priority", isAr ? "تحتاج متابعة" : "Need attention");
    setCard(2, isAr ? "تنبيهات المخزون" : "Stock Alerts", isAr ? "تحذيرات المخزون" : "Inventory warnings");
    setCard(3, isAr ? "تنبيهات مكتملة" : "Completed Alerts", isAr ? "تنبيهات تمت معالجتها" : "Resolved alerts");

    setPlaceholder("notificationSearch", isAr ? "ابحث عن إشعار..." : "Search notification...");

    setText("#notificationModal .modal-header h2", isAr ? "إضافة إشعار" : "Add Notification");

    setModalLabels("#notificationModal", isAr
        ? ["نوع الإشعار", "الأولوية", "الحالة", "التاريخ", "العنوان", "الرسالة"]
        : ["Notification Type", "Priority", "Status", "Date", "Title", "Message"]
    );

    setText("#notificationModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#notificationModal .primary-btn", isAr ? "حفظ الإشعار" : "Save Notification");
}

/* Roles */
function translateRoles(isAr){
    if(!document.getElementById("rolesTableBody")) return;

    setText(".orders-header h1", isAr ? "الصلاحيات" : "Roles & Permissions");
    setText(".orders-header p", isAr ? "إدارة مستويات الوصول لمستخدمي النظام" : "Manage access levels for system users");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة رتبة" : "+ Add Role");

    setCard(0, isAr ? "مدير المختبر" : "Lab Manager", isAr ? "صلاحيات كاملة" : "Full permissions");
    setCard(1, isAr ? "مساعد المدير" : "Assistant Manager", isAr ? "صلاحيات كاملة" : "Full permissions");
    setCard(2, isAr ? "مبرمج" : "Programmer", isAr ? "وصول مطور النظام" : "System developer access");
    setCard(3, isAr ? "فني" : "Technician", isAr ? "الطلبات فقط" : "Orders only");
}

/* Activity */
function translateActivity(isAr){
    
    
    if(!document.getElementById("activityTableBody")) return;

    setText(".orders-header h1", isAr ? "سجل العمليات" : "Activity Logs");
    setText(".orders-header p", isAr ? "تتبع عمليات النظام ونشاط المستخدمين" : "Track system actions, user activities and changes");

    setCard(0, isAr ? "إجمالي العمليات" : "Total Logs", isAr ? "كل العمليات" : "All actions");
    setCard(1, isAr ? "عمليات اليوم" : "Today Logs", isAr ? "عمليات اليوم" : "Today actions");
    setCard(2, isAr ? "المستخدمون النشطون" : "Active Users", isAr ? "مستخدمون نشطون" : "Active users");
    setCard(3, isAr ? "آخر عملية" : "Last Action", isAr ? "آخر تحديث" : "Latest update");

    setPlaceholder("activitySearch", isAr ? "ابحث في السجل..." : "Search activity...");
}

/* Settings */
function translateSettings(isAr){
    if(!document.querySelector(".settings-boxes")) return;

    setText(".orders-header h1", isAr ? "الإعدادات" : "Settings");
    setText(
        ".orders-header p",
        isAr
            ? "اختر قسم الإعدادات لإدارة تفضيلات نظام AXIS"
            : "Choose a settings section to manage AXIS system preferences"
    );

    setText(".page-title-box h2", isAr ? "الإعدادات" : "SETTINGS");

    const boxes = document.querySelectorAll(".settings-box");

    const boxText = isAr ? [
        ["إعدادات المختبر", "اسم المختبر، الشعار، التواصل وساعات الدوام"],
        ["المستخدمون والصلاحيات", "المستخدمون، كلمات المرور، الحسابات والرتب"],
        ["اللغة والنظام", "اللغة، العملة، تنسيق التاريخ والوقت"],
        ["إعدادات الطلبات", "أرقام الطلبات، مدة التسليم وحالات الطلب"],
        ["الإشعارات", "تنبيهات الطلبات والمخزون والبريد الإلكتروني"],
        ["إعدادات الحسابات", "الضريبة، العملة، شروط الدفع والفواتير"],
        ["إعدادات الطباعة", "الفواتير، أوراق الطلبات وتذييل الطباعة"],
        ["النسخ الاحتياطي", "إنشاء، استعادة وتنزيل قاعدة البيانات"],
        ["الأمان", "تسجيل الخروج التلقائي، حماية الدخول والسجلات"],
        ["الواجهة", "الوضع، الألوان، حجم الخط وشكل البطاقات"],
        ["الإعدادات المتقدمة", "الإصدار، السيرفر، واتساب وسجل الأخطاء"],
        ["حول AXIS", "معلومات النظام وبيانات المطور"]
    ] : [
        ["Laboratory Settings", "Lab name, logo, contact and working hours"],
        ["Users & Permissions", "Users, passwords, accounts and roles"],
        ["Language & System", "Language, currency, date and time format"],
        ["Orders Settings", "Order numbers, delivery days and statuses"],
        ["Notifications", "Order alerts, stock alerts and email alerts"],
        ["Accounts Settings", "Tax, currency, payment terms and invoices"],
        ["Printing Settings", "Invoices, order papers and print footer"],
        ["Backup", "Create, restore and download database"],
        ["Security", "Auto logout, login protection and logs"],
        ["Interface", "Theme, colors, font size and cards style"],
        ["Advanced Settings", "Version, server, WhatsApp and error logs"],
        ["About AXIS", "System information and developer details"]
    ];

    boxes.forEach(function(box, index){
        const h3 = box.querySelector("h3");
        const p = box.querySelector("p");

        if(boxText[index]){
            if(h3) h3.textContent = boxText[index][0];
            if(p) p.textContent = boxText[index][1];
        }
    });
}
function toggleLanguage(){
    currentLang = currentLang === "en" ? "ar" : "en";

    localStorage.setItem("axisLang", currentLang);

    applyLanguage();
}
function translateAppointments(isAr){
    // Appointments Page

    const title = document.querySelector(".appointments-header h1");
    if(title){
        title.textContent = isAr ? "المواعيد" : "Appointments";
    }

    const subtitle = document.querySelector(".appointments-header p");
    if(subtitle){
        subtitle.textContent = isAr
            ? "إدارة مواعيد الأطباء والزيارات"
            : "Manage doctor appointments and visits";
    }
}
function translateAppointments(isAr){
    if(!document.getElementById("adminAppointmentTableBody")) return;

    setText(".orders-header h1", isAr ? "المواعيد" : "Doctor Appointments");
    setText(".orders-header p", isAr ? "مراجعة وقبول أو رفض طلبات مواعيد الأطباء" : "Review, approve or reject doctors appointment requests");

    setText(".page-title-box h2", isAr ? "المواعيد" : "APPOINTMENTS");

    const cards = document.querySelectorAll(".stat-card");

    if(cards[0]){
        cards[0].querySelector("h3").textContent = isAr ? "إجمالي الطلبات" : "Total Requests";
        cards[0].querySelector("p").textContent = isAr ? "كل طلبات المواعيد" : "All appointment requests";
    }

    if(cards[1]){
        cards[1].querySelector("h3").textContent = isAr ? "قيد الانتظار" : "Pending";
        cards[1].querySelector("p").textContent = isAr ? "بانتظار المراجعة" : "Waiting for review";
    }

    if(cards[2]){
        cards[2].querySelector("h3").textContent = isAr ? "تمت الموافقة" : "Approved";
        cards[2].querySelector("p").textContent = isAr ? "مواعيد مقبولة" : "Accepted appointments";
    }

    if(cards[3]){
        cards[3].querySelector("h3").textContent = isAr ? "مرفوضة" : "Rejected";
        cards[3].querySelector("p").textContent = isAr ? "طلبات مرفوضة" : "Declined requests";
    }
}
function updateDate(){
    const currentDate = document.getElementById("currentDate");

    if(!currentDate) return;

    const now = new Date();

    currentDate.innerHTML =
        now.toLocaleDateString() +
        " | " +
        now.toLocaleTimeString();
}

setInterval(updateDate, 1000);
updateDate();