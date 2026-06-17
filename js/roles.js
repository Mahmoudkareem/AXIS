let permissions = JSON.parse(localStorage.getItem("axisPermissions")) || [
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

const permissionKeys = [
    "dashboard",
    "orders",
    "doctors",
    "patients",
    "employees",
    "inventory",
    "quality",
    "notifications",
    "roles",
    "settings"
];

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

function mark(value){
    return value
        ? '<span style="color:#16a34a;font-weight:900;">✔</span>'
        : '<span style="color:#dc2626;font-weight:900;">✖</span>';
}

function savePermissions(){
    localStorage.setItem("axisPermissions", JSON.stringify(permissions));
}

function renderPermissions(){
    const tbody = document.getElementById("rolesTableBody");

    if(!tbody){
        return;
    }

    tbody.innerHTML = "";

    permissions.forEach(function(role, index){
        tbody.innerHTML += `
            <tr>
                <td class="action-icons">
                    <button type="button" onclick="editRole(${index})">✏️</button>
                    <button type="button" onclick="deleteRole(${index})">🗑️</button>
                </td>
                <td><strong>${role.role}</strong></td>
                <td>${mark(role.dashboard)}</td>
                <td>${mark(role.orders)}</td>
                <td>${mark(role.doctors)}</td>
                <td>${mark(role.patients)}</td>
                <td>${mark(role.employees)}</td>
                <td>${mark(role.inventory)}</td>
                <td>${mark(role.quality)}</td>
                <td>${mark(role.notifications)}</td>
                <td>${mark(role.roles)}</td>
                <td>${mark(role.settings)}</td>
            </tr>
        `;
    });

}

function openRoleModal(){
    document.getElementById("roleModal").style.display = "flex";
    document.getElementById("roleModalTitle").innerText = "Add New Role";
    document.getElementById("roleForm").reset();
    document.getElementById("editRoleIndex").value = "";
}

function closeRoleModal(){
    document.getElementById("roleModal").style.display = "none";
}

function getPermissionCheckboxes(){
    return document.querySelectorAll(".permissions-grid input[type='checkbox']");
}

function editRole(index){
    const role = permissions[index];

    openRoleModal();

    document.getElementById("roleModalTitle").innerText = "Edit Role";
    document.getElementById("roleName").value = role.role;
    document.getElementById("editRoleIndex").value = index;

    getPermissionCheckboxes().forEach(function(checkbox){
        const key = checkbox.value.toLowerCase();
        checkbox.checked = role[key] === true;
    });
}

function deleteRole(index){
    const roleName = permissions[index].role;

    if(confirm("Are you sure you want to delete " + roleName + "?")){
        permissions.splice(index, 1);
        savePermissions();

        logActivity(
            "Delete",
            "Roles",
            `Role ${roleName} deleted`
        );

        renderPermissions();
    }
}

const roleForm = document.getElementById("roleForm");

if(roleForm){
    roleForm.addEventListener("submit", function(event){
        event.preventDefault();

        const roleName = document.getElementById("roleName").value.trim();
        const editIndex = document.getElementById("editRoleIndex").value;

        if(roleName === ""){
            alert("Please enter role name");
            return;
        }

        const roleData = {
            role: roleName,
            dashboard: false,
            orders: false,
            doctors: false,
            patients: false,
            employees: false,
            inventory: false,
            quality: false,
            notifications: false,
            roles: false,
            settings: false
        };

        getPermissionCheckboxes().forEach(function(checkbox){
            const key = checkbox.value.toLowerCase();
            roleData[key] = checkbox.checked;
        });

        if(editIndex === ""){
            permissions.push(roleData);

            logActivity(
                "Add",
                "Roles",
                `New role ${roleData.role} added`
            );

        }else{
            const oldRole = permissions[editIndex];

            permissions[editIndex] = roleData;

            logActivity(
                "Edit",
                "Roles",
                `Role ${oldRole.role} updated`
            );

            const changedPermissions = [];

            permissionKeys.forEach(function(key){
                if(oldRole[key] !== roleData[key]){
                    changedPermissions.push(key);
                }
            });

            if(changedPermissions.length > 0){
                logActivity(
                    "Edit",
                    "Roles",
                    `Permissions changed for role ${roleData.role}: ${changedPermissions.join(", ")}`
                );
            }
        }

        savePermissions();
        renderPermissions();
        closeRoleModal();
    });
}

renderPermissions();