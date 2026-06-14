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

        inventoryManagement: "Inventory Management",
        inventoryDesc: "Manage dental laboratory materials and stock levels",
        addItem: "+ Add Item",
        totalItems: "Total Items",
        inventoryMaterials: "Inventory materials",
        liveStockTracking: "Live stock tracking",
        lowStock: "Low Stock",
        needAttention: "Need attention",
        reorderSoon: "Reorder soon",
        outOfStock: "Out Of Stock",
        unavailableItems: "Unavailable items",
        immediateAction: "Immediate action",
        inventoryValue: "Inventory Value",
        totalStockValue: "Total stock value",
        autoCalculated: "Auto calculated",
        print: "🖨️ Print",
        export: "⬇️ Export",
        allStock: "All Stock",
        inStock: "In Stock",
        searchInventory: "Search by item name or category",
        totalItemsLabel: "Total Items: ",
        actions: "Actions",
        status: "Status",
        itemName: "Item Name",
        category: "Category",
        quantity: "Quantity",
        minimumStock: "Minimum Stock",
        unitPrice: "Unit Price",
        totalValue: "Total Value",
        lastUpdated: "Last Updated",
        addInventoryItem: "Add Inventory Item",
        enterItemName: "Enter item name",
        selectCategory: "Select Category",
        dentalMaterials: "Dental Materials",
        consumables: "Consumables",
        tools: "Tools",
        safety: "Safety",
        liquids: "Liquids",
        enterQuantity: "Enter quantity",
        minimumStockAlert: "Minimum stock alert",
        priceInJD: "Price in JD",
        notes: "Notes",
        writeNotes: "Write notes here",
        cancel: "Cancel",
        saveItem: "Save Item",

        ordersPageTitle: "Order Management",
        ordersPageDesc: "Manage dental laboratory orders and workflow",
        newOrder: "+ New Order",
        searchOrders: "Search by patient name or order ID",
        totalOrdersLabel: "Total Orders: ",
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
        saveOrder: "Save Order"
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

        inventoryManagement: "إدارة المخزون",
        inventoryDesc: "إدارة مواد مختبر الأسنان ومستويات المخزون",
        addItem: "+ إضافة مادة",
        totalItems: "إجمالي المواد",
        inventoryMaterials: "مواد المخزون",
        liveStockTracking: "تتبع مباشر للمخزون",
        lowStock: "مخزون منخفض",
        needAttention: "بحاجة للمتابعة",
        reorderSoon: "إعادة الطلب قريبًا",
        outOfStock: "نفد المخزون",
        unavailableItems: "مواد غير متوفرة",
        immediateAction: "إجراء فوري",
        inventoryValue: "قيمة المخزون",
        totalStockValue: "إجمالي قيمة المخزون",
        autoCalculated: "يتم حسابها تلقائيًا",
        print: "🖨️ طباعة",
        export: "⬇️ تصدير",
        allStock: "كل المخزون",
        inStock: "متوفر",
        searchInventory: "ابحث باسم المادة أو التصنيف",
        totalItemsLabel: "إجمالي المواد: ",
        actions: "الإجراءات",
        status: "الحالة",
        itemName: "اسم المادة",
        category: "التصنيف",
        quantity: "الكمية",
        minimumStock: "الحد الأدنى",
        unitPrice: "سعر الوحدة",
        totalValue: "القيمة الإجمالية",
        lastUpdated: "آخر تحديث",
        addInventoryItem: "إضافة مادة للمخزون",
        enterItemName: "أدخل اسم المادة",
        selectCategory: "اختر التصنيف",
        dentalMaterials: "مواد الأسنان",
        consumables: "مستهلكات",
        tools: "أدوات",
        safety: "السلامة",
        liquids: "سوائل",
        enterQuantity: "أدخل الكمية",
        minimumStockAlert: "حد التنبيه",
        priceInJD: "السعر بالدينار",
        notes: "ملاحظات",
        writeNotes: "اكتب ملاحظات هنا",
        cancel: "إلغاء",
        saveItem: "حفظ المادة",

        ordersPageTitle: "إدارة الطلبات",
        ordersPageDesc: "إدارة طلبات المختبر وسير العمل",
        newOrder: "+ طلب جديد",
        searchOrders: "ابحث باسم المريض أو رقم الطلب",
        totalOrdersLabel: "إجمالي الطلبات: ",
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
        saveOrder: "حفظ الطلب"
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

