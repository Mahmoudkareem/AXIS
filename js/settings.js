const defaultSettings = {
    labName: "AXIS Dental Laboratory",
    labPhone: "",
    labAddress: "",
    labCurrency: "JOD",
    labLanguage: "en",
    workingHours: "",
    labLogo: "../assets/logo.png"
};

let settings = JSON.parse(localStorage.getItem("axisSettings")) || defaultSettings;

function loadSettings(){
    document.getElementById("labName").value = settings.labName || defaultSettings.labName;
    document.getElementById("labPhone").value = settings.labPhone || "";
    document.getElementById("labAddress").value = settings.labAddress || "";
    document.getElementById("labCurrency").value = settings.labCurrency || "JOD";
    document.getElementById("labLanguage").value = settings.labLanguage || "en";
    document.getElementById("workingHours").value = settings.workingHours || "";
    document.getElementById("logoPreview").src = settings.labLogo || "../assets/logo.png";
}

function saveSettings(){
    settings.labName = document.getElementById("labName").value.trim();
    settings.labPhone = document.getElementById("labPhone").value.trim();
    settings.labAddress = document.getElementById("labAddress").value.trim();
    settings.labCurrency = document.getElementById("labCurrency").value;
    settings.labLanguage = document.getElementById("labLanguage").value;
    settings.workingHours = document.getElementById("workingHours").value.trim();

    localStorage.setItem("axisSettings", JSON.stringify(settings));
    localStorage.setItem("axisLang", settings.labLanguage);

    alert("Settings saved successfully");
}

function resetSettings(){
    if(confirm("Reset settings to default?")){
        settings = defaultSettings;
        localStorage.setItem("axisSettings", JSON.stringify(settings));
        loadSettings();
    }
}

document.getElementById("labLogo").addEventListener("change", function(event){
    const file = event.target.files[0];

    if(!file){
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e){
        settings.labLogo = e.target.result;
        document.getElementById("logoPreview").src = e.target.result;
        localStorage.setItem("axisSettings", JSON.stringify(settings));
    };

    reader.readAsDataURL(file);
});

loadSettings();