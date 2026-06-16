let currentDoctor = JSON.parse(localStorage.getItem("axisUser"));

if(!currentDoctor || currentDoctor.accountType !== "doctor"){
    window.location.href = "../index.html";
}

let doctorName = currentDoctor.doctorName || currentDoctor.name;

let appointmentRequests =
    JSON.parse(localStorage.getItem("axisDoctorAppointments")) || [];

function saveAppointments(){
    localStorage.setItem(
        "axisDoctorAppointments",
        JSON.stringify(appointmentRequests)
    );
}

function setText(id, value){
    const element = document.getElementById(id);

    if(element){
        element.textContent = value;
    }
}

function logDoctorActivity(actionType, description){
    if(typeof addActivityLog === "function"){
        addActivityLog(actionType, "Doctor Portal", description);
    }
}

function getDoctorAppointments(){
    return appointmentRequests.filter(function(item){
        return item.doctorName === doctorName;
    });
}

function getStatusClass(status){
    if(status === "Pending") return "review";
    if(status === "Approved") return "completed";
    if(status === "Rejected") return "new";
    return "progress";
}

function renderAppointmentStatus(){
    const box = document.getElementById("appointmentStatusBox");
    const doctorAppointments = getDoctorAppointments();

    if(doctorAppointments.length === 0){
        box.innerHTML = `
            <div class="notification-item">
                No appointment request yet
            </div>
        `;
        return;
    }

    const latest = doctorAppointments[doctorAppointments.length - 1];

    if(latest.status === "Approved"){
        box.innerHTML = `
            <div class="notification-item">
                ✅ تمت الموافقة على الموعد<br>
                التاريخ: ${latest.approvedDate || latest.requestedDate}<br>
                اليوم: ${latest.approvedDay || "-"}<br>
                الساعة: ${latest.approvedTime || latest.requestedTime}<br>
                سيتم زيارة الدكتور من قبل فني الأسنان في الموعد المحدد
            </div>
        `;
    }else if(latest.status === "Rejected"){
        box.innerHTML = `
            <div class="notification-item">
                ❌ لم تتم الموافقة على الموعد الحالي<br>
                سيتم ترتيب موعد آخر مناسب والتواصل معكم قريباً
            </div>
        `;
    }else{
        box.innerHTML = `
            <div class="notification-item">
                ⏳ Appointment request is pending review<br>
                Date: ${latest.requestedDate}<br>
                Time: ${latest.requestedTime}
            </div>
        `;
    }
}

function renderAppointmentTable(){
    const tbody = document.getElementById("appointmentTableBody");
    const doctorAppointments = getDoctorAppointments();

    tbody.innerHTML = "";

    doctorAppointments.forEach(function(item){
        const statusClass = getStatusClass(item.status);

        let response = "Waiting for manager response";

        if(item.status === "Approved"){
            response =
                "Approved - " +
                (item.approvedDate || item.requestedDate) +
                " / " +
                (item.approvedTime || item.requestedTime);
        }

        if(item.status === "Rejected"){
            response = "A new appointment will be arranged soon";
        }

        tbody.innerHTML += `
            <tr>
                <td><span class="status ${statusClass}">${item.status}</span></td>
                <td>${item.requestedDate}</td>
                <td>${item.requestedTime}</td>
                <td>${item.reason}</td>
                <td>${response}</td>
            </tr>
        `;
    });

    setText(
        "appointmentTableTitle",
        "My Appointment Requests: " + doctorAppointments.length
    );
}

function renderAppointments(){
    setText("doctorNameTop", doctorName);
    setText("doctorAlerts", getDoctorAppointments().length);

    renderAppointmentStatus();
    renderAppointmentTable();
}

const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", function(event){
    event.preventDefault();

    const appointment = {
        id: Date.now(),
        doctorName: doctorName,
        requestedDate: document.getElementById("appointmentDate").value,
        requestedTime: document.getElementById("appointmentTime").value,
        reason: document.getElementById("appointmentReason").value,
        status: "Pending",
        approvedDate: "",
        approvedDay: "",
        approvedTime: "",
        createdAt: new Date().toLocaleString()
    };

    appointmentRequests.push(appointment);
    saveAppointments();

    logDoctorActivity(
        "Add",
        `Doctor ${doctorName} requested appointment`
    );

    appointmentForm.reset();
    renderAppointments();

    alert("Appointment request sent successfully");
});

renderAppointments();