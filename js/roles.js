const permissions = [
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

function mark(value){
    return value
        ? '<span style="color:#16a34a;font-weight:900;">✔</span>'
        : '<span style="color:#dc2626;font-weight:900;">✖</span>';
}

function renderPermissions(){
    const tbody = document.getElementById("rolesTableBody");

    if(!tbody){
        return;
    }

    tbody.innerHTML = "";

    permissions.forEach(function(role){
        tbody.innerHTML += `
            <tr>
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

function savePermissions(){
    localStorage.setItem("axisPermissions", JSON.stringify(permissions));
    alert("Permissions saved successfully");
}

renderPermissions();