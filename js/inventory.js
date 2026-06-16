let inventoryItems = JSON.parse(localStorage.getItem("axisInventory")) || [];
let editInventoryIndex = null;

const defaultItems = [
    { name:"Zirconia Blocks", category:"Dental Materials", quantity:20, minimum:5, price:18 },
    { name:"E-max Ingots", category:"Dental Materials", quantity:12, minimum:4, price:22 },
    { name:"Resin", category:"Dental Materials", quantity:6, minimum:3, price:12 },
    { name:"Stains", category:"Dental Materials", quantity:4, minimum:2, price:10 },
    { name:"Gloves", category:"Safety", quantity:50, minimum:20, price:1 },
    { name:"Masks", category:"Safety", quantity:40, minimum:15, price:1 },
    { name:"Burs", category:"Tools", quantity:30, minimum:10, price:2 },
    { name:"Medical Alcohol", category:"Liquids", quantity:10, minimum:4, price:3 }
];

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

if(inventoryItems.length === 0){
    inventoryItems = defaultItems.map(function(item){
        return {
            id: Date.now() + Math.random(),
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            minimum: item.minimum,
            price: item.price,
            notes: "",
            lastUpdated: new Date().toLocaleDateString()
        };
    });

    saveInventory();
}

function openInventoryModal(){
    const modal = document.getElementById("inventoryModal");
    if(modal){
        modal.style.display = "flex";
    }
}

function closeInventoryModal(){
    const modal = document.getElementById("inventoryModal");
    const form = document.getElementById("inventoryForm");

    if(modal){
        modal.style.display = "none";
    }

    if(form){
        form.reset();
    }

    editInventoryIndex = null;
}

function saveInventory(){
    localStorage.setItem("axisInventory", JSON.stringify(inventoryItems));
}

function getStockStatus(item){
    if(Number(item.quantity) <= 0){
        return "Out Of Stock";
    }

    if(Number(item.quantity) <= Number(item.minimum)){
        return "Low Stock";
    }

    return "In Stock";
}

function getStockClass(status){
    if(status === "In Stock"){
        return "completed";
    }

    if(status === "Low Stock"){
        return "progress";
    }

    if(status === "Out Of Stock"){
        return "new";
    }

    return "new";
}

function setInventoryText(id, value){
    const element = document.getElementById(id);

    if(element){
        element.textContent = value;
    }
}

function renderInventory(){
    const tableBody = document.getElementById("inventoryTableBody");

    if(!tableBody){
        console.error("inventoryTableBody not found");
        return;
    }

    tableBody.innerHTML = "";

    let totalValue = 0;
    let totalQuantity = 0;
    let lowStockCount = 0;
    let outStockCount = 0;

    inventoryItems.forEach(function(item, index){
        const status = getStockStatus(item);
        const statusClass = getStockClass(status);
        const itemValue = Number(item.quantity) * Number(item.price);

        totalValue += itemValue;
        totalQuantity += Number(item.quantity);

        if(status === "Low Stock"){
            lowStockCount++;
        }

        if(status === "Out Of Stock"){
            outStockCount++;
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="action-icons">
                <button onclick="deleteInventoryItem(${index})">🗑️</button>
                <button onclick="editInventoryItem(${index})">✏️</button>
            </td>
            <td><span class="status ${statusClass}">${status}</span></td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.minimum}</td>
            <td>${item.price} JD</td>
            <td>${itemValue.toFixed(2)} JD</td>
            <td>${item.lastUpdated}</td>
        `;

        tableBody.appendChild(row);
    });

    setInventoryText("totalItems", inventoryItems.length);
    setInventoryText("lowStockItems", lowStockCount);
    setInventoryText("outStockItems", outStockCount);
    setInventoryText("inventoryTotalQuantity", totalQuantity);
    setInventoryText("inventoryValue", totalValue.toFixed(2) + " JD");
    setInventoryText("inventoryTableTitle", "Total Items: " + inventoryItems.length);

    filterInventory();

    if(typeof applyLanguage === "function"){
        applyLanguage();
    }
}

function editInventoryItem(index){
    editInventoryIndex = index;
    const item = inventoryItems[index];

    document.getElementById("itemName").value = item.name;
    document.getElementById("itemCategory").value = item.category;
    document.getElementById("itemQuantity").value = item.quantity;
    document.getElementById("minimumStock").value = item.minimum;
    document.getElementById("unitPrice").value = item.price;
    document.getElementById("inventoryNotes").value = item.notes || "";

    openInventoryModal();
}

function deleteInventoryItem(index){
    const confirmDelete = confirm("Are you sure you want to delete this item?");

    if(confirmDelete){
        const deletedItem = inventoryItems[index];

        inventoryItems.splice(index, 1);
        saveInventory();

        logActivity(
            "Delete",
            "Inventory",
            `Inventory item ${deletedItem.name} deleted`
        );

        renderInventory();
    }
}

const inventoryForm = document.getElementById("inventoryForm");

if(inventoryForm){
    inventoryForm.addEventListener("submit", function(e){
        e.preventDefault();

        const itemData = {
            id: editInventoryIndex === null ? Date.now() : inventoryItems[editInventoryIndex].id,
            name: document.getElementById("itemName").value,
            category: document.getElementById("itemCategory").value,
            quantity: Number(document.getElementById("itemQuantity").value),
            minimum: Number(document.getElementById("minimumStock").value),
            price: Number(document.getElementById("unitPrice").value),
            notes: document.getElementById("inventoryNotes").value,
            lastUpdated: new Date().toLocaleDateString()
        };

        if(editInventoryIndex === null){
            inventoryItems.push(itemData);

            logActivity(
                "Add",
                "Inventory",
                `New inventory item ${itemData.name} added with quantity ${itemData.quantity}`
            );

        }else{
            const oldItem = inventoryItems[editInventoryIndex];

            inventoryItems[editInventoryIndex] = itemData;

            logActivity(
                "Edit",
                "Inventory",
                `Inventory item ${oldItem.name} updated`
            );

            if(Number(oldItem.quantity) !== Number(itemData.quantity)){
                logActivity(
                    "Edit",
                    "Inventory",
                    `Inventory quantity for ${itemData.name} changed from ${oldItem.quantity} to ${itemData.quantity}`
                );
            }

            editInventoryIndex = null;
        }

        saveInventory();
        renderInventory();
        closeInventoryModal();
    });
}

function filterInventory(){
    const searchInput = document.getElementById("inventorySearch");
    const stockFilter = document.getElementById("stockFilter");

    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedStatus = stockFilter ? stockFilter.value : "All";

    const rows = document.querySelectorAll("#inventoryTableBody tr");

    rows.forEach(function(row){
        const rowText = row.innerText.toLowerCase();
        const statusElement = row.querySelector(".status");
        const statusText = statusElement ? statusElement.textContent : "";

        const matchSearch = rowText.includes(searchValue);
        const matchStatus = selectedStatus === "All" || statusText === selectedStatus;

        row.style.display = matchSearch && matchStatus ? "" : "none";
    });
}

function printInventory(){
    logActivity(
        "Print",
        "Inventory",
        "Inventory list printed"
    );

    window.print();
}

function exportInventory(){
    logActivity(
        "Export",
        "Inventory",
        "Inventory list export requested"
    );

    alert("Export feature will be connected later.");
}

const inventoryModal = document.getElementById("inventoryModal");

window.addEventListener("click", function(event){
    if(event.target === inventoryModal){
        closeInventoryModal();
    }
});

renderInventory();