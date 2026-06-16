let currentDoctor = JSON.parse(localStorage.getItem("axisUser"));

if(!currentDoctor || currentDoctor.accountType !== "doctor"){
    window.location.href = "../index.html";
}

let doctorName = currentDoctor.doctorName || currentDoctor.name;

let allOrders = JSON.parse(localStorage.getItem("axisOrders")) || [];
let appointmentRequests = JSON.parse(localStorage.getItem("axisDoctorAppointments")) || [];

let editDoctorOrderIndex = null;

function saveOrders(){
    localStorage.setItem("axisOrders", JSON.stringify(allOrders));
}

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

function getDoctorOrders(){
    return allOrders.filter(function(order){
        return order.doctorName === doctorName;
    });
}

function formatDate(dateValue){
    if(!dateValue){
        return "";
    }

    return new Date(dateValue).toLocaleDateString();
}

function getStatusClass(status){
    if(status === "New") return "new";
    if(status === "In Progress") return "progress";
    if(status === "Review") return "review";
    if(status === "Ready") return "completed";
    if(status === "Delivered") return "completed";
    if(status === "Out For Delivery") return "progress";
    return "new";
}

function openDoctorOrderModal(){
    document.getElementById("doctorOrderModal").style.display = "flex";
    document.getElementById("doctorOrderModalTitle").textContent = "Add New Order";
}

function closeDoctorOrderModal(){
    document.getElementById("doctorOrderModal").style.display = "none";
    document.getElementById("doctorOrderForm").reset();
    editDoctorOrderIndex = null;
}

function renderDoctorDashboard(){
    const doctorOrders = getDoctorOrders();

    const totalOrders = doctorOrders.length;
    const inProgress = doctorOrders.filter(order => order.status === "In Progress").length;
    const ready = doctorOrders.filter(order => order.status === "Ready").length;
    const delivery = doctorOrders.filter(order => order.status === "Out For Delivery").length;

    const overdue = doctorOrders.filter(function(order){
        if(!order.rawDeliveryDate){
            return false;
        }

        const deliveryDate = new Date(order.rawDeliveryDate);
        const today = new Date();

        return deliveryDate < today &&
               order.status !== "Ready" &&
               order.status !== "Delivered";
    }).length;

    let totalDue = 0;
    let totalPaid = 0;

    doctorOrders.forEach(function(order){
        totalDue += Number(order.casePrice || 0);
        totalPaid += Number(order.paidAmount || 0);
    });

    const remaining = totalDue - totalPaid;

    setText("doctorNameTop", doctorName);
    setText("doctorTotalOrders", totalOrders);
    setText("doctorInProgress", inProgress);
    setText("doctorReady", ready);
    setText("doctorDelivery", delivery);
    setText("doctorOverdue", overdue);
    setText("doctorAlerts", overdue + ready);

    setText("doctorTotalDue", totalDue.toFixed(2) + " JD");
    setText("doctorTotalPaid", totalPaid.toFixed(2) + " JD");
    setText("doctorRemaining", remaining.toFixed(2) + " JD");
    setText("doctorOrdersTitle", "My Orders: " + totalOrders);

    renderDoctorOrdersTable(doctorOrders);
    renderDoctorFinanceTable(doctorOrders);
    renderReadyOrders(doctorOrders);
    renderAppointmentStatus();
}

function renderDoctorOrdersTable(doctorOrders){
    const tbody = document.getElementById("doctorOrdersTableBody");
    tbody.innerHTML = "";

    doctorOrders.forEach(function(order){
        const globalIndex = allOrders.findIndex(item => item.id === order.id);
        const status = order.status || "New";
        const statusClass = getStatusClass(status);

        tbody.innerHTML += `
            <tr>
                <td class="action-icons">
                    <button onclick="editDoctorOrder(${globalIndex})">✏️</button>
                    <button onclick="deleteDoctorOrder(${globalIndex})">🗑️</button>
                </td>
                <td><span class="status ${statusClass}">${status}</span></td>
                <td>${order.id}</td>
                <td>${order.patientName}</td>
                <td>${order.workType}</td>
                <td>${order.orderDate}</td>
                <td>${order.deliveryDate}</td>
                <td>${order.priority || "Normal"}</td>
                <td>${Number(order.casePrice || 0).toFixed(2)} JD</td>
            </tr>
        `;
    });
}

