let currentDoctor = JSON.parse(localStorage.getItem("axisUser"));

if(!currentDoctor || currentDoctor.accountType !== "doctor"){
    window.location.href = "../index.html";
}

let doctorName = currentDoctor.doctorName || currentDoctor.name;

const orders = JSON.parse(localStorage.getItem("axisOrders")) || [];

function setText(id,value){
    const element = document.getElementById(id);

    if(element){
        element.textContent = value;
    }
}

function renderFinancial(){

    const doctorOrders = orders.filter(function(order){
        return order.doctorName === doctorName;
    });

    const tbody = document.getElementById("financialTableBody");

    tbody.innerHTML = "";

    let totalDue = 0;
    let totalPaid = 0;

    doctorOrders.forEach(function(order){

        const price = Number(order.casePrice || 0);
        const paid = Number(order.paidAmount || 0);
        const remaining = price - paid;

        totalDue += price;
        totalPaid += paid;

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

    const totalRemaining = totalDue - totalPaid;

    setText("doctorNameTop", doctorName);

    setText("financialTotalDue", totalDue.toFixed(2) + " JD");
    setText("financialTotalPaid", totalPaid.toFixed(2) + " JD");
    setText("financialRemaining", totalRemaining.toFixed(2) + " JD");

    const savedLang = localStorage.getItem("axisDoctorLang") || "en";
    const isAr = savedLang === "ar";

    setText(
        "financialTableTitle",
        isAr
            ? "التفاصيل المالية (" + doctorOrders.length + " حالات)"
            : "Financial Details (" + doctorOrders.length + " Cases)"
    );
}

renderFinancial();