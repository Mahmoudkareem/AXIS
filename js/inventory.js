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

if(inventoryItems.length === 0){
    inventoryItems = defaultItems.map(item => ({
        id: Date.now() + Math.random(),
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        minimum: item.minimum,
        price: item.price,
        notes: "",
        lastUpdated: new Date().toLocaleDateString()
    }));

    saveInventory();
}

function openInventoryModal(){
    document.getElementById("inventoryModal").style.display = "flex";
}

function closeInventoryModal(){
    document.getElementById("inventoryModal").style.display = "none";
    document.getElementById("inventoryForm").reset();
    editInventoryIndex = null;
}

function saveInventory(){
    localStorage.setItem("axisInventory", JSON.stringify(inventoryItems));
}

function getStockStatus(item){
    if(Number(item.quantity) <= 0) return "Out Of Stock";
    if(Number(item.quantity) <= Number(item.minimum)) return "Low Stock";
    return "In Stock";
}

function getStockClass(status){
    if(status === "In Stock") return "completed";
    if(status === "Low Stock") return "progress";
    if(status === "Out Of Stock") return "new";
    return "new";
}

function renderInventory(){
    const tableBody = document.getElementById("inventoryTableBody");

    if(!tableBody){
        console.error("inventoryTableBody not found");
        return;
    }

    tableBody.innerHTML = "";

    let totalValue = 0;
    let lowStockCount = 0;
    let outStockCount = 0;

    inventoryItems.forEach(function(item, index){
        const status = getStockStatus(item);
        const statusClass = getStockClass(status);
        const itemValue = Number(item.quantity) * Number(item.price);

        totalValue += itemValue;

        if(status === "Low Stock") lowStockCount++;
        if(status === "Out Of Stock") outStockCount++;

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

    setText("totalItems", inventoryItems.length);
    setText("lowStockItems", lowStockCount);
    setText("outStockItems", outStockCount);
    setText("inventoryValue", totalValue.toFixed(2) + " JD");
    setText("inventoryTableTitle", "Total Items: " + inventoryItems.length);

    filterInventory();
}

function setText(id, value){
    const element = document.getElementById(id);
    if(element) element.textContent = value;
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
    if(confirm("Are you sure you want to delete this item?")){
        inventoryItems.splice(index, 1);
        saveInventory();
        renderInventory();
    }
}

document.getElementById("inventoryForm").addEventListener("submit", function(e){
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
    }else{
        inventoryItems[editInventoryIndex] = itemData;
    }

    saveInventory();
    renderInventory();
    closeInventoryModal();
});

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
    window.print();
}

function exportInventory(){
    alert("Export feature will be connected later.");
}

const inventoryModal = document.getElementById("inventoryModal");

window.addEventListener("click", function(event){
    if(event.target === inventoryModal){
        closeInventoryModal();
    }
});

renderInventory();