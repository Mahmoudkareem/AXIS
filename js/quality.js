let qualityCases = JSON.parse(localStorage.getItem("axisQualityCases")) || [];
let editQualityIndex = null;

function saveQualityCases(){
    localStorage.setItem("axisQualityCases", JSON.stringify(qualityCases));
}

function openQualityModal(index = null){
    document.getElementById("qualityModal").style.display = "flex";

    if(index !== null){
        editQualityIndex = index;
        const item = qualityCases[index];

        document.getElementById("qualityModalTitle").textContent = "Edit Returned Case";
        document.getElementById("qualityPatient").value = item.patient;
        document.getElementById("qualityDoctor").value = item.doctor;
        document.getElementById("qualityTechnician").value = item.technician;
        document.getElementById("qualityWorkType").value = item.workType;
        document.getElementById("qualityReason").value = item.reason;
        document.getElementById("qualityReturnDate").value = item.returnDate;
        document.getElementById("qualityErrorRate").value = item.errorRate;
        document.getElementById("qualityStatus").value = item.status;
        document.getElementById("qualityNotes").value = item.notes;
    }else{
        editQualityIndex = null;
        document.getElementById("qualityModalTitle").textContent = "Add Returned Case";
        document.getElementById("qualityForm").reset();
    }
}

function closeQualityModal(){
    document.getElementById("qualityModal").style.display = "none";
    document.getElementById("qualityForm").reset();
    editQualityIndex = null;
}

document.getElementById("qualityForm").addEventListener("submit", function(event){
    event.preventDefault();

    const qualityItem = {
        patient: document.getElementById("qualityPatient").value.trim(),
        doctor: document.getElementById("qualityDoctor").value.trim(),
        technician: document.getElementById("qualityTechnician").value.trim(),
        workType: document.getElementById("qualityWorkType").value,
        reason: document.getElementById("qualityReason").value,
        returnDate: document.getElementById("qualityReturnDate").value,
        errorRate: Number(document.getElementById("qualityErrorRate").value),
        status: document.getElementById("qualityStatus").value,
        notes: document.getElementById("qualityNotes").value.trim()
    };

    if(editQualityIndex !== null){
        qualityCases[editQualityIndex] = qualityItem;
    }else{
        qualityCases.push(qualityItem);
    }

    saveQualityCases();
    closeQualityModal();
    renderQualityCases();
});

function deleteQualityCase(index){
    if(confirm("Delete this returned case?")){
        qualityCases.splice(index, 1);
        saveQualityCases();
        renderQualityCases();
    }
}

function getQualityStatusClass(status){
    if(status === "Open") return "progress";
    if(status === "In Review") return "review";
    if(status === "Resolved") return "completed";
    return "new";
}

function renderQualityCases(list = qualityCases){
    const tbody = document.getElementById("qualityTableBody");
    tbody.innerHTML = "";

    list.forEach(function(item, index){
        const statusClass = getQualityStatusClass(item.status);

        tbody.innerHTML += `
            <tr>
                <td class="action-icons">
                    <button onclick="openQualityModal(${index})">✏️</button>
                    <button onclick="deleteQualityCase(${index})">🗑️</button>
                </td>
                <td><span class="status ${statusClass}">${item.status}</span></td>
                <td>${item.patient}</td>
                <td>${item.doctor}</td>
                <td>${item.technician}</td>
                <td>${item.workType}</td>
                <td>${item.reason}</td>
                <td>${item.returnDate}</td>
                <td class="danger-text">${item.errorRate}%</td>
                <td>${item.notes || "-"}</td>
            </tr>
        `;
    });

    updateQualityStats();
}

function updateQualityStats(){
    const total = qualityCases.length;
    const open = qualityCases.filter(item => item.status === "Open").length;
    const resolved = qualityCases.filter(item => item.status === "Resolved").length;

    const avg = total > 0
        ? (qualityCases.reduce((sum, item) => sum + Number(item.errorRate || 0), 0) / total).toFixed(1)
        : 0;

    document.getElementById("totalReturnedCases").textContent = total;
    document.getElementById("openQualityCases").textContent = open;
    document.getElementById("resolvedQualityCases").textContent = resolved;
    document.getElementById("avgErrorRate").textContent = avg + "%";
    document.getElementById("qualityTableTitle").textContent = "Total Returned Cases: " + total;
}

function filterQuality(){
    const searchValue = document.getElementById("qualitySearch").value.toLowerCase();
    const statusValue = document.getElementById("qualityStatusFilter").value;

    const filtered = qualityCases.filter(function(item){
        const matchesSearch =
            item.patient.toLowerCase().includes(searchValue) ||
            item.doctor.toLowerCase().includes(searchValue) ||
            item.technician.toLowerCase().includes(searchValue) ||
            item.workType.toLowerCase().includes(searchValue) ||
            item.reason.toLowerCase().includes(searchValue);

        const matchesStatus =
            statusValue === "All" || item.status === statusValue;

        return matchesSearch && matchesStatus;
    });

    renderQualityCases(filtered);
}

renderQualityCases();