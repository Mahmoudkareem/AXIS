let appointments =
    JSON.parse(localStorage.getItem("axisDoctorAppointments")) || [];

let selectedAppointmentIndex = null;

function saveAppointments(){
    localStorage.setItem(
        "axisDoctorAppointments",
        JSON.stringify(appointments)
    );
}

function setText(id, value){
    const element = document.getElementById(id);
    if(element){
        element.textContent = value;
    }
}

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

function getStatusClass(status){
    if(status === "Pending") return "review";
    if(status === "Approved") return "completed";
    if(status === "Rejected") return "new";
    return "progress";
}

function updateAppointmentStats(){
    const total = appointments.length;
    const pending = appointments.filter(item => item.status === "Pending").length;
    const approved = appointments.filter(item => item.status === "Approved").length;
    const rejected = appointments.filter(item => item.status === "Rejected").length;

    setText("totalAppointments", total);
    setText("pendingAppointments", pending);
    setText("approvedAppointments", approved);
    setText("rejectedAppointments", rejected);
    setText("appointmentsBadge", pending);
    setText("appointmentAdminTitle", "Appointment Requests: " + total);
}

function renderAppointments(){
    const tbody = document.getElementById("adminAppointmentTableBody");

    if(!tbody){
        return;
    }

    tbody.innerHTML = "";

    appointments.forEach(function(item, index){
        const statusClass = getStatusClass(item.status);

        tbody.innerHTML += `
            <tr>
                <td class="action-icons">
                    <button onclick="openApproveAppointmentModal(${index})">✅</button>
                    <button onclick="rejectAppointment(${index})">❌</button>
                </td>
                <td><span class="status ${statusClass}">${item.status}</span></td>
                <td>${item.doctorName}</td>
                <td>${item.requestedDate}</td>
                <td>${item.requestedTime}</td>
                <td>${item.reason}</td>
                <td>${item.approvedDate || "-"}</td>
                <td>${item.approvedDay || "-"}</td>
                <td>${item.approvedTime || "-"}</td>
            </tr>
        `;
    });

    updateAppointmentStats();

    if(typeof applyLanguage === "function"){
        applyLanguage();
    }
}

function openApproveAppointmentModal(index){
    selectedAppointmentIndex = index;

    document.getElementById("approveAppointmentModal").style.display = "flex";

    const item = appointments[index];

    document.getElementById("approvedDate").value =
        item.approvedDate || item.requestedDate || "";

    document.getElementById("approvedDay").value =
        item.approvedDay || "";

    document.getElementById("approvedTime").value =
        item.approvedTime || item.requestedTime || "";
}

function closeApproveAppointmentModal(){
    document.getElementById("approveAppointmentModal").style.display = "none";
    document.getElementById("approveAppointmentForm").reset();
    selectedAppointmentIndex = null;
}

function rejectAppointment(index){
    const item = appointments[index];

    if(confirm("Reject this appointment request?")){
        item.status = "Rejected";
        item.approvedDate = "";
        item.approvedDay = "";
        item.approvedTime = "";

        saveAppointments();

        logActivity(
            "Edit",
            "Doctor Appointments",
            `Appointment request for ${item.doctorName} rejected`
        );

        renderAppointments();
    }
}

const approveAppointmentForm =
    document.getElementById("approveAppointmentForm");

if(approveAppointmentForm){
    approveAppointmentForm.addEventListener("submit", function(event){
        event.preventDefault();

        if(selectedAppointmentIndex === null){
            return;
        }

        const item = appointments[selectedAppointmentIndex];

        item.status = "Approved";
        item.approvedDate = document.getElementById("approvedDate").value;
        item.approvedDay = document.getElementById("approvedDay").value;
        item.approvedTime = document.getElementById("approvedTime").value;

        saveAppointments();

        logActivity(
            "Edit",
            "Doctor Appointments",
            `Appointment request for ${item.doctorName} approved`
        );

        closeApproveAppointmentModal();
        renderAppointments();
    });
}

window.addEventListener("click", function(event){
    const modal = document.getElementById("approveAppointmentModal");

    if(event.target === modal){
        closeApproveAppointmentModal();
    }
});

renderAppointments();