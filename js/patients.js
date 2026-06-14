let patients = JSON.parse(localStorage.getItem("axisPatients")) || [];
let editPatientIndex = null;

const defaultPatients = [
    {
        name: "Sarah Mohammed",
        phone: "0791111111",
        doctor: "Dr. Ahmed",
        caseType: "Zirconia Crown",
        lastOrder: "2026-06-10",
        notes: "Needs urgent delivery"
    },
    {
        name: "Ahmed Gamal",
        phone: "0792222222",
        doctor: "Dr. Sara",
        caseType: "E-max Veneer",
        lastOrder: "2026-06-12",
        notes: ""
    },
    {
        name: "Nour Eldin",
        phone: "0793333333",
        doctor: "Dr. Kareem",
        caseType: "Partial Denture",
        lastOrder: "2026-06-13",
        notes: "Review shade before delivery"
    }
];

if(patients.length === 0){
    patients = defaultPatients;
    savePatients();
}

function openPatientModal(){
    document.getElementById("patientModal").style.display = "flex";
}

function closePatientModal(){
    document.getElementById("patientModal").style.display = "none";
    document.getElementById("patientForm").reset();
    editPatientIndex = null;
}

function savePatients(){
    localStorage.setItem("axisPatients", JSON.stringify(patients));
}

function renderPatients(){
    const tableBody = document.getElementById("patientTableBody");
    tableBody.innerHTML = "";

    let patientsWithNotes = 0;
    const doctorsSet = new Set();

    patients.forEach(function(patient, index){
        if(patient.notes && patient.notes.trim() !== ""){
            patientsWithNotes++;
        }

        if(patient.doctor && patient.doctor.trim() !== ""){
            doctorsSet.add(patient.doctor.trim());
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="action-icons">
                <button onclick="deletePatient(${index})">🗑️</button>
                <button onclick="editPatient(${index})">✏️</button>
            </td>
            <td>${patient.name}</td>
            <td>${patient.phone || "-"}</td>
            <td>${patient.doctor || "-"}</td>
            <td>${patient.caseType || "-"}</td>
            <td>${patient.lastOrder || "-"}</td>
            <td>${patient.notes || "-"}</td>
        `;

        tableBody.appendChild(row);
    });

    document.getElementById("totalPatients").textContent = patients.length;
    document.getElementById("patientTotalCases").textContent = patients.length;
    document.getElementById("linkedDoctors").textContent = doctorsSet.size;
    document.getElementById("patientsWithNotes").textContent = patientsWithNotes;
    document.getElementById("patientTableTitle").textContent = "Total Patients: " + patients.length;

    filterPatients();
}

function editPatient(index){
    editPatientIndex = index;
    const patient = patients[index];

    document.getElementById("patientName").value = patient.name;
    document.getElementById("patientPhone").value = patient.phone || "";
    document.getElementById("patientDoctor").value = patient.doctor || "";
    document.getElementById("patientCaseType").value = patient.caseType || "";
    document.getElementById("patientLastOrder").value = patient.lastOrder || "";
    document.getElementById("patientNotes").value = patient.notes || "";

    openPatientModal();
}

function deletePatient(index){
    if(confirm("Are you sure you want to delete this patient?")){
        patients.splice(index, 1);
        savePatients();
        renderPatients();
    }
}

document.getElementById("patientForm").addEventListener("submit", function(e){
    e.preventDefault();

    const patientData = {
        name: document.getElementById("patientName").value,
        phone: document.getElementById("patientPhone").value,
        doctor: document.getElementById("patientDoctor").value,
        caseType: document.getElementById("patientCaseType").value,
        lastOrder: document.getElementById("patientLastOrder").value,
        notes: document.getElementById("patientNotes").value
    };

    if(editPatientIndex === null){
        patients.push(patientData);
    }else{
        patients[editPatientIndex] = patientData;
        editPatientIndex = null;
    }

    savePatients();
    renderPatients();
    closePatientModal();
});

function filterPatients(){
    const searchInput = document.getElementById("patientSearch");
    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";

    const rows = document.querySelectorAll("#patientTableBody tr");

    rows.forEach(function(row){
        const rowText = row.innerText.toLowerCase();
        row.style.display = rowText.includes(searchValue) ? "" : "none";
    });
}

function exportPatients(){
    alert("Export patients feature will be connected later.");
}

const patientModal = document.getElementById("patientModal");

window.addEventListener("click", function(event){
    if(event.target === patientModal){
        closePatientModal();
    }
});

renderPatients();