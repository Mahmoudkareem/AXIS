let employees = JSON.parse(localStorage.getItem("axisEmployees")) || [];
let editEmployeeIndex = null;

const defaultEmployees = [
    {
        name:"Mahmoud Kareem",
        username:"mahmoud",
        password:"123456",
        phone:"0790000000",
        job:"Lab Manager",
        role:"Lab Manager",
        status:"Active",
        works:120,
        rating:5
    },
    {
        name:"Ahmed Ali",
        username:"ahmed",
        password:"123456",
        phone:"0791111111",
        job:"Dental Technician",
        role:"Technician",
        status:"Active",
        works:85,
        rating:5
    },
    {
        name:"Sara Mohammed",
        username:"sara",
        password:"123456",
        phone:"0792222222",
        job:"Accountant",
        role:"Accountant",
        status:"Active",
        works:45,
        rating:4
    }
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

if(employees.length === 0){
    employees = defaultEmployees;
    saveEmployees();
}

function saveEmployees(){
    localStorage.setItem("axisEmployees", JSON.stringify(employees));
}

function openEmployeeModal(){
    document.getElementById("employeeModal").style.display = "flex";
}

function closeEmployeeModal(){
    document.getElementById("employeeModal").style.display = "none";
    document.getElementById("employeeForm").reset();
    editEmployeeIndex = null;
}

function renderEmployees(){
    const tableBody = document.getElementById("employeeTableBody");
    tableBody.innerHTML = "";

    let activeCount = 0;
    let technicianCount = 0;
    let totalWorks = 0;

    employees.forEach(function(employee, index){
        if(employee.status === "Active"){
            activeCount++;
        }

        if(employee.role === "Technician"){
            technicianCount++;
        }

        totalWorks += Number(employee.works);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <button onclick="deleteEmployee(${index})">🗑️</button>
                <button onclick="editEmployee(${index})">✏️</button>
            </td>

            <td>${employee.name}</td>
            <td>${employee.username}</td>
            <td>${employee.phone}</td>
            <td>${employee.job}</td>
            <td>${employee.role}</td>

            <td>
                <span class="status ${employee.status === "Active" ? "completed" : "review"}">
                    ${employee.status}
                </span>
            </td>

            <td>${employee.works}</td>
            <td>⭐ ${employee.rating}</td>
        `;

        tableBody.appendChild(row);
    });

    document.getElementById("totalEmployees").textContent = employees.length;
    document.getElementById("activeEmployees").textContent = activeCount;
    document.getElementById("technicianEmployees").textContent = technicianCount;
    document.getElementById("completedWorks").textContent = totalWorks;
    document.getElementById("employeeTableTitle").textContent = "Total Employees: " + employees.length;

    filterEmployees();

}

function editEmployee(index){
    editEmployeeIndex = index;

    const employee = employees[index];

    document.getElementById("employeeName").value = employee.name;
    document.getElementById("employeeUsername").value = employee.username;
    document.getElementById("employeePassword").value = employee.password;
    document.getElementById("employeePhone").value = employee.phone;
    document.getElementById("employeeJob").value = employee.job;
    document.getElementById("employeeRole").value = employee.role;
    document.getElementById("employeeStatus").value = employee.status;
    document.getElementById("employeeWorks").value = employee.works;
    document.getElementById("employeeRating").value = employee.rating;

    openEmployeeModal();
}

function deleteEmployee(index){
    if(confirm("Delete this employee?")){
        const deletedEmployee = employees[index];

        employees.splice(index, 1);

        saveEmployees();

        logActivity(
            "Delete",
            "Employees",
            `Employee ${deletedEmployee.name} deleted`
        );

        renderEmployees();
    }
}

const employeeForm = document.getElementById("employeeForm");

if(employeeForm){
    employeeForm.addEventListener("submit", function(e){
        e.preventDefault();

        const employeeData = {
            name: document.getElementById("employeeName").value,
            username: document.getElementById("employeeUsername").value,
            password: document.getElementById("employeePassword").value,
            phone: document.getElementById("employeePhone").value,
            job: document.getElementById("employeeJob").value,
            role: document.getElementById("employeeRole").value,
            status: document.getElementById("employeeStatus").value,
            works: Number(document.getElementById("employeeWorks").value),
            rating: Number(document.getElementById("employeeRating").value)
        };

        if(editEmployeeIndex === null){
            employees.push(employeeData);

            logActivity(
                "Add",
                "Employees",
                `New employee ${employeeData.name} added`
            );

        }else{
            const oldEmployee = employees[editEmployeeIndex];

            employees[editEmployeeIndex] = employeeData;

            logActivity(
                "Edit",
                "Employees",
                `Employee ${oldEmployee.name} updated`
            );

            if(oldEmployee.status !== employeeData.status){
                logActivity(
                    "Edit",
                    "Employees",
                    `Employee ${employeeData.name} status changed from ${oldEmployee.status} to ${employeeData.status}`
                );
            }

            if(oldEmployee.role !== employeeData.role){
                logActivity(
                    "Edit",
                    "Employees",
                    `Employee ${employeeData.name} role changed from ${oldEmployee.role} to ${employeeData.role}`
                );
            }

            editEmployeeIndex = null;
        }

        saveEmployees();
        renderEmployees();
        closeEmployeeModal();
    });
}

function filterEmployees(){
    const searchInput = document.getElementById("employeeSearch");
    const statusSelect = document.getElementById("employeeStatusFilter");

    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const statusFilter = statusSelect ? statusSelect.value : "All";

    const rows = document.querySelectorAll("#employeeTableBody tr");

    rows.forEach(function(row){
        const text = row.innerText.toLowerCase();
        const statusElement = row.querySelector(".status");
        const status = statusElement ? statusElement.innerText.trim() : "";

        const matchSearch = text.includes(searchValue);
        const matchStatus = statusFilter === "All" || status === statusFilter;

        row.style.display = (matchSearch && matchStatus) ? "" : "none";
    });
}

function exportEmployees(){
    logActivity(
        "Export",
        "Employees",
        "Employees list export requested"
    );

    alert("Export feature will be connected later.");
}

window.addEventListener("click", function(e){
    const modal = document.getElementById("employeeModal");

    if(e.target === modal){
        closeEmployeeModal();
    }
});

renderEmployees();