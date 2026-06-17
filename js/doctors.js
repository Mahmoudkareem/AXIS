let doctors = JSON.parse(localStorage.getItem("axisDoctors")) || [];
let editDoctorIndex = null;

const defaultDoctors = [
    {
        name: "Dr. Ahmed",
        phone: "0790000001",
        address: "Amman",
        cases: 24,
        due: 850,
        paid: 500
    },
    {
        name: "Dr. Sara",
        phone: "0790000002",
        address: "Zarqa",
        cases: 18,
        due: 620,
        paid: 620
    },
    {
        name: "Dr. Kareem",
        phone: "0790000003",
        address: "Irbid",
        cases: 12,
        due: 430,
        paid: 250
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

if(doctors.length === 0){
    doctors = defaultDoctors;
    saveDoctors();
}

function openDoctorModal(){
    document.getElementById("doctorModal").style.display = "flex";
}

function closeDoctorModal(){
    document.getElementById("doctorModal").style.display = "none";
    document.getElementById("doctorForm").reset();
    editDoctorIndex = null;
}

function saveDoctors(){
    localStorage.setItem("axisDoctors", JSON.stringify(doctors));
}

function renderDoctors(){
    const tableBody = document.getElementById("doctorTableBody");
    tableBody.innerHTML = "";

    let totalCases = 0;
    let totalRevenue = 0;
    let totalDue = 0;

    doctors.forEach(function(doctor, index){
        const cases = Number(doctor.cases);
        const due = Number(doctor.due);
        const paid = Number(doctor.paid);
        const remaining = due - paid;

        totalCases += cases;
        totalRevenue += paid;
        totalDue += remaining;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="action-icons">
                <button onclick="deleteDoctor(${index})">🗑️</button>
                <button onclick="editDoctor(${index})">✏️</button>
            </td>
            <td>${doctor.name}</td>
            <td>${doctor.phone}</td>
            <td>${doctor.address}</td>
            <td>${cases}</td>
            <td>${due.toFixed(2)} JD</td>
            <td>${paid.toFixed(2)} JD</td>
            <td>${remaining.toFixed(2)} JD</td>
        `;

        tableBody.appendChild(row);
    });

    document.getElementById("totalDoctors").textContent = doctors.length;
    document.getElementById("totalCases").textContent = totalCases;
    document.getElementById("totalRevenue").textContent = totalRevenue.toFixed(2) + " JD";
    document.getElementById("totalDue").textContent = totalDue.toFixed(2) + " JD";
    document.getElementById("doctorTableTitle").textContent = "Total Doctors: " + doctors.length;

    filterDoctors();

}

function editDoctor(index){
    editDoctorIndex = index;
    const doctor = doctors[index];

    document.getElementById("doctorName").value = doctor.name;
    document.getElementById("doctorPhone").value = doctor.phone;
    document.getElementById("doctorAddress").value = doctor.address;
    document.getElementById("doctorCases").value = doctor.cases;
    document.getElementById("doctorDue").value = doctor.due;
    document.getElementById("doctorPaid").value = doctor.paid;

    openDoctorModal();
}

function deleteDoctor(index){
    if(confirm("Are you sure you want to delete this doctor?")){
        const deletedDoctor = doctors[index];

        doctors.splice(index, 1);
        saveDoctors();

        logActivity(
            "Delete",
            "Doctors",
            `Doctor ${deletedDoctor.name} deleted`
        );

        renderDoctors();
    }
}

const doctorForm = document.getElementById("doctorForm");

if(doctorForm){
    doctorForm.addEventListener("submit", function(e){
        e.preventDefault();

        const doctorData = {
            name: document.getElementById("doctorName").value,
            phone: document.getElementById("doctorPhone").value,
            address: document.getElementById("doctorAddress").value,
            cases: Number(document.getElementById("doctorCases").value),
            due: Number(document.getElementById("doctorDue").value),
            paid: Number(document.getElementById("doctorPaid").value)
        };

        if(editDoctorIndex === null){
            doctors.push(doctorData);

            logActivity(
                "Add",
                "Doctors",
                `New doctor ${doctorData.name} added`
            );

        }else{
            const oldDoctor = doctors[editDoctorIndex];

            doctors[editDoctorIndex] = doctorData;

            logActivity(
                "Edit",
                "Doctors",
                `Doctor ${oldDoctor.name} updated`
            );

            if(Number(oldDoctor.paid) !== Number(doctorData.paid)){
                logActivity(
                    "Edit",
                    "Doctors",
                    `Doctor ${doctorData.name} paid amount changed from ${oldDoctor.paid} JD to ${doctorData.paid} JD`
                );
            }

            if(Number(oldDoctor.due) !== Number(doctorData.due)){
                logActivity(
                    "Edit",
                    "Doctors",
                    `Doctor ${doctorData.name} due amount changed from ${oldDoctor.due} JD to ${doctorData.due} JD`
                );
            }

            editDoctorIndex = null;
        }

        saveDoctors();
        renderDoctors();
        closeDoctorModal();
    });
}

function filterDoctors(){
    const searchInput = document.getElementById("doctorSearch");
    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";

    const rows = document.querySelectorAll("#doctorTableBody tr");

    rows.forEach(function(row){
        const rowText = row.innerText.toLowerCase();
        row.style.display = rowText.includes(searchValue) ? "" : "none";
    });
}

function printDoctors(){
    logActivity(
        "Print",
        "Doctors",
        "Doctors list printed"
    );

    window.print();
}

function exportDoctors(){
    logActivity(
        "Export",
        "Doctors",
        "Doctors list export requested"
    );

    alert("Export feature will be connected later.");
}

const doctorModal = document.getElementById("doctorModal");

window.addEventListener("click", function(event){
    if(event.target === doctorModal){
        closeDoctorModal();
    }
});

renderDoctors();