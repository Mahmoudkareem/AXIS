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
            "الإعدادات"
        ]
    }
};

function setText(selector, text){
    const element = document.querySelector(selector);
    if(element){
        element.textContent = text;
    }
}

function setAllText(selector, text){
    document.querySelectorAll(selector).forEach(function(element){
        element.textContent = text;
    });
}

function setPlaceholder(id, text){
    const element = document.getElementById(id);
    if(element){
        element.placeholder = text;
    }
}

function setOptionText(id, index, text){
    const select = document.getElementById(id);
    if(select && select.options[index]){
        select.options[index].textContent = text;
    }
}

function applyLanguage(){
    const isAr = currentLang === "ar";
    const t = lang[currentLang];

    const langBtn = document.getElementById("langBtn");
    if(langBtn){
        langBtn.textContent = t.langBtn;
    }

    const links = document.querySelectorAll(".side-menu a");
    links.forEach(function(link, index){
        if(t.menu[index]){
            link.textContent = t.menu[index];
        }
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
    translateSettings(isAr);

    updateDate();
}

/* Dashboard */
function translateDashboard(isAr){
    if(!document.querySelector(".welcome-section")){
        return;
    }

    setText(".welcome-section h1", isAr ? "لوحة التحكم" : "Dashboard");

    const cards = document.querySelectorAll(".stat-card h3");

    if(cards.length >= 5){
        cards[0].textContent = isAr ? "الطلبات المتأخرة" : "Overdue Orders";
        cards[1].textContent = isAr ? "الطلبات قيد العمل" : "In Progress Orders";
        cards[2].textContent = isAr ? "الطلبات المكتملة" : "Completed Orders";
        cards[3].textContent = isAr ? "طلبات اليوم" : "Today's Orders";
        cards[4].textContent = isAr ? "إجمالي الإيرادات" : "Total Revenue";
    }

    const infoTitles = document.querySelectorAll(".info-box h2");

    if(infoTitles.length >= 3){
        infoTitles[0].textContent = isAr ? "أفضل الفنيين" : "Top Technicians";
        infoTitles[1].textContent = isAr ? "أفضل الأطباء" : "Top Dentists";
        infoTitles[2].textContent = isAr ? "تنبيهات سريعة" : "Quick Notifications";
    }
}

/* Orders */
function translateOrders(isAr){
    if(!document.getElementById("orderModal")){
        return;
    }

    setText(".orders-header h1", isAr ? "إدارة الطلبات" : "Order Management");
    setText(".orders-header p", isAr ? "إدارة طلبات مختبر الأسنان وسير العمل" : "Manage dental laboratory orders and workflow");
    setText(".orders-header .primary-btn", isAr ? "+ طلب جديد" : "+ New Order");

    setPlaceholder("searchInput", isAr ? "ابحث باسم المريض أو رقم الطلب" : "Search by patient name or order ID");

    setOptionText("statusFilter", 0, isAr ? "كل الحالات" : "All Status");
    setOptionText("statusFilter", 1, isAr ? "جديد" : "New");
    setOptionText("statusFilter", 2, isAr ? "قيد العمل" : "In Progress");
    setOptionText("statusFilter", 3, isAr ? "مراجعة" : "Review");
    setOptionText("statusFilter", 4, isAr ? "جاهز" : "Ready");
    setOptionText("statusFilter", 5, isAr ? "تم التسليم" : "Delivered");

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 10){
        headers[0].textContent = isAr ? "الإجراءات" : "Actions";
        headers[1].textContent = isAr ? "الحالة" : "Status";
        headers[2].textContent = isAr ? "رقم الطلب" : "Order ID";
        headers[3].textContent = isAr ? "اسم المريض" : "Patient Name";
        headers[4].textContent = isAr ? "نوع العمل" : "Type of Work";
        headers[5].textContent = isAr ? "تاريخ الطلب" : "Order Date";
        headers[6].textContent = isAr ? "تاريخ التسليم" : "Due Date";
        headers[7].textContent = isAr ? "الطبيب" : "Doctor";
        headers[8].textContent = isAr ? "الفني" : "Technician";
        headers[9].textContent = isAr ? "الإنجاز" : "Progress";
    }

    setText("#orderModal .modal-header h2", isAr ? "إضافة طلب جديد" : "Add New Order");

    const labels = document.querySelectorAll("#orderModal .form-group label");
    if(labels.length >= 8){
        labels[0].textContent = isAr ? "اسم المريض" : "Patient Name";
        labels[1].textContent = isAr ? "الطبيب" : "Doctor";
        labels[2].textContent = isAr ? "نوع العمل" : "Type Of Work";
        labels[3].textContent = isAr ? "الفني" : "Technician";
        labels[4].textContent = isAr ? "تاريخ التسليم" : "Delivery Date";
        labels[5].textContent = isAr ? "الأولوية" : "Priority";
        labels[6].textContent = isAr ? "صور الحالة" : "Case Images";
        labels[7].textContent = isAr ? "ملاحظات" : "Notes";
    }

    setText("#orderModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#orderModal .primary-btn", isAr ? "حفظ الطلب" : "Save Order");
}

/* Doctors */
function translateDoctors(isAr){
    if(!document.getElementById("doctorTableBody")){
        return;
    }

    setText(".orders-header h1", isAr ? "إدارة الأطباء" : "Doctors Management");
    setText(".orders-header p", isAr ? "إدارة الأطباء والسجلات المالية" : "Manage dentists and financial records");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة طبيب" : "+ Add Doctor");
    setPlaceholder("doctorSearch", isAr ? "ابحث عن طبيب..." : "Search doctor...");

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 8){
        headers[0].textContent = isAr ? "الإجراءات" : "Actions";
        headers[1].textContent = isAr ? "اسم الطبيب" : "Doctor Name";
        headers[2].textContent = isAr ? "الهاتف" : "Phone";
        headers[3].textContent = isAr ? "العنوان" : "Address";
        headers[4].textContent = isAr ? "الحالات" : "Cases";
        headers[5].textContent = isAr ? "إجمالي المستحق" : "Total Due";
        headers[6].textContent = isAr ? "إجمالي المدفوع" : "Total Paid";
        headers[7].textContent = isAr ? "المتبقي" : "Remaining";
    }

    setText("#doctorModal .modal-header h2", isAr ? "إضافة طبيب" : "Add Doctor");
    setText("#doctorModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#doctorModal .primary-btn", isAr ? "حفظ الطبيب" : "Save Doctor");
}

