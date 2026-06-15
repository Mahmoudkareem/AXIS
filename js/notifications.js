let notifications = JSON.parse(localStorage.getItem("axisNotifications")) || [];
let editNotificationIndex = null;

function saveNotifications(){
    localStorage.setItem("axisNotifications", JSON.stringify(notifications));
}

function openNotificationModal(index = null){
    document.getElementById("notificationModal").style.display = "flex";

    if(index !== null){
        editNotificationIndex = index;
        const item = notifications[index];

        document.getElementById("notificationModalTitle").textContent = "Edit Notification";
        document.getElementById("notificationType").value = item.type;
        document.getElementById("notificationPriority").value = item.priority;
        document.getElementById("notificationStatus").value = item.status;
        document.getElementById("notificationDate").value = item.date;
        document.getElementById("notificationTitle").value = item.title;
        document.getElementById("notificationMessage").value = item.message;
    }else{
        editNotificationIndex = null;
        document.getElementById("notificationModalTitle").textContent = "Add Notification";
        document.getElementById("notificationForm").reset();

        const today = new Date().toISOString().split("T")[0];
        document.getElementById("notificationDate").value = today;
    }
}

function closeNotificationModal(){
    document.getElementById("notificationModal").style.display = "none";
    document.getElementById("notificationForm").reset();
    editNotificationIndex = null;
}

document.getElementById("notificationForm").addEventListener("submit", function(event){
    event.preventDefault();

    const notificationItem = {
        type: document.getElementById("notificationType").value,
        priority: document.getElementById("notificationPriority").value,
        status: document.getElementById("notificationStatus").value,
        date: document.getElementById("notificationDate").value,
        title: document.getElementById("notificationTitle").value.trim(),
        message: document.getElementById("notificationMessage").value.trim()
    };

    if(editNotificationIndex !== null){
        notifications[editNotificationIndex] = notificationItem;
    }else{
        notifications.push(notificationItem);
    }

    saveNotifications();
    closeNotificationModal();
    renderNotifications();
});

function deleteNotification(index){
    if(confirm("Delete this notification?")){
        notifications.splice(index, 1);
        saveNotifications();
        renderNotifications();
    }
}

function getNotificationStatusClass(status){
    if(status === "New") return "new";
    if(status === "In Review") return "review";
    if(status === "Completed") return "completed";
    return "progress";
}

function getPriorityClass(priority){
    if(priority === "Urgent") return "danger-text";
    if(priority === "High") return "danger-text";
    return "";
}

function renderNotifications(list = notifications){
    const tbody = document.getElementById("notificationTableBody");
    tbody.innerHTML = "";

    list.forEach(function(item, index){
        const statusClass = getNotificationStatusClass(item.status);
        const priorityClass = getPriorityClass(item.priority);

        tbody.innerHTML += `
            <tr>
                <td class="action-icons">
                    <button onclick="openNotificationModal(${index})">✏️</button>
                    <button onclick="deleteNotification(${index})">🗑️</button>
                </td>
                <td><span class="status ${statusClass}">${item.status}</span></td>
                <td>${item.type}</td>
                <td>${item.title}</td>
                <td>${item.message || "-"}</td>
                <td class="${priorityClass}">${item.priority}</td>
                <td>${item.date}</td>
            </tr>
        `;
    });

    updateNotificationStats();
}

function updateNotificationStats(){
    const total = notifications.length;
    const high = notifications.filter(item => item.priority === "High" || item.priority === "Urgent").length;
    const stock = notifications.filter(item => item.type === "Low Stock").length;
    const completed = notifications.filter(item => item.status === "Completed").length;

    document.getElementById("totalNotifications").textContent = total;
    document.getElementById("highNotifications").textContent = high;
    document.getElementById("stockNotifications").textContent = stock;
    document.getElementById("completedNotifications").textContent = completed;
    document.getElementById("notificationTableTitle").textContent = "Total Notifications: " + total;
}

