let activityLogs = JSON.parse(localStorage.getItem("axisActivityLogs")) || [];

function saveActivityLogs(){
    localStorage.setItem("axisActivityLogs", JSON.stringify(activityLogs));
}

function getCurrentUserName(){
    const user = JSON.parse(localStorage.getItem("axisUser"));

    if(user && user.name){
        return user.name;
    }

    return "System User";
}

function addActivityLog(actionType, section, description){
    const now = new Date();

    const log = {
        user: getCurrentUserName(),
        actionType: actionType,
        section: section,
        description: description,
        date: now.toLocaleDateString("en-US"),
        time: now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
        })
    };

    activityLogs.unshift(log);
    saveActivityLogs();

    if(document.getElementById("activityTableBody")){
        renderActivityLogs();
    }
}

function renderActivityLogs(list = activityLogs){
    const tbody = document.getElementById("activityTableBody");

    if(!tbody){
        return;
    }

    tbody.innerHTML = "";

    list.forEach(function(log){
        tbody.innerHTML += `
            <tr>
                <td>${log.user}</td>
                <td><span class="status ${getActionClass(log.actionType)}">${log.actionType}</span></td>
                <td>${log.section}</td>
                <td>${log.description}</td>
                <td>${log.date}</td>
                <td>${log.time}</td>
            </tr>
        `;
    });

    updateActivityStats();
}

function getActionClass(actionType){
    if(actionType === "Add") return "new";
    if(actionType === "Edit") return "review";
    if(actionType === "Delete") return "progress";
    if(actionType === "Print") return "completed";
    if(actionType === "Login") return "completed";
    if(actionType === "Logout") return "completed";

    return "new";
}

function updateActivityStats(){
    const total = activityLogs.length;
    const add = activityLogs.filter(log => log.actionType === "Add").length;
    const edit = activityLogs.filter(log => log.actionType === "Edit").length;
    const del = activityLogs.filter(log => log.actionType === "Delete").length;

    const totalLogs = document.getElementById("totalLogs");
    const addLogs = document.getElementById("addLogs");
    const editLogs = document.getElementById("editLogs");
    const deleteLogs = document.getElementById("deleteLogs");
    const activityTableTitle = document.getElementById("activityTableTitle");

    if(totalLogs) totalLogs.textContent = total;
    if(addLogs) addLogs.textContent = add;
    if(editLogs) editLogs.textContent = edit;
    if(deleteLogs) deleteLogs.textContent = del;
    if(activityTableTitle) activityTableTitle.textContent = "Total Logs: " + total;
}

function filterActivityLogs(){
    const searchInput = document.getElementById("activitySearch");
    const typeFilter = document.getElementById("activityTypeFilter");

    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const typeValue = typeFilter ? typeFilter.value : "All";

    const filtered = activityLogs.filter(function(log){
        const matchesSearch =
            log.user.toLowerCase().includes(searchValue) ||
            log.actionType.toLowerCase().includes(searchValue) ||
            log.section.toLowerCase().includes(searchValue) ||
            log.description.toLowerCase().includes(searchValue) ||
            log.date.toLowerCase().includes(searchValue) ||
            log.time.toLowerCase().includes(searchValue);

        const matchesType =
            typeValue === "All" || log.actionType === typeValue;

        return matchesSearch && matchesType;
    });

    renderActivityLogs(filtered);
}

if(document.getElementById("activityTableBody")){
    renderActivityLogs();
}