function openOrderModal() {
    document.getElementById("orderModal").style.display = "flex";
}

function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("orderModal");

    if (event.target === modal) {
        modal.style.display = "none";
    }
}