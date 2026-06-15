const defaultPermissions = [
    {
        role: "Lab Manager",
        dashboard: true,
        orders: true,
        doctors: true,
        patients: true,
        employees: true,
        inventory: true,
        quality: true,
        notifications: true,
        roles: true,
        settings: true
    },
    {
        role: "Assistant Manager",
        dashboard: true,
        orders: true,
        doctors: true,
        patients: true,
        employees: true,
        inventory: true,
        quality: true,
        notifications: true,
        roles: true,
        settings: true
    },
    {
        role: "Programmer",
        dashboard: true,
        orders: true,
        doctors: true,
        patients: true,
        employees: true,
        inventory: true,
        quality: true,
        notifications: true,
        roles: true,
        settings: true
    },
    {
        role: "Technician",
        dashboard: false,
        orders: true,
        doctors: false,
        patients: false,
        employees: false,
        inventory: false,
        quality: false,
        notifications: false,
        roles: false,
        settings: false
    }
];

let permissions = JSON.parse(localStorage.getItem("axisPermissions")) || defaultPermissions;

function renderPermissions(){
    const tbody = document.getElementById("rolesTableBody");
    tbody.innerHTML = "";

    permissions.forEach(function(item, index){
        const isTechnician = item.role === "Technician";
        const isFullAccess = item.role !== "Technician";

        tbody.innerHTML += `
            <tr>
                <td><strong>${item.role}</strong></td>

                <td>${createCheckbox(index, "dashboard", item.dashboard, isFullAccess)}</td>
                <td>${createCheckbox(index, "orders", item.orders, false)}</td>
                <td>${createCheckbox(index, "doctors", item.doctors, isFullAccess || isTechnician)}</td>
                <td>${createCheckbox(index, "patients", item.patients, isFullAccess || isTechnician)}</td>
                <td>${createCheckbox(index, "employees", item.employees, isFullAccess || isTechnician)}</td>
                <td>${createCheckbox(index, "inventory", item.inventory, isFullAccess || isTechnician)}</td>
                <td>${createCheckbox(index, "quality", item.quality, isFullAccess || isTechnician)}</td>
                <td>${createCheckbox(index, "notifications", item.notifications, isFullAccess || isTechnician)}</td>
                <td>${createCheckbox(index, "roles", item.roles, isFullAccess || isTechnician)}</td>
                <td>${createCheckbox(index, "settings", item.settings, isFullAccess || isTechnician)}</td>
            </tr>
        `;
    });
}

function createCheckbox(index, key, checked, disabled){
    return `
        <input
            type="checkbox"
            ${checked ? "checked" : ""}
            ${disabled ? "disabled" : ""}
            onchange="updatePermission(${index}, '${key}', this.checked)"
            style="width:20px;height:20px;accent-color:#B83280;"
        >
    `;
}

function updatePermission(index, key, value){
    permissions[index][key] = value;
}

function savePermissions(){
    localStorage.setItem("axisPermissions", JSON.stringify(permissions));

    alert("Permissions saved successfully");
}

renderPermissions();