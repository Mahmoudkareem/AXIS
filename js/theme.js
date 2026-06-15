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

        ordersPageTitle: "Order Management",
        ordersPageDesc: "Manage dental laboratory orders and workflow",
        newOrder: "+ New Order",
        searchOrders: "Search by patient name or order ID",
        totalOrdersLabel: "Total Orders: ",
        actions: "Actions",
        status: "Status",
        orderId: "Order ID",
        patientName: "Patient Name",
        typeOfWork: "Type of Work",
        orderDate: "Order Date",
        dueDate: "Due Date",
        doctor: "Doctor",
        technician: "Technician",
        progress: "Progress",
        addNewOrder: "Add New Order",
        deliveryDate: "Delivery Date",
        priority: "Priority",
        caseImages: "Case Images",
        notes: "Notes",
        cancel: "Cancel",
        saveOrder: "Save Order",

        doctorsPageTitle: "Doctors Management",
        doctorsPageDesc: "Manage dentists and financial records",
        addDoctor: "+ Add Doctor",
        totalDoctorsLabel: "Total Doctors: ",
        doctorName: "Doctor Name",
        phone: "Phone",
        phoneNumber: "Phone Number",
        address: "Address",
        cases: "Cases",
        totalDue: "Total Due",
        totalPaid: "Total Paid",
        remaining: "Remaining",
        saveDoctor: "Save Doctor",

        patientsPageTitle: "Patients Management",
        patientsPageDesc: "Manage patients and medical cases",
        addPatient: "+ Add Patient",
        totalPatientsLabel: "Total Patients: ",
        caseType: "Case Type",
        lastOrder: "Last Order",
        savePatient: "Save Patient",

        inventoryManagement: "Inventory Management",
        inventoryDesc: "Manage dental laboratory materials and stock levels",
        addItem: "+ Add Item",
        searchInventory: "Search by item name or category",
        totalItemsLabel: "Total Items: ",
        itemName: "Item Name",
        category: "Category",
        quantity: "Quantity",
        minimumStock: "Minimum Stock",
        unitPrice: "Unit Price",
        totalValue: "Total Value",
        lastUpdated: "Last Updated",
        saveItem: "Save Item",

        qualityPageTitle: "Quality Control",
        qualityPageDesc: "Manage returned cases and quality performance",
        addQuality: "+ Add Returned Case",
        totalQualityLabel: "Total Returned Cases: ",
        returnReason: "Return Reason",
        returnDate: "Return Date",
        errorRate: "Error Rate",
        qualityNotes: "Quality Notes",
        saveCase: "Save Case"
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

        ordersPageTitle: "إدارة الطلبات",
        ordersPageDesc: "إدارة طلبات المختبر وسير العمل",
        newOrder: "+ طلب جديد",
        searchOrders: "ابحث باسم المريض أو رقم الطلب",
        totalOrdersLabel: "إجمالي الطلبات: ",
        actions: "الإجراءات",
        status: "الحالة",
        orderId: "رقم الطلب",
        patientName: "اسم المريض",
        typeOfWork: "نوع العمل",
        orderDate: "تاريخ الطلب",
        dueDate: "تاريخ التسليم",
        doctor: "الطبيب",
        technician: "الفني",
        progress: "الإنجاز",
        addNewOrder: "إضافة طلب جديد",
        deliveryDate: "تاريخ التسليم",
        priority: "الأولوية",
        caseImages: "صور الحالة",
        notes: "ملاحظات",
        cancel: "إلغاء",
        saveOrder: "حفظ الطلب",

        doctorsPageTitle: "إدارة الأطباء",
        doctorsPageDesc: "إدارة الأطباء والسجلات المالية",
        addDoctor: "+ إضافة طبيب",
        totalDoctorsLabel: "إجمالي الأطباء: ",
        doctorName: "اسم الطبيب",
        phone: "الهاتف",
        phoneNumber: "رقم الهاتف",
        address: "العنوان",
        cases: "الحالات",
        totalDue: "إجمالي المستحق",
        totalPaid: "إجمالي المدفوع",
        remaining: "المتبقي",
        saveDoctor: "حفظ الطبيب",

        patientsPageTitle: "إدارة المرضى",
        patientsPageDesc: "إدارة المرضى والحالات الطبية",
        addPatient: "+ إضافة مريض",
        totalPatientsLabel: "إجمالي المرضى: ",
        caseType: "نوع الحالة",
        lastOrder: "آخر طلب",
        savePatient: "حفظ المريض",

        inventoryManagement: "إدارة المخزون",
        inventoryDesc: "إدارة مواد مختبر الأسنان ومستويات المخزون",
        addItem: "+ إضافة مادة",
        searchInventory: "ابحث باسم المادة أو التصنيف",
        totalItemsLabel: "إجمالي المواد: ",
        itemName: "اسم المادة",
        category: "التصنيف",
        quantity: "الكمية",
        minimumStock: "الحد الأدنى",
        unitPrice: "سعر الوحدة",
        totalValue: "القيمة الإجمالية",
        lastUpdated: "آخر تحديث",
        saveItem: "حفظ المادة",

        qualityPageTitle: "قسم الجودة",
        qualityPageDesc: "إدارة الحالات المرتجعة وأداء الجودة",
        addQuality: "+ إضافة حالة مرتجعة",
        totalQualityLabel: "إجمالي الحالات المرتجعة: ",
        returnReason: "سبب الإرجاع",
        returnDate: "تاريخ الإرجاع",
        errorRate: "نسبة الأخطاء",
        qualityNotes: "ملاحظات الجودة",
        saveCase: "حفظ الحالة"
    }
};

