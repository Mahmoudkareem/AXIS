function openOrderModal() {
    document.getElementById("orderModal").style.display = "flex";
}

function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
    document.getElementById("orderForm").reset();
    editIndex = null;
}

window.onclick = function(event) {
    const modal = document.getElementById("orderModal");

    if (event.target === modal) {
        closeOrderModal();
    }
};

let orders = JSON.parse(localStorage.getItem("axisOrders")) || [];
let editIndex = null;

function saveOrders() {
    localStorage.setItem("axisOrders", JSON.stringify(orders));
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

function formatDate(dateValue) {
    if (!dateValue) return "";

    const date = new Date(dateValue);
    return date.toLocaleDateString();
}

function getProgressByStatus(status) {
    if (status === "New") return "0%";
    if (status === "In Progress") return "50%";
    if (status === "Review") return "75%";
    if (status === "Ready") return "100%";
    if (status === "Delivered") return "100%";
    return "0%";
}

function getStatusClass(status) {
    if (status === "New") return "new";
    if (status === "In Progress") return "progress";
    if (status === "Review") return "review";
    if (status === "Ready") return "completed";
    if (status === "Delivered") return "completed";
    return "new";
}

function updateTotalOrders() {
    const totalBox = document.querySelector(".table-title strong");

    if (totalBox) {
        totalBox.textContent = `Total Orders: ${orders.length}`;
    }
}

function renderOrders() {
    const tableBody = document.querySelector(".orders-table tbody");
    tableBody.innerHTML = "";

    orders.forEach(function(order, index) {
        const status = order.status || "New";
        const progress = getProgressByStatus(status);
        const statusClass = getStatusClass(status);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="action-icons">
                <button onclick="deleteOrder(${index})">🗑️</button>
                <button onclick="editOrder(${index})">✏️</button>
                <button onclick="printOrder(${index})">🖨️</button>
            </td>

            <td>
                <select class="status-select ${statusClass}" onchange="changeStatus(${index}, this.value)">
                    <option ${status === "New" ? "selected" : ""}>New</option>
                    <option ${status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option ${status === "Review" ? "selected" : ""}>Review</option>
                    <option ${status === "Ready" ? "selected" : ""}>Ready</option>
                    <option ${status === "Delivered" ? "selected" : ""}>Delivered</option>
                </select>
            </td>

            <td>${order.id}</td>
            <td>${order.patientName}</td>
            <td>${order.workType}</td>
            <td>${order.orderDate}</td>
            <td>${order.deliveryDate}</td>
            <td>${order.doctorName}</td>
            <td>${order.technicianName}</td>
            <td>${progress}</td>
        `;

        tableBody.prepend(row);
    });

    updateTotalOrders();
    setTimeout(filterOrders, 0);
}

function filterOrders() {
    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");
    const dateRangeFilter = document.getElementById("dateRangeFilter");

    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedStatus = statusFilter ? statusFilter.value : "All";
    const selectedDateRange = dateRangeFilter ? dateRangeFilter.value : "All";

    const rows = document.querySelectorAll(".orders-table tbody tr");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function parseAxisDate(value) {
        if (!value) return null;

        if (value.includes("/")) {
            const parts = value.split("/");
            return new Date(
                parseInt(parts[2], 10),
                parseInt(parts[1], 10) - 1,
                parseInt(parts[0], 10)
            );
        }

        if (value.includes("-")) {
            return new Date(value);
        }

        return null;
    }

    rows.forEach(function(row) {
        const rowText = row.innerText.toLowerCase();
        const statusSelect = row.querySelector(".status-select");
        const rowStatus = statusSelect ? statusSelect.value : "";

        const orderIdCell = row.children[2];
        const orderId = orderIdCell ? orderIdCell.textContent.trim() : "";

        const order = orders.find(function(item) {
            return item.id === orderId;
        });

        let matchDate = true;

        if (selectedDateRange !== "All") {
            const dateCell = row.children[5];
            const rowOrderDateText = dateCell ? dateCell.textContent.trim() : "";

            const orderDate = parseAxisDate(
                order && order.orderDate ? order.orderDate : rowOrderDateText
            );

            if (!orderDate || isNaN(orderDate.getTime())) {
                matchDate = false;
            } else {
                orderDate.setHours(0, 0, 0, 0);

                if (selectedDateRange === "Today") {
                    matchDate = orderDate.getTime() === today.getTime();
                }

                if (selectedDateRange === "This Week") {
                    const firstDayOfWeek = new Date(today);
                    firstDayOfWeek.setDate(today.getDate() - today.getDay());
                    firstDayOfWeek.setHours(0, 0, 0, 0);

                    const lastDayOfWeek = new Date(firstDayOfWeek);
                    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
                    lastDayOfWeek.setHours(23, 59, 59, 999);

                    matchDate = orderDate >= firstDayOfWeek && orderDate <= lastDayOfWeek;
                }

                if (selectedDateRange === "This Month") {
                    matchDate =
                        orderDate.getMonth() === today.getMonth() &&
                        orderDate.getFullYear() === today.getFullYear();
                }
            }
        }

        const matchSearch = rowText.includes(searchValue);
        const matchStatus = selectedStatus === "All" || rowStatus === selectedStatus;

        row.style.display = matchSearch && matchStatus && matchDate ? "" : "none";
    });
}

function changeStatus(index, newStatus) {
    const oldStatus = orders[index].status || "New";

    orders[index].status = newStatus;
    orders[index].progress = getProgressByStatus(newStatus);

    saveOrders();

    if(oldStatus !== newStatus){
        logActivity(
            "Edit",
            "Orders",
            `Order ${orders[index].id} status changed from ${oldStatus} to ${newStatus}`
        );
    }

    renderOrders();
}

function deleteOrder(index) {
    const confirmDelete = confirm("Are you sure you want to delete this order?");

    if (confirmDelete) {
        const deletedOrder = orders[index];

        orders.splice(index, 1);
        saveOrders();

        logActivity(
            "Delete",
            "Orders",
            `Order ${deletedOrder.id} for patient ${deletedOrder.patientName} deleted`
        );

        renderOrders();
    }
}

function editOrder(index) {
    editIndex = index;
    const order = orders[index];

    document.getElementById("patientName").value = order.patientName;
    document.getElementById("doctorName").value = order.doctorName;
    document.getElementById("workType").value = order.workType;
    document.getElementById("technicianName").value = order.technicianName;
    document.getElementById("deliveryDate").value = order.rawDeliveryDate || "";
    document.getElementById("priority").value = order.priority || "Normal";
    document.getElementById("orderNotes").value = order.notes || "";

    openOrderModal();
}

function printOrder(index) {
    const order = orders[index];

    logActivity(
        "Print",
        "Orders",
        `Order ${order.id} for patient ${order.patientName} printed`
    );

    const urgentChecked = order.priority === "Urgent" ? "✓" : "";
    const normalChecked = order.priority === "Normal" ? "✓" : "";
    const lowChecked = order.priority === "Low" ? "✓" : "";

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print ${order.id}</title>
            <style>
                *{box-sizing:border-box;font-family:Arial, sans-serif;}
                @page{size:A4;margin:0;}
                body{margin:0;background:white;}
                .print-page{width:794px;height:1123px;margin:0 auto;background:white;padding:38px 48px;position:relative;overflow:hidden;}
                .corner{position:absolute;right:-125px;top:-125px;width:340px;height:340px;background:linear-gradient(135deg,#D62846,#B83280,#8E2DE2);border-radius:50%;opacity:.95;}
                .bottom-left{position:absolute;left:-145px;bottom:-145px;width:310px;height:310px;background:linear-gradient(135deg,#D62846,#8E2DE2);border-radius:50%;opacity:.95;}
                .print-logo{width:220px;margin-bottom:25px;}
                .order-id{position:absolute;right:48px;top:145px;border:2px solid #c53193;border-radius:22px;padding:10px 24px;font-weight:800;color:#c53193;font-size:14px;}
                .field{display:grid;grid-template-columns:145px 1fr;align-items:center;margin:15px 0;gap:18px;}
                .field label{font-weight:900;letter-spacing:1px;color:#222;font-size:13px;}
                .line{border-bottom:2px solid #ddd;min-height:24px;font-size:15px;padding-bottom:4px;}
                .priority-box{border:2px solid #d44ca4;border-radius:14px;padding:16px;margin-top:18px;}
                .priority-title{color:#d62871;font-weight:900;letter-spacing:2px;margin-bottom:14px;font-size:13px;}
                .priority-options{display:flex;justify-content:space-between;}
                .check{display:flex;align-items:center;gap:8px;font-weight:800;color:#8E2DE2;font-size:13px;}
                .square{width:22px;height:22px;border:2px solid #d44ca4;display:inline-flex;align-items:center;justify-content:center;font-weight:900;}
                .notes-box{border:2px solid #d44ca4;border-radius:14px;padding:16px;margin-top:18px;min-height:130px;}
                .notes-title{color:#d62871;font-weight:900;letter-spacing:2px;margin-bottom:12px;font-size:13px;}
                .notes-content{line-height:1.6;color:#333;white-space:pre-wrap;font-size:14px;}
                .signatures{display:flex;justify-content:space-around;margin-top:45px;text-align:center;color:#c53193;font-size:10px;letter-spacing:2px;font-weight:800;}
                .signature-line{width:210px;border-top:2px solid #ddd;padding-top:10px;}
                @media print{html,body{width:210mm;height:297mm;overflow:hidden;}.print-page{margin:0;width:210mm;height:297mm;}}
            </style>
        </head>
        <body>
            <div class="print-page">
                <div class="corner"></div>
                <div class="bottom-left"></div>
                <img class="print-logo" src="../assets/logo-print.png" alt="AXIS Logo">
                <div class="order-id">ORDER ID: ${order.id}</div>

                <div class="field"><label>PATIENT:</label><div class="line">${order.patientName || ""}</div></div>
                <div class="field"><label>DOCTOR:</label><div class="line">${order.doctorName || ""}</div></div>
                <div class="field"><label>TECHNICIAN:</label><div class="line">${order.technicianName || ""}</div></div>
                <div class="field"><label>WORK TYPE:</label><div class="line">${order.workType || ""}</div></div>
                <div class="field"><label>ORDER DATE:</label><div class="line">${order.orderDate || ""}</div></div>
                <div class="field"><label>DELIVERY DATE:</label><div class="line">${order.deliveryDate || ""}</div></div>

                <div class="priority-box">
                    <div class="priority-title">PRIORITY:</div>
                    <div class="priority-options">
                        <div class="check"><span class="square">${urgentChecked}</span>URGENT</div>
                        <div class="check"><span class="square">${normalChecked}</span>NORMAL</div>
                        <div class="check"><span class="square">${lowChecked}</span>LOW</div>
                    </div>
                </div>

                <div class="notes-box">
                    <div class="notes-title">NOTES:</div>
                    <div class="notes-content">${order.notes || ""}</div>
                </div>

                <div class="signatures">
                    <div class="signature-line">DOCTOR SIGNATURE</div>
                    <div class="signature-line">TECHNICIAN SIGNATURE</div>
                </div>
            </div>

            <script>
                window.onload = function(){
                    window.print();
                }
            <\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const deliveryDateInput = document.getElementById("deliveryDate").value;

    if (editIndex === null) {
        const newOrder = {
            id: "#" + (1001 + orders.length),
            patientName: document.getElementById("patientName").value,
            doctorName: document.getElementById("doctorName").value,
            workType: document.getElementById("workType").value,
            technicianName: document.getElementById("technicianName").value,
            rawDeliveryDate: deliveryDateInput,
            deliveryDate: formatDate(deliveryDateInput),
            orderDate: new Date().toLocaleDateString(),
            priority: document.getElementById("priority").value,
            notes: document.getElementById("orderNotes").value,
            status: "New",
            progress: "0%"
        };

        orders.push(newOrder);

        logActivity(
            "Add",
            "Orders",
            `New order ${newOrder.id} added for patient ${newOrder.patientName}`
        );

    } else {
        const orderId = orders[editIndex].id;
        const oldPatientName = orders[editIndex].patientName;

        orders[editIndex].patientName = document.getElementById("patientName").value;
        orders[editIndex].doctorName = document.getElementById("doctorName").value;
        orders[editIndex].workType = document.getElementById("workType").value;
        orders[editIndex].technicianName = document.getElementById("technicianName").value;
        orders[editIndex].rawDeliveryDate = deliveryDateInput;
        orders[editIndex].deliveryDate = formatDate(deliveryDateInput);
        orders[editIndex].priority = document.getElementById("priority").value;
        orders[editIndex].notes = document.getElementById("orderNotes").value;

        logActivity(
            "Edit",
            "Orders",
            `Order ${orderId} for patient ${oldPatientName} updated`
        );

        editIndex = null;
    }

    saveOrders();
    renderOrders();
    closeOrderModal();
});
const dateFilters = ["fromDate", "dateFrom", "startDate", "toDate", "dateTo", "endDate"];

dateFilters.forEach(function(id) {
    const input = document.getElementById(id);

    if (input) {
        input.addEventListener("change", filterOrders);
        input.addEventListener("input", filterOrders);
    }
});
function exportOrders() {
    if (!orders || orders.length === 0) {
        alert("No orders to export");
        return;
    }

    let csvContent = "Order ID,Patient Name,Doctor,Work Type,Technician,Order Date,Delivery Date,Priority,Status,Progress,Notes\n";

    orders.forEach(function(order) {
        const row = [
            order.id || "",
            order.patientName || "",
            order.doctorName || "",
            order.workType || "",
            order.technicianName || "",
            order.orderDate || "",
            order.deliveryDate || "",
            order.priority || "",
            order.status || "",
            order.progress || "",
            order.notes || ""
        ].map(function(value) {
            return `"${String(value).replace(/"/g, '""')}"`;
        }).join(",");

        csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "axis_orders_export.csv");
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    logActivity(
        "Export",
        "Orders",
        "Orders data exported as CSV file"
    );
}
renderOrders();