/* Patients */
function translatePatients(isAr){
    if(!document.getElementById("patientTableBody")){
        return;
    }

    setText(".orders-header h1", isAr ? "إدارة المرضى" : "Patients Management");
    setText(".orders-header p", isAr ? "إدارة المرضى والحالات الطبية" : "Manage patients and medical cases");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة مريض" : "+ Add Patient");
    setPlaceholder("patientSearch", isAr ? "ابحث عن مريض..." : "Search patient...");

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 7){
        headers[0].textContent = isAr ? "الإجراءات" : "Actions";
        headers[1].textContent = isAr ? "اسم المريض" : "Patient Name";
        headers[2].textContent = isAr ? "الهاتف" : "Phone";
        headers[3].textContent = isAr ? "الطبيب" : "Doctor";
        headers[4].textContent = isAr ? "نوع الحالة" : "Case Type";
        headers[5].textContent = isAr ? "آخر طلب" : "Last Order";
        headers[6].textContent = isAr ? "ملاحظات" : "Notes";
    }

    setText("#patientModal .modal-header h2", isAr ? "إضافة مريض" : "Add Patient");
    setText("#patientModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#patientModal .primary-btn", isAr ? "حفظ المريض" : "Save Patient");
}

/* Employees */
function translateEmployees(isAr){
    if(!document.getElementById("employeeTableBody")){
        return;
    }

    setText(".orders-header h1", isAr ? "إدارة الموظفين" : "Employees Management");
    setText(".orders-header p", isAr ? "إدارة الموظفين والصلاحيات والحالة والأداء" : "Manage employees, roles, status and performance");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة موظف" : "+ Add Employee");

    setPlaceholder("employeeSearch", isAr ? "ابحث عن موظف..." : "Search employee...");

    setOptionText("employeeStatusFilter", 0, isAr ? "كل الحالات" : "All Status");
    setOptionText("employeeStatusFilter", 1, isAr ? "نشط" : "Active");
    setOptionText("employeeStatusFilter", 2, isAr ? "غير نشط" : "Inactive");

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 9){
        headers[0].textContent = isAr ? "الإجراءات" : "Actions";
        headers[1].textContent = isAr ? "اسم الموظف" : "Employee Name";
        headers[2].textContent = isAr ? "اسم المستخدم" : "Username";
        headers[3].textContent = isAr ? "الهاتف" : "Phone";
        headers[4].textContent = isAr ? "المسمى الوظيفي" : "Job Title";
        headers[5].textContent = isAr ? "الصلاحية" : "Role";
        headers[6].textContent = isAr ? "الحالة" : "Status";
        headers[7].textContent = isAr ? "الأعمال المنجزة" : "Completed Works";
        headers[8].textContent = isAr ? "التقييم" : "Rating";
    }

    setText("#employeeModal .modal-header h2", isAr ? "إضافة موظف" : "Add Employee");
    setText("#employeeModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#employeeModal .primary-btn", isAr ? "حفظ الموظف" : "Save Employee");
}