function setText(selector, text){
    document.querySelectorAll(selector).forEach(function(element){
        element.textContent = text;
    });
}

function setById(id, text){
    const element = document.getElementById(id);
    if(element){
        element.textContent = text;
    }
}

function setPlaceholder(id, text){
    const element = document.getElementById(id);
    if(element){
        element.placeholder = text;
    }
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

    translateOrdersPage(t);
    translateDoctorsPage(t);
    translatePatientsPage(t);
    translateInventoryPage(t);
    translateQualityPage(t);
    translateEmployeesPage();
    updateDate();
}

function translateOrdersPage(t){
    if(!document.getElementById("orderModal")){
        return;
    }

    const title = document.querySelector(".orders-header h1");
    const desc = document.querySelector(".orders-header p");
    const btn = document.querySelector(".orders-header .primary-btn");

    if(title) title.textContent = t.ordersPageTitle;
    if(desc) desc.textContent = t.ordersPageDesc;
    if(btn) btn.textContent = t.newOrder;

    setPlaceholder("searchInput", t.searchOrders);

    const orders = JSON.parse(localStorage.getItem("axisOrders")) || [];
    const tableTitle = document.querySelector(".table-title strong");
    if(tableTitle) tableTitle.textContent = t.totalOrdersLabel + orders.length;

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 10){
        headers[0].textContent = t.actions;
        headers[1].textContent = t.status;
        headers[2].textContent = t.orderId;
        headers[3].textContent = t.patientName;
        headers[4].textContent = t.typeOfWork;
        headers[5].textContent = t.orderDate;
        headers[6].textContent = t.dueDate;
        headers[7].textContent = t.doctor;
        headers[8].textContent = t.technician;
        headers[9].textContent = t.progress;
    }

    const modalTitle = document.querySelector("#orderModal .modal-header h2");
    if(modalTitle) modalTitle.textContent = t.addNewOrder;

    const labels = document.querySelectorAll("#orderModal .form-group label");
    if(labels.length >= 8){
        labels[0].textContent = t.patientName;
        labels[1].textContent = t.doctor;
        labels[2].textContent = t.typeOfWork;
        labels[3].textContent = t.technician;
        labels[4].textContent = t.deliveryDate;
        labels[5].textContent = t.priority;
        labels[6].textContent = t.caseImages;
        labels[7].textContent = t.notes;
    }

    const cancelBtn = document.querySelector("#orderModal .cancel-btn");
    if(cancelBtn) cancelBtn.textContent = t.cancel;

    const saveBtn = document.querySelector("#orderModal .primary-btn");
    if(saveBtn) saveBtn.textContent = t.saveOrder;
}

