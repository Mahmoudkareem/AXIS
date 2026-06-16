let qualityCases = JSON.parse(localStorage.getItem("axisQualityCases")) || [];
let editQualityIndex = null;

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

const qualityForm = document.getElementById("qualityForm");

if(qualityForm){
    qualityForm.addEventListener("submit", function(event){
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
            const oldCase = qualityCases[editQualityIndex];

            qualityCases[editQualityIndex] = qualityItem;

            logActivity(
                "Edit",
                "Quality",
                `Returned case for patient ${oldCase.patient} updated`
            );

            if(oldCase.status !== qualityItem.status){
                logActivity(
                    "Edit",
                    "Quality",
                    `Returned case for patient ${qualityItem.patient} status changed from ${oldCase.status} to ${qualityItem.status}`
                );
            }

            editQualityIndex = null;

        }else{
            qualityCases.push(qualityItem);

            logActivity(
                "Add",
                "Quality",
                `New returned case added for patient ${qualityItem.patient}`
            );
        }

        saveQualityCases();
        closeQualityModal();
        renderQualityCases();
    });
}

function deleteQualityCase(index){
    if(confirm("Delete this returned case?")){
        const deletedCase = qualityCases[index];

        qualityCases.splice(index, 1);
        saveQualityCases();

        logActivity(
            "Delete",
            "Quality",
            `Returned case for patient ${deletedCase.patient} deleted`
        );

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

    if(!tbody){
        return;
    }

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

    if(typeof applyLanguage === "function"){
        applyLanguage();
    }
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
    const searchInput = document.getElementById("qualitySearch");
    const statusFilter = document.getElementById("qualityStatusFilter");

    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const statusValue = statusFilter ? statusFilter.value : "All";

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

function exportQuality(){
    logActivity(
        "Export",
        "Quality",
        "Quality cases export requested"
    );

    alert("Export quality feature will be connected later.");
}

const qualityModal = document.getElementById("qualityModal");

window.addEventListener("click", function(event){
    if(event.target === qualityModal){
        closeQualityModal();
    }
});

renderQualityCases();