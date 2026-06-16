let notifications = JSON.parse(localStorage.getItem("axisNotifications")) || [];
let editNotificationIndex = null;

function logActivity(actionType, section, description){
    if(typeof addActivityLog === "function"){
        addActivityLog(actionType, section, description);
    }else{
        const logs = JSON.parse(localStorage.getItem("axisActivityLogs")) || [];
        const user = JSON.parse(localStorage.getItem("axisUser"));
        const now = new Date();

        logs.unshift({
            user: user && user.name ? user.name : "System User",
            actionType: actionType,
            section: section,
            description: description,
            date: now.toLocaleDateString("en-US"),
            time: now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
            })
        });

        localStorage.setItem("axisActivityLogs", JSON.stringify(logs));
    }
}

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

    if(typeof applyLanguage === "function"){
        applyLanguage();
    }
}

function closeNotificationModal(){
    document.getElementById("notificationModal").style.display = "none";
    document.getElementById("notificationForm").reset();
    editNotificationIndex = null;
}

const notificationForm = document.getElementById("notificationForm");

if(notificationForm){
    notificationForm.addEventListener("submit", function(event){
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
            const oldNotification = notifications[editNotificationIndex];

            notifications[editNotificationIndex] = notificationItem;

            logActivity(
                "Edit",
                "Notifications",
                `Notification "${oldNotification.title}" updated`
            );

            if(oldNotification.status !== notificationItem.status){
                logActivity(
                    "Edit",
                    "Notifications",
                    `Notification "${notificationItem.title}" status changed from ${oldNotification.status} to ${notificationItem.status}`
                );
            }

            if(oldNotification.priority !== notificationItem.priority){
                logActivity(
                    "Edit",
                    "Notifications",
                    `Notification "${notificationItem.title}" priority changed from ${oldNotification.priority} to ${notificationItem.priority}`
                );
            }

            editNotificationIndex = null;

        }else{
            notifications.push(notificationItem);

            logActivity(
                "Add",
                "Notifications",
                `New notification "${notificationItem.title}" added`
            );
        }

        saveNotifications();
        closeNotificationModal();
        renderNotifications();
    });
}

function deleteNotification(index){
    if(confirm("Delete this notification?")){
        const deletedNotification = notifications[index];

        notifications.splice(index, 1);
        saveNotifications();

        logActivity(
            "Delete",
            "Notifications",
            `Notification "${deletedNotification.title}" deleted`
        );

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

    if(!tbody){
        return;
    }

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

    if(typeof applyLanguage === "function"){
        applyLanguage();
    }
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
    const searchInput = document.getElementById("notificationSearch");
    const typeFilter = document.getElementById("notificationTypeFilter");

    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const typeValue = typeFilter ? typeFilter.value : "All";

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

function exportNotifications(){
    logActivity(
        "Export",
        "Notifications",
        "Notifications list export requested"
    );

    alert("Export notifications feature will be connected later.");
}

const notificationModal = document.getElementById("notificationModal");

window.addEventListener("click", function(event){
    if(event.target === notificationModal){
        closeNotificationModal();
    }
});

renderNotifications();