function filterNotifications(){
    const searchValue = document.getElementById("notificationSearch").value.toLowerCase();
    const typeValue = document.getElementById("notificationTypeFilter").value;

    const filtered = notifications.filter(function(item){
        const matchesSearch =
            item.type.toLowerCase().includes(searchValue) ||
            item.title.toLowerCase().includes(searchValue) ||
            item.message.toLowerCase().includes(searchValue) ||
            item.priority.toLowerCase().includes(searchValue) ||
            item.status.toLowerCase().includes(searchValue);

        const matchesType =
            typeValue === "All" || item.type === typeValue;

        return matchesSearch && matchesType;
    });

    renderNotifications(filtered);
}

renderNotifications();
function translateNotificationsLocal(){
    const isAr = localStorage.getItem("axisLang") === "ar";

    const title = document.querySelector(".orders-header h1");
    const desc = document.querySelector(".orders-header p");
    const addBtn = document.querySelector(".orders-header .primary-btn");

    if(title) title.textContent = isAr ? "الإشعارات" : "Notifications";
    if(desc) desc.textContent = isAr ? "إدارة التنبيهات والإشعارات المهمة" : "Manage system alerts and important updates";
    if(addBtn) addBtn.textContent = isAr ? "+ إضافة إشعار" : "+ Add Notification";

    const cards = document.querySelectorAll(".stat-card");

    if(cards.length >= 4){
        cards[0].querySelector("h3").textContent = isAr ? "إجمالي الإشعارات" : "Total Notifications";
        cards[0].querySelector("p").textContent = isAr ? "كل تنبيهات النظام" : "All system alerts";
        cards[1].querySelector("h3").textContent = isAr ? "أولوية عالية" : "High Priority";
        cards[1].querySelector("p").textContent = isAr ? "بحاجة للمتابعة" : "Need attention";
        cards[2].querySelector("h3").textContent = isAr ? "تنبيهات المخزون" : "Stock Alerts";
        cards[2].querySelector("p").textContent = isAr ? "تحذيرات المخزون" : "Inventory warnings";
        cards[3].querySelector("h3").textContent = isAr ? "الإشعارات المكتملة" : "Completed Alerts";
        cards[3].querySelector("p").textContent = isAr ? "تمت معالجتها" : "Resolved alerts";
    }

    const search = document.getElementById("notificationSearch");
    if(search) search.placeholder = isAr ? "ابحث عن إشعار..." : "Search notification...";

    const filter = document.getElementById("notificationTypeFilter");
    if(filter && filter.options.length >= 7){
        filter.options[0].textContent = isAr ? "كل الإشعارات" : "All Notifications";
        filter.options[1].textContent = isAr ? "طلب جاهز" : "Ready Order";
        filter.options[2].textContent = isAr ? "طلب متأخر" : "Overdue Order";
        filter.options[3].textContent = isAr ? "مخزون منخفض" : "Low Stock";
        filter.options[4].textContent = isAr ? "دفعة مستحقة" : "Due Payment";
        filter.options[5].textContent = isAr ? "حالة مرتجعة" : "Returned Case";
        filter.options[6].textContent = isAr ? "تنبيه مدير" : "Manager Alert";
    }

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

    const items = JSON.parse(localStorage.getItem("axisNotifications")) || [];
    const tableTitle = document.getElementById("notificationTableTitle");
    if(tableTitle) tableTitle.textContent = isAr ? "إجمالي الإشعارات: " + items.length : "Total Notifications: " + items.length;

    const sideTitle = document.querySelector(".page-title-box h2");
    if(sideTitle) sideTitle.textContent = isAr ? "الإشعارات" : "NOTIFICATIONS";
}
const sideTitle = document.querySelector(".page-title-box h2");
if(sideTitle) sideTitle.textContent = isAr ? "الإشعارات" : "NOTIFICATIONS";
