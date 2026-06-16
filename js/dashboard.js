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

function isArabic(){
    return localStorage.getItem("axisLang") === "ar";
}

function orderWord(count){
    return isArabic() ? "طلبات" : "orders";
}

function newOrderWord(count){
    return isArabic() ? "طلبات جديدة" : "new orders";
}

function updateDashboardNumbers(){
    setText("todayOrders", todayOrders);
    setText("todayOrdersText", `${todayOrders} ${newOrderWord(todayOrders)}`);

    setText("inProgressOrders", inProgressOrders);
    setText("inProgressOrdersText", `${inProgressOrders} ${orderWord(inProgressOrders)}`);

    setText("completedOrders", completedOrders);
    setText("completedOrdersText", `${completedOrders} ${orderWord(completedOrders)}`);

    setText("overdueOrders", overdueOrders);
    setText("overdueOrdersText", `${overdueOrders} ${orderWord(overdueOrders)}`);

    setText("totalOrdersChart", totalOrders);

    setText("newStatusText", `🔵 ${isArabic() ? "جديد" : "New"} - ${newOrders}`);
    setText("progressStatusText", `🟠 ${isArabic() ? "قيد العمل" : "In Progress"} - ${inProgressOrders}`);
    setText("reviewStatusText", `🟢 ${isArabic() ? "مراجعة" : "Review"} - ${reviewOrders}`);
    setText("readyStatusText", `🟣 ${isArabic() ? "جاهز" : "Ready"} - ${readyOrders}`);
    setText("deliveredStatusText", `🟢 ${isArabic() ? "تم التسليم" : "Delivered"} - ${deliveredOrders}`);
    setText("overdueStatusText", `🔴 ${isArabic() ? "متأخر" : "Overdue"} - ${overdueOrders}`);
}

updateDashboardNumbers();

window.addEventListener("storage", updateDashboardNumbers);