function renderDoctorFinanceTable(doctorOrders){
    const tbody = document.getElementById("doctorFinanceTableBody");
    tbody.innerHTML = "";

    doctorOrders.forEach(function(order){
        const price = Number(order.casePrice || 0);
        const paid = Number(order.paidAmount || 0);
        const remaining = price - paid;

        tbody.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.patientName}</td>
                <td>${order.workType}</td>
                <td>${price.toFixed(2)} JD</td>
                <td>${paid.toFixed(2)} JD</td>
                <td>${remaining.toFixed(2)} JD</td>
            </tr>
        `;
    });
}

function renderReadyOrders(doctorOrders){
    const box = document.getElementById("doctorReadyList");
    const readyOrders = doctorOrders.filter(order => order.status === "Ready");

    box.innerHTML = "";

    if(readyOrders.length === 0){
        box.innerHTML = `<div class="notification-item">No ready orders</div>`;
        return;
    }

    readyOrders.forEach(function(order){
        box.innerHTML += `
            <div class="notification-item">
                ✅ ${order.id} - ${order.patientName} - ${order.workType}
            </div>
        `;
    });
}

function editDoctorOrder(globalIndex){
    editDoctorOrderIndex = globalIndex;

    const order = allOrders[globalIndex];

    document.getElementById("doctorOrderModalTitle").textContent = "Edit Order";
    document.getElementById("doctorPatientName").value = order.patientName;
    document.getElementById("doctorWorkType").value = order.workType;
    document.getElementById("doctorDeliveryDate").value = order.rawDeliveryDate || "";
    document.getElementById("doctorPriority").value = order.priority || "Normal";
    document.getElementById("doctorCasePrice").value = order.casePrice || 0;
    document.getElementById("doctorPaidAmount").value = order.paidAmount || 0;
    document.getElementById("doctorOrderNotes").value = order.notes || "";

    openDoctorOrderModal();
}

function deleteDoctorOrder(globalIndex){
    const order = allOrders[globalIndex];

    if(order.doctorName !== doctorName){
        alert("You cannot delete another doctor's order.");
        return;
    }

    if(confirm("Delete this order?")){
        allOrders.splice(globalIndex, 1);
        saveOrders();

        logDoctorActivity(
            "Delete",
            `Doctor ${doctorName} deleted order ${order.id}`
        );

        renderDoctorDashboard();
    }
}

const doctorOrderForm = document.getElementById("doctorOrderForm");

doctorOrderForm.addEventListener("submit", function(event){
    event.preventDefault();

    const deliveryDateInput = document.getElementById("doctorDeliveryDate").value;

    if(editDoctorOrderIndex === null){
        const newOrder = {
            id: "#" + (1001 + allOrders.length),
            patientName: document.getElementById("doctorPatientName").value,
            doctorName: doctorName,
            workType: document.getElementById("doctorWorkType").value,
            technicianName: "-",
            rawDeliveryDate: deliveryDateInput,
            deliveryDate: formatDate(deliveryDateInput),
            orderDate: new Date().toLocaleDateString(),
            priority: document.getElementById("doctorPriority").value,
            notes: document.getElementById("doctorOrderNotes").value,
            casePrice: Number(document.getElementById("doctorCasePrice").value),
            paidAmount: Number(document.getElementById("doctorPaidAmount").value),
            status: "New",
            progress: "0%",
            createdBy: "Doctor"
        };

        allOrders.push(newOrder);

        logDoctorActivity(
            "Add",
            `Doctor ${doctorName} added new order ${newOrder.id}`
        );

    }else{
        const order = allOrders[editDoctorOrderIndex];

        if(order.doctorName !== doctorName){
            alert("You cannot edit another doctor's order.");
            return;
        }

        order.patientName = document.getElementById("doctorPatientName").value;
        order.workType = document.getElementById("doctorWorkType").value;
        order.rawDeliveryDate = deliveryDateInput;
        order.deliveryDate = formatDate(deliveryDateInput);
        order.priority = document.getElementById("doctorPriority").value;
        order.notes = document.getElementById("doctorOrderNotes").value;
        order.casePrice = Number(document.getElementById("doctorCasePrice").value);
        order.paidAmount = Number(document.getElementById("doctorPaidAmount").value);

        logDoctorActivity(
            "Edit",
            `Doctor ${doctorName} updated order ${order.id}`
        );

        editDoctorOrderIndex = null;
    }

    saveOrders();
    closeDoctorOrderModal();
    renderDoctorDashboard();
});

function renderAppointmentStatus(){
    const box = document.getElementById("appointmentStatusBox");

    const doctorAppointments = appointmentRequests.filter(function(item){
        return item.doctorName === doctorName;
    });

    if(doctorAppointments.length === 0){
        box.innerHTML = `<div class="notification-item">No appointment request yet</div>`;
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
        approvedTime: ""
    };

    appointmentRequests.push(appointment);
    saveAppointments();

    logDoctorActivity(
        "Add",
        `Doctor ${doctorName} requested appointment`
    );

    appointmentForm.reset();
    renderAppointmentStatus();

    alert("Appointment request sent successfully");
});

window.addEventListener("click", function(event){
    const modal = document.getElementById("doctorOrderModal");

    if(event.target === modal){
        closeDoctorOrderModal();
    }
});

renderDoctorDashboard();