function translateDoctorsPage(t){
    if(!document.getElementById("doctorTableBody")){
        return;
    }

    const title = document.querySelector(".orders-header h1");
    const desc = document.querySelector(".orders-header p");
    const btn = document.querySelector(".orders-header .primary-btn");

    if(title) title.textContent = t.doctorsPageTitle;
    if(desc) desc.textContent = t.doctorsPageDesc;
    if(btn) btn.textContent = t.addDoctor;

    const doctors = JSON.parse(localStorage.getItem("axisDoctors")) || [];
    setById("doctorTableTitle", t.totalDoctorsLabel + doctors.length);

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 8){
        headers[0].textContent = t.actions;
        headers[1].textContent = t.doctorName;
        headers[2].textContent = t.phone;
        headers[3].textContent = t.address;
        headers[4].textContent = t.cases;
        headers[5].textContent = t.totalDue;
        headers[6].textContent = t.totalPaid;
        headers[7].textContent = t.remaining;
    }
}

function translatePatientsPage(t){
    if(!document.getElementById("patientTableBody")){
        return;
    }

    const title = document.querySelector(".orders-header h1");
    const desc = document.querySelector(".orders-header p");
    const btn = document.querySelector(".orders-header .primary-btn");

    if(title) title.textContent = t.patientsPageTitle;
    if(desc) desc.textContent = t.patientsPageDesc;
    if(btn) btn.textContent = t.addPatient;

    const patients = JSON.parse(localStorage.getItem("axisPatients")) || [];
    setById("patientTableTitle", t.totalPatientsLabel + patients.length);

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 7){
        headers[0].textContent = t.actions;
        headers[1].textContent = t.patientName;
        headers[2].textContent = t.phone;
        headers[3].textContent = t.doctor;
        headers[4].textContent = t.caseType;
        headers[5].textContent = t.lastOrder;
        headers[6].textContent = t.notes;
    }
}

function translateInventoryPage(t){
    if(!document.getElementById("inventoryPageTitle")){
        return;
    }

    setById("inventoryPageTitle", t.inventoryManagement);
    setById("inventoryPageDesc", t.inventoryDesc);
    setById("addInventoryBtn", t.addItem);
    setPlaceholder("inventorySearch", t.searchInventory);

    const inventoryItems = JSON.parse(localStorage.getItem("axisInventory")) || [];
    setById("inventoryTableTitle", t.totalItemsLabel + inventoryItems.length);
}

function translateQualityPage(t){
    if(!document.getElementById("qualityTableBody")){
        return;
    }

    const title = document.querySelector(".orders-header h1");
    const desc = document.querySelector(".orders-header p");
    const btn = document.querySelector(".orders-header .primary-btn");

    if(title) title.textContent = t.qualityPageTitle;
    if(desc) desc.textContent = t.qualityPageDesc;
    if(btn) btn.textContent = t.addQuality;

    const cases = JSON.parse(localStorage.getItem("axisQualityCases")) || [];
    setById("qualityTableTitle", t.totalQualityLabel + cases.length);

    const headers = document.querySelectorAll(".orders-table th");
    if(headers.length >= 10){
        headers[0].textContent = t.actions;
        headers[1].textContent = t.status;
        headers[2].textContent = t.patientName;
        headers[3].textContent = t.doctor;
        headers[4].textContent = t.technician;
        headers[5].textContent = t.typeOfWork;
        headers[6].textContent = t.returnReason;
        headers[7].textContent = t.returnDate;
        headers[8].textContent = t.errorRate;
        headers[9].textContent = t.qualityNotes;
    }

    const saveBtn = document.querySelector("#qualityModal .primary-btn");
    if(saveBtn) saveBtn.textContent = t.saveCase;
}

function translateEmployeesPage(){
    if(!document.getElementById("employeeTableBody")){
        return;
    }

    const isAr = currentLang === "ar";

    const title = document.querySelector(".orders-header h1");
    const desc = document.querySelector(".orders-header p");
    const btn = document.querySelector(".orders-header .primary-btn");

    if(title) title.textContent = isAr ? "إدارة الموظفين" : "Employees Management";
    if(desc) desc.textContent = isAr ? "إدارة الموظفين والصلاحيات والحالة والأداء" : "Manage employees, roles, status and performance";
    if(btn) btn.textContent = isAr ? "+ إضافة موظف" : "+ Add Employee";

    setPlaceholder("employeeSearch", isAr ? "ابحث عن موظف..." : "Search employee...");
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