let currentDoctor = JSON.parse(localStorage.getItem("axisUser"));

if(!currentDoctor || currentDoctor.accountType !== "doctor"){
    window.location.href = "../index.html";
}

let doctorName = currentDoctor.doctorName || currentDoctor.name;

let appointmentRequests =
    JSON.parse(localStorage.getItem("axisDoctorAppointments")) || [];

/* Demo booked slots - Google Calendar will replace this later */
const demoBookedSlots = {
    "2026-06-20": ["10:00", "12:00", "13:00"],
    "2026-06-21": ["09:30", "11:00", "14:00"],
    "2026-06-22": ["10:30", "12:30", "15:00"]
};

const workingSlots = [
    "09:00","09:30","10:00","10:30",
    "11:00","11:30","12:00","12:30",
    "13:00","13:30","14:00","14:30","15:00"
];

function saveAppointments(){
    localStorage.setItem("axisDoctorAppointments", JSON.stringify(appointmentRequests));
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

function getBookedSlotsByDate(date){
    const demoSlots = demoBookedSlots[date] || [];

    const realBooked = appointmentRequests
        .filter(function(item){
            return item.requestedDate === date && item.status !== "Rejected";
        })
        .map(function(item){
            return item.requestedTime;
        });

    return [...new Set([...demoSlots, ...realBooked])];
}

function getStatusClass(status){
    if(status === "Pending") return "review";
    if(status === "Approved") return "completed";
    if(status === "Rejected") return "new";
    return "progress";
}

function renderAppointmentStats(){
    const doctorAppointments = getDoctorAppointments();

    const pending = doctorAppointments.filter(function(item){
        return item.status === "Pending";
    }).length;

    const approved = doctorAppointments.filter(function(item){
        return item.status === "Approved";
    }).length;

    const rejected = doctorAppointments.filter(function(item){
        return item.status === "Rejected";
    }).length;

    setText("statTotalAppointments", doctorAppointments.length);
    setText("statPendingAppointments", pending);
    setText("statApprovedAppointments", approved);
    setText("statRejectedAppointments", rejected);

    const countBadge = document.querySelector(".appointment-count");
    if(countBadge){
        countBadge.textContent = doctorAppointments.length;
    }
}

function renderTimeSlots(){
    const dateInput = document.getElementById("appointmentDate");
    const selectedTimeInput = document.getElementById("appointmentTime");
    const slotsBox = document.getElementById("timeSlots");
    const selectedSlotText = document.getElementById("selectedSlotText");

    if(!dateInput || !selectedTimeInput || !slotsBox || !selectedSlotText){
        return;
    }

    const selectedDate = dateInput.value;

    selectedTimeInput.value = "";
    slotsBox.innerHTML = "";

    if(!selectedDate){
        selectedSlotText.textContent = "Select a date first";
        return;
    }

    const bookedSlots = getBookedSlotsByDate(selectedDate);

    workingSlots.forEach(function(slot){
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = slot;

        if(bookedSlots.includes(slot)){
            button.className = "time-slot booked";
            button.disabled = true;
            button.title = "This time is not available";
        }else{
            button.className = "time-slot available";

            button.addEventListener("click", function(){
                document.querySelectorAll(".time-slot").forEach(function(btn){
                    btn.classList.remove("selected");
                });

                button.classList.add("selected");
                selectedTimeInput.value = slot;
                selectedSlotText.textContent = "Selected Time: " + slot;
            });
        }

        slotsBox.appendChild(button);
    });

    selectedSlotText.textContent = "Choose an available time";
}

function renderAppointmentStatus(){
    const box = document.getElementById("appointmentStatusBox");
    const doctorAppointments = getDoctorAppointments();

    if(!box){
        return;
    }

    const approvedAppointments = doctorAppointments.filter(function(item){
        return item.status === "Approved";
    });

    if(approvedAppointments.length > 0){
        const latestApproved = approvedAppointments[approvedAppointments.length - 1];

        box.innerHTML = `
            <div class="next-appointment-card">
                <strong>📅 Next Appointment</strong>
                <p>Date: ${latestApproved.approvedDate || latestApproved.requestedDate}</p>
                <p>Time: ${latestApproved.approvedTime || latestApproved.requestedTime}</p>
                <p>Type: ${latestApproved.appointmentType || "-"}</p>
                <span class="approved-label">Approved</span>
            </div>
        `;
        return;
    }

    if(doctorAppointments.length === 0){
        box.innerHTML = `
            <div class="notification-item">
                No appointment request yet
            </div>
        `;
        return;
    }

    const latest = doctorAppointments[doctorAppointments.length - 1];

    if(latest.status === "Rejected"){
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
                Type: ${latest.appointmentType || "-"}<br>
                Date: ${latest.requestedDate}<br>
                Time: ${latest.requestedTime}
            </div>
        `;
    }
}

function renderAppointmentTable(){
    const tbody = document.getElementById("appointmentTableBody");
    const doctorAppointments = getDoctorAppointments();

    if(!tbody){
        return;
    }

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
                <td>${item.appointmentType || "-"}</td>
                <td>${item.reason}</td>
                <td>${response}</td>
            </tr>
        `;
    });

    setText("appointmentTableTitle", "My Appointment Requests: " + doctorAppointments.length);
}

function renderAppointments(){
    setText("doctorNameTop", doctorName);
    setText("doctorAlerts", getDoctorAppointments().length);

    renderAppointmentStats();
    renderAppointmentStatus();
    renderAppointmentTable();
    renderTimeSlots();
}

const appointmentDateInput = document.getElementById("appointmentDate");

if(appointmentDateInput){
    appointmentDateInput.addEventListener("change", renderTimeSlots);
}

const appointmentForm = document.getElementById("appointmentForm");

if(appointmentForm){
    appointmentForm.addEventListener("submit", function(event){
        event.preventDefault();

        const requestedDate = document.getElementById("appointmentDate").value;
        const requestedTime = document.getElementById("appointmentTime").value;
        const appointmentType = document.getElementById("appointmentType").value;
        const reason = document.getElementById("appointmentReason").value.trim();

        if(!requestedDate){
            alert("Please select appointment date");
            return;
        }

        if(!requestedTime){
            alert("Please select an available time");
            return;
        }

        if(!appointmentType){
            alert("Please select appointment type");
            return;
        }

        if(!reason){
            alert("Please write appointment reason");
            return;
        }

        const bookedSlots = getBookedSlotsByDate(requestedDate);

        if(bookedSlots.includes(requestedTime)){
            alert("This time is not available. Please choose another time.");
            renderTimeSlots();
            return;
        }

        const appointment = {
            id: Date.now(),
            doctorName: doctorName,
            appointmentType: appointmentType,
            requestedDate: requestedDate,
            requestedTime: requestedTime,
            reason: reason,
            status: "Pending",
            approvedDate: "",
            approvedDay: "",
            approvedTime: "",
            createdAt: new Date().toLocaleString()
        };

        appointmentRequests.push(appointment);
        saveAppointments();

        logDoctorActivity("Add", `Doctor ${doctorName} requested appointment`);

        appointmentForm.reset();
        renderAppointments();

        alert("Appointment request sent successfully");
    });
}

renderAppointments();