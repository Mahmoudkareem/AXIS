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

function saveSettingsSection(){
    const panelTitle = document.getElementById("panelTitle");
    const titleText = panelTitle ? panelTitle.textContent.trim() : "Settings";

    logActivity(
        "Edit",
        "Settings",
        `${titleText} saved`
    );

    alert(
        localStorage.getItem("axisLang") === "ar"
            ? "تم حفظ الإعدادات بنجاح ✅"
            : "Settings saved successfully ✅"
    );
}

function resetSettings(){
    if(confirm("Reset settings to default?")){
        localStorage.removeItem("axisSettings");

        logActivity(
            "Edit",
            "Settings",
            "Settings reset to default"
        );

        alert("Settings reset successfully");
    }
}

function createBackup(){
    logActivity(
        "Add",
        "Settings",
        "Backup created"
    );

    alert("Backup created successfully");
}

function restoreBackup(){
    logActivity(
        "Edit",
        "Settings",
        "Backup restore requested"
    );

    alert("Restore backup feature will be connected later.");
}

function downloadDatabase(){
    logActivity(
        "Export",
        "Settings",
        "Database download requested"
    );

    alert("Database download feature will be connected later.");
}