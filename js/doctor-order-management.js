let currentDoctor = JSON.parse(localStorage.getItem("axisUser"));

if(!currentDoctor || currentDoctor.accountType !== "doctor"){
    window.location.href = "../index.html";
}

let doctorName = currentDoctor.doctorName || currentDoctor.name;
let allOrders = JSON.parse(localStorage.getItem("axisOrders")) || [];
let editDoctorOrderIndex = null;

function saveOrders(){
    localStorage.setItem("axisOrders", JSON.stringify(allOrders));
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

function renderDoctorOrders(){
    const doctorOrders = getDoctorOrders();
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

    setText("doctorNameTop", doctorName);
    setText("doctorOrdersTitle", "My Orders: " + doctorOrders.length);
    setText("doctorAlerts", doctorOrders.filter(order => order.status === "Ready").length);
}

function editDoctorOrder(globalIndex){
    editDoctorOrderIndex = globalIndex;

    const order = allOrders[globalIndex];

    if(order.doctorName !== doctorName){
        alert("You cannot edit another doctor's order.");
        return;
    }

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

        renderDoctorOrders();
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
    renderDoctorOrders();
});

window.addEventListener("click", function(event){
    const modal = document.getElementById("doctorOrderModal");

    if(event.target === modal){
        closeDoctorOrderModal();
    }
});

renderDoctorOrders();