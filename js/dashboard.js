const orders = JSON.parse(localStorage.getItem("axisOrders")) || [];

const today = new Date().toLocaleDateString();

const totalOrders = orders.length;

const todayOrders = orders.filter(order => order.orderDate === today).length;

const newOrders = orders.filter(order => (order.status || "New") === "New").length;

const inProgressOrders = orders.filter(order => order.status === "In Progress").length;

const reviewOrders = orders.filter(order => order.status === "Review").length;

const readyOrders = orders.filter(order => order.status === "Ready").length;

const deliveredOrders = orders.filter(order => order.status === "Delivered").length;

const completedOrders = readyOrders + deliveredOrders;

const overdueOrders = orders.filter(order => {
    if (!order.rawDeliveryDate) return false;

    const deliveryDate = new Date(order.rawDeliveryDate);
    const currentDate = new Date();

    return deliveryDate < currentDate &&
           order.status !== "Ready" &&
           order.status !== "Delivered";
}).length;

function setText(id, value){
    const element = document.getElementById(id);

    if(element){
        element.textContent = value;
    }
}

setText("todayOrders", todayOrders);
setText("todayOrdersText", `${todayOrders} new orders`);

setText("inProgressOrders", inProgressOrders);
setText("inProgressOrdersText", `${inProgressOrders} orders`);

setText("completedOrders", completedOrders);
setText("completedOrdersText", `${completedOrders} orders`);

setText("overdueOrders", overdueOrders);
setText("overdueOrdersText", `${overdueOrders} orders`);

setText("totalOrdersChart", totalOrders);

setText("newStatusText", `🔵 New - ${newOrders}`);
setText("progressStatusText", `🟠 In Progress - ${inProgressOrders}`);
setText("reviewStatusText", `🟢 Review - ${reviewOrders}`);
setText("readyStatusText", `🟣 Ready - ${readyOrders}`);
setText("deliveredStatusText", `🟢 Delivered - ${deliveredOrders}`);
setText("overdueStatusText", `🔴 Overdue - ${overdueOrders}`);