function setOptionText(selectId, index, text){
    const select = document.getElementById(selectId);
    if(select && select.options[index]){
        select.options[index].textContent = text;
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

    translateDashboard(t);
    translateOrdersPage(t);
    translateInventoryPage(t);
    updateDate();
}

function translateDashboard(t){
    if(!document.querySelector(".welcome-section")){
        return;
    }

    const pageTitle = document.querySelector(".welcome-section h1");
    if(pageTitle){
        pageTitle.textContent = t.dashboard;
    }

    if(document.getElementById("inventoryPageTitle")){
        return;
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

function translateOrdersPage(t){
    if(!document.getElementById("orderModal")){
        return;
    }

    const pageTitle = document.querySelector(".orders-header h1");
    if(pageTitle) pageTitle.textContent = t.ordersPageTitle;

    const pageDesc = document.querySelector(".orders-header p");
    if(pageDesc) pageDesc.textContent = t.ordersPageDesc;

    const newOrderBtn = document.querySelector(".orders-header .primary-btn");
    if(newOrderBtn) newOrderBtn.textContent = t.newOrder;

    const toolbarBtns = document.querySelectorAll(".orders-toolbar button");
    if(toolbarBtns.length >= 2){
        toolbarBtns[0].textContent = t.print;
        toolbarBtns[1].textContent = t.export;
    }

    setPlaceholder("searchInput", t.searchOrders);

    const totalOrders = JSON.parse(localStorage.getItem("axisOrders")) || [];
    const tableTitle = document.querySelector(".table-title strong");
    if(tableTitle) tableTitle.textContent = t.totalOrdersLabel + totalOrders.length;

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

    setById("inventorySideTitle", currentLang === "ar" ? "إدارة الطلبات" : "ORDER MANAGEMENT");

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

function translateInventoryPage(t){
    if(!document.getElementById("inventoryPageTitle")){
        return;
    }

    setById("inventoryPageTitle", t.inventoryManagement);
    setById("inventoryPageDesc", t.inventoryDesc);
    setById("addInventoryBtn", t.addItem);
    setById("inventorySideTitle", currentLang === "ar" ? "المخزون" : "INVENTORY");

    setById("totalItemsTitle", t.totalItems);
    setById("totalItemsText", t.inventoryMaterials);
    setById("totalItemsSpan", t.liveStockTracking);

    setById("lowStockTitle", t.lowStock);
    setById("lowStockText", t.needAttention);
    setById("lowStockSpan", t.reorderSoon);

    setById("outStockTitle", t.outOfStock);
    setById("outStockText", t.unavailableItems);
    setById("outStockSpan", t.immediateAction);

    setById("inventoryValueTitle", t.inventoryValue);
    setById("inventoryValueText", t.totalStockValue);
    setById("inventoryValueSpan", t.autoCalculated);

    setById("inventoryPrintBtn", t.print);
    setById("inventoryExportBtn", t.export);

    setOptionText("stockFilter", 0, t.allStock);
    setOptionText("stockFilter", 1, t.inStock);
    setOptionText("stockFilter", 2, t.lowStock);
    setOptionText("stockFilter", 3, t.outOfStock);

    setPlaceholder("inventorySearch", t.searchInventory);

    const inventoryItems = JSON.parse(localStorage.getItem("axisInventory")) || [];
    setById("inventoryTableTitle", t.totalItemsLabel + inventoryItems.length);

    setById("inventoryThActions", t.actions);
    setById("inventoryThStatus", t.status);
    setById("inventoryThItemName", t.itemName);
    setById("inventoryThCategory", t.category);
    setById("inventoryThQuantity", t.quantity);
    setById("inventoryThMinimum", t.minimumStock);
    setById("inventoryThPrice", t.unitPrice);
    setById("inventoryThValue", t.totalValue);
    setById("inventoryThUpdated", t.lastUpdated);

    setById("inventoryModalTitle", t.addInventoryItem);

    setById("itemNameLabel", t.itemName);
    setById("itemCategoryLabel", t.category);
    setById("itemQuantityLabel", t.quantity);
    setById("minimumStockLabel", t.minimumStock);
    setById("unitPriceLabel", t.unitPrice);
    setById("inventoryNotesLabel", t.notes);

    setPlaceholder("itemName", t.enterItemName);
    setPlaceholder("itemQuantity", t.enterQuantity);
    setPlaceholder("minimumStock", t.minimumStockAlert);
    setPlaceholder("unitPrice", t.priceInJD);
    setPlaceholder("inventoryNotes", t.writeNotes);

    setOptionText("itemCategory", 0, t.selectCategory);
    setOptionText("itemCategory", 1, t.dentalMaterials);
    setOptionText("itemCategory", 2, t.consumables);
    setOptionText("itemCategory", 3, t.tools);
    setOptionText("itemCategory", 4, t.safety);
    setOptionText("itemCategory", 5, t.liquids);

    setById("inventoryCancelBtn", t.cancel);
    setById("inventorySaveBtn", t.saveItem);

    const addBtn = document.getElementById("addInventoryBtn");
    if(addBtn){
        addBtn.textContent = t.addItem;
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