/* Inventory */
function translateInventory(isAr){
    if(!document.getElementById("inventoryPageTitle")){
        return;
    }

    setText(".orders-header h1", isAr ? "إدارة المخزون" : "Inventory Management");
    setText(".orders-header p", isAr ? "إدارة مواد مختبر الأسنان ومستويات المخزون" : "Manage dental laboratory materials and stock levels");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة مادة" : "+ Add Item");

    setPlaceholder("inventorySearch", isAr ? "ابحث باسم المادة أو التصنيف" : "Search by item name or category");

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 9){
        headers[0].textContent = isAr ? "الإجراءات" : "Actions";
        headers[1].textContent = isAr ? "الحالة" : "Status";
        headers[2].textContent = isAr ? "اسم المادة" : "Item Name";
        headers[3].textContent = isAr ? "التصنيف" : "Category";
        headers[4].textContent = isAr ? "الكمية" : "Quantity";
        headers[5].textContent = isAr ? "الحد الأدنى" : "Minimum Stock";
        headers[6].textContent = isAr ? "سعر الوحدة" : "Unit Price";
        headers[7].textContent = isAr ? "القيمة الإجمالية" : "Total Value";
        headers[8].textContent = isAr ? "آخر تحديث" : "Last Updated";
    }

    setText("#inventoryModal .modal-header h2", isAr ? "إضافة مادة للمخزون" : "Add Inventory Item");
    setText("#inventoryModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#inventoryModal .primary-btn", isAr ? "حفظ المادة" : "Save Item");
}

/* Quality */
function translateQuality(isAr){
    if(!document.getElementById("qualityTableBody")){
        return;
    }

    setText(".orders-header h1", isAr ? "قسم الجودة" : "Quality Control");
    setText(".orders-header p", isAr ? "إدارة الحالات المرتجعة وأداء الجودة" : "Manage returned cases and quality performance");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة حالة مرتجعة" : "+ Add Returned Case");

    setPlaceholder("qualitySearch", isAr ? "ابحث عن حالة مرتجعة..." : "Search returned case...");

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 10){
        headers[0].textContent = isAr ? "الإجراءات" : "Actions";
        headers[1].textContent = isAr ? "الحالة" : "Status";
        headers[2].textContent = isAr ? "المريض" : "Patient";
        headers[3].textContent = isAr ? "الطبيب" : "Doctor";
        headers[4].textContent = isAr ? "الفني المسؤول" : "Technician";
        headers[5].textContent = isAr ? "نوع العمل" : "Work Type";
        headers[6].textContent = isAr ? "سبب الإرجاع" : "Return Reason";
        headers[7].textContent = isAr ? "تاريخ الإرجاع" : "Return Date";
        headers[8].textContent = isAr ? "نسبة الأخطاء" : "Error Rate";
        headers[9].textContent = isAr ? "ملاحظات الجودة" : "Quality Notes";
    }

    setText("#qualityModal .modal-header h2", isAr ? "إضافة حالة مرتجعة" : "Add Returned Case");
    setText("#qualityModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#qualityModal .primary-btn", isAr ? "حفظ الحالة" : "Save Case");
}

/* Notifications */
function translateNotifications(isAr){
    if(!document.getElementById("notificationTableBody")){
        return;
    }

    setText(".orders-header h1", isAr ? "الإشعارات" : "Notifications");
    setText(".orders-header p", isAr ? "إدارة التنبيهات والإشعارات المهمة" : "Manage system alerts and important updates");
    setText(".orders-header .primary-btn", isAr ? "+ إضافة إشعار" : "+ Add Notification");

    setPlaceholder("notificationSearch", isAr ? "ابحث عن إشعار..." : "Search notification...");

    setOptionText("notificationTypeFilter", 0, isAr ? "كل الإشعارات" : "All Notifications");
    setOptionText("notificationTypeFilter", 1, isAr ? "طلب جاهز" : "Ready Order");
    setOptionText("notificationTypeFilter", 2, isAr ? "طلب متأخر" : "Overdue Order");
    setOptionText("notificationTypeFilter", 3, isAr ? "مخزون منخفض" : "Low Stock");
    setOptionText("notificationTypeFilter", 4, isAr ? "دفعة مستحقة" : "Due Payment");
    setOptionText("notificationTypeFilter", 5, isAr ? "حالة مرتجعة" : "Returned Case");
    setOptionText("notificationTypeFilter", 6, isAr ? "تنبيه مدير" : "Manager Alert");

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 7){
        headers[0].textContent = isAr ? "الإجراءات" : "Actions";
        headers[1].textContent = isAr ? "الحالة" : "Status";
        headers[2].textContent = isAr ? "النوع" : "Type";
        headers[3].textContent = isAr ? "العنوان" : "Title";
        headers[4].textContent = isAr ? "الرسالة" : "Message";
        headers[5].textContent = isAr ? "الأولوية" : "Priority";
        headers[6].textContent = isAr ? "التاريخ" : "Date";
    }

    setText("#notificationModal .modal-header h2", isAr ? "إضافة إشعار" : "Add Notification");
    setText("#notificationModal .cancel-btn", isAr ? "إلغاء" : "Cancel");
    setText("#notificationModal .primary-btn", isAr ? "حفظ الإشعار" : "Save Notification");
}

/* Roles */
function translateRoles(isAr){
    if(!document.getElementById("rolesTableBody")){
        return;
    }

    setText(".orders-header h1", isAr ? "الصلاحيات" : "Roles & Permissions");
    setText(".orders-header p", isAr ? "إدارة مستويات الوصول لمستخدمي النظام" : "Manage access levels for system users");

    const btn = document.querySelector(".orders-header .primary-btn");
    if(btn){
        btn.textContent = isAr ? "حفظ الصلاحيات" : "Save Permissions";
    }

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 11){
        headers[0].textContent = isAr ? "الدور" : "Role";
        headers[1].textContent = isAr ? "لوحة التحكم" : "Dashboard";
        headers[2].textContent = isAr ? "الطلبات" : "Orders";
        headers[3].textContent = isAr ? "الأطباء" : "Doctors";
        headers[4].textContent = isAr ? "المرضى" : "Patients";
        headers[5].textContent = isAr ? "الموظفين" : "Employees";
        headers[6].textContent = isAr ? "المخزون" : "Inventory";
        headers[7].textContent = isAr ? "الجودة" : "Quality";
        headers[8].textContent = isAr ? "الإشعارات" : "Notifications";
        headers[9].textContent = isAr ? "الصلاحيات" : "Roles";
        headers[10].textContent = isAr ? "الإعدادات" : "Settings";
    }
}

/* Activity */
function translateActivity(isAr){
    if(!document.getElementById("activityTableBody")){
        return;
    }

    setText(".orders-header h1", isAr ? "سجل العمليات" : "Activity Logs");
    setText(".orders-header p", isAr ? "تتبع عمليات النظام ونشاط المستخدمين" : "Track system actions, user activities and changes");

    setPlaceholder("activitySearch", isAr ? "ابحث في السجل..." : "Search activity...");

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 6){
        headers[0].textContent = isAr ? "المستخدم" : "User";
        headers[1].textContent = isAr ? "نوع العملية" : "Action Type";
        headers[2].textContent = isAr ? "القسم" : "Section";
        headers[3].textContent = isAr ? "الوصف" : "Description";
        headers[4].textContent = isAr ? "التاريخ" : "Date";
        headers[5].textContent = isAr ? "الوقت" : "Time";
    }
}

/* Settings */
function translateSettings(isAr){
    if(!document.getElementById("settingsForm")){
        return;
    }

    setText(".orders-header h1", isAr ? "الإعدادات" : "Settings");
    setText(".orders-header p", isAr ? "إدارة معلومات المختبر وتفضيلات النظام" : "Manage laboratory information and system preferences");
    setText(".orders-header .primary-btn", isAr ? "حفظ الإعدادات" : "Save Settings");

    setText(".table-title strong", isAr ? "إعدادات المختبر" : "Laboratory Settings");

    const labels = document.querySelectorAll("#settingsForm .form-group label");
    if(labels.length >= 8){
        labels[0].textContent = isAr ? "اسم المختبر" : "Laboratory Name";
        labels[1].textContent = isAr ? "رقم الهاتف" : "Phone Number";
        labels[2].textContent = isAr ? "العنوان" : "Address";
        labels[3].textContent = isAr ? "العملة" : "Currency";
        labels[4].textContent = isAr ? "اللغة الافتراضية" : "Default Language";
        labels[5].textContent = isAr ? "ساعات العمل" : "Working Hours";
        labels[6].textContent = isAr ? "شعار المختبر" : "Laboratory Logo";
        labels[7].textContent = isAr ? "معاينة الشعار الحالي" : "Current Logo Preview";
    }

    setText("#settingsForm .cancel-btn", isAr ? "إعادة ضبط" : "Reset");
    setText("#settingsForm .primary-btn", isAr ? "حفظ الإعدادات" : "Save Settings");
}

function toggleLanguage(){
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("axisLang", currentLang);
    applyLanguage();
}

function updateDate(){
    const dateBox = document.getElementById("currentDate");

    if(!dateBox){
        return;
    }

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