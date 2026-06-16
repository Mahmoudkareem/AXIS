let doctorLang = localStorage.getItem("axisDoctorLang") || "en";

function setDoctorText(id, text){
    const element = document.getElementById(id);

    if(element){
        element.textContent = text;
    }
}

function toggleDoctorLanguage(){
    doctorLang = doctorLang === "en" ? "ar" : "en";
    localStorage.setItem("axisDoctorLang", doctorLang);
    applyDoctorLanguage();
}

function applyDoctorLanguage(){
    const isAr = doctorLang === "ar";

    setDoctorText("doctorLangBtn", isAr ? "English" : "العربية");
    setDoctorText("doctorPortalText", isAr ? "بوابة الطبيب" : "Doctor Portal");
    setDoctorText("doctorSideTitle", isAr ? "الطبيب" : "DOCTOR");

    setDoctorText("doctorMenuDashboard", isAr ? "لوحة التحكم" : "Dashboard");
    setDoctorText("doctorMenuOrders", isAr ? "إدارة الطلبات" : "Order Management");
    setDoctorText("doctorMenuFinancial", isAr ? "المالية" : "Financial");
    setDoctorText("doctorMenuAppointment", isAr ? "حجز موعد" : "Appointment");
    setDoctorText("doctorLogoutBtn", isAr ? "تسجيل الخروج" : "Logout");

    setDoctorText("doctorDashboardTitle", isAr ? "لوحة تحكم الطبيب" : "Doctor Dashboard");
    setDoctorText("doctorDashboardDesc", isAr ? "نظرة عامة على طلباتك والمالية والمواعيد" : "Overview of your orders, finances and appointments");

    setDoctorText("doctorCardTotalTitle", isAr ? "إجمالي الطلبات" : "Total Orders");
    setDoctorText("doctorCardTotalDesc", isAr ? "جميع الحالات الخاصة بك" : "Your total cases");
    setDoctorText("doctorCardProgressTitle", isAr ? "قيد العمل" : "In Progress");
    setDoctorText("doctorCardProgressDesc", isAr ? "حالات قيد العمل" : "Cases in progress");
    setDoctorText("doctorCardReadyTitle", isAr ? "الطلبات الجاهزة" : "Ready Orders");
    setDoctorText("doctorCardReadyDesc", isAr ? "جاهزة للتسليم" : "Ready for delivery");
    setDoctorText("doctorCardDeliveryTitle", isAr ? "قيد التوصيل" : "Out For Delivery");
    setDoctorText("doctorCardDeliveryDesc", isAr ? "حالات قيد التوصيل" : "Cases under delivery");
    setDoctorText("doctorCardOverdueTitle", isAr ? "متأخرة" : "Overdue");
    setDoctorText("doctorCardOverdueDesc", isAr ? "حالات متأخرة" : "Late cases");

    setDoctorText("doctorFinancialSummaryTitle", isAr ? "الملخص المالي" : "Financial Summary");
    setDoctorText("doctorTotalDueText", isAr ? "إجمالي المستحقات" : "Total Due");
    setDoctorText("doctorTotalPaidText", isAr ? "إجمالي المدفوع" : "Total Paid");
    setDoctorText("doctorRemainingText", isAr ? "المتبقي" : "Remaining");

    setDoctorText("doctorReadyOrdersTitle", isAr ? "الطلبات الجاهزة" : "Ready Orders");
    setDoctorText("doctorAppointmentStatusTitle", isAr ? "حالة الموعد" : "Appointment Status");

    setDoctorText("doctorOrdersTitle", isAr ? "طلباتي: 0" : "My Orders: 0");
    setDoctorText("thStatus", isAr ? "الحالة" : "Status");
    setDoctorText("thOrderId", isAr ? "رقم الطلب" : "Order ID");
    setDoctorText("thPatient", isAr ? "المريض" : "Patient");
    setDoctorText("thWorkType", isAr ? "نوع العمل" : "Work Type");
    setDoctorText("thOrderDate", isAr ? "تاريخ الطلب" : "Order Date");
    setDoctorText("thDeliveryDate", isAr ? "تاريخ التسليم" : "Delivery Date");
    setDoctorText("thPriority", isAr ? "الأولوية" : "Priority");
    setDoctorText("thPrice", isAr ? "السعر" : "Price");

    setDoctorText("financialDetailsTitle", isAr ? "التفاصيل المالية" : "Financial Details");
    setDoctorText("fThOrderId", isAr ? "رقم الطلب" : "Order ID");
    setDoctorText("fThPatient", isAr ? "المريض" : "Patient");
    setDoctorText("fThWorkType", isAr ? "نوع العمل" : "Work Type");
    setDoctorText("fThPrice", isAr ? "السعر" : "Price");
    setDoctorText("fThPaid", isAr ? "المدفوع" : "Paid");
    setDoctorText("fThRemaining", isAr ? "المتبقي" : "Remaining");

    if(document.getElementById("doctorOrderPageTitle")){
        setDoctorText("doctorOrderPageTitle", isAr ? "إدارة طلبات الطبيب" : "Order Management");
        setDoctorText("doctorOrderPageDesc", isAr ? "إضافة وتعديل وإدارة طلباتك الخاصة" : "Add, edit and manage your own orders");
        setDoctorText("doctorNewOrderBtn", isAr ? "+ طلب جديد" : "+ New Order");

        setDoctorText("omThActions", isAr ? "الإجراءات" : "Actions");
        setDoctorText("omThStatus", isAr ? "الحالة" : "Status");
        setDoctorText("omThOrderId", isAr ? "رقم الطلب" : "Order ID");
        setDoctorText("omThPatient", isAr ? "المريض" : "Patient");
        setDoctorText("omThWorkType", isAr ? "نوع العمل" : "Work Type");
        setDoctorText("omThOrderDate", isAr ? "تاريخ الطلب" : "Order Date");
        setDoctorText("omThDeliveryDate", isAr ? "تاريخ التسليم" : "Delivery Date");
        setDoctorText("omThPriority", isAr ? "الأولوية" : "Priority");
        setDoctorText("omThPrice", isAr ? "السعر" : "Price");

        setDoctorText("doctorPatientLabel", isAr ? "اسم المريض" : "Patient Name");
        setDoctorText("doctorWorkTypeLabel", isAr ? "نوع العمل" : "Type Of Work");
        setDoctorText("doctorDeliveryLabel", isAr ? "تاريخ التسليم" : "Delivery Date");
        setDoctorText("doctorPriorityLabel", isAr ? "الأولوية" : "Priority");
        setDoctorText("doctorCasePriceLabel", isAr ? "سعر الحالة" : "Case Price");
        setDoctorText("doctorPaidAmountLabel", isAr ? "المبلغ المدفوع" : "Paid Amount");
        setDoctorText("doctorNotesLabel", isAr ? "ملاحظات" : "Notes");

        setDoctorText("doctorOrderModalTitle", isAr ? "إضافة طلب جديد" : "Add New Order");
        setDoctorText("doctorCancelBtn", isAr ? "إلغاء" : "Cancel");
        setDoctorText("doctorSaveOrderBtn", isAr ? "حفظ الطلب" : "Save Order");
    }

    if(document.getElementById("doctorFinancialPageTitle")){
        setDoctorText("doctorFinancialPageTitle", isAr ? "المالية" : "Financial");
        setDoctorText("doctorFinancialPageDesc", isAr ? "عرض تفاصيل الحساب وأسعار الحالات" : "View your account details and case prices");
        setDoctorText("doctorPortalText", isAr ? "قسم المالية" : "Financial Section");

        setDoctorText("financialTotalDueTitle", isAr ? "إجمالي المستحقات" : "Total Due");
        setDoctorText("financialTotalPaidTitle", isAr ? "إجمالي المدفوع" : "Total Paid");
        setDoctorText("financialRemainingTitle", isAr ? "المتبقي" : "Remaining");

        setDoctorText("financialThOrderId", isAr ? "رقم الطلب" : "Order ID");
        setDoctorText("financialThPatient", isAr ? "المريض" : "Patient");
        setDoctorText("financialThWorkType", isAr ? "نوع العمل" : "Work Type");
        setDoctorText("financialThPrice", isAr ? "السعر" : "Price");
        setDoctorText("financialThPaid", isAr ? "المدفوع" : "Paid");
        setDoctorText("financialThRemaining", isAr ? "المتبقي" : "Remaining");
    }

    if(document.getElementById("doctorAppointmentPageTitle")){
        setDoctorText("doctorAppointmentPageTitle", isAr ? "حجز موعد" : "Appointment Request");
        setDoctorText("doctorAppointmentPageDesc", isAr ? "طلب موعد مع فني المختبر" : "Request an appointment with a lab technician");

        setDoctorText("appointmentStatusTitle", isAr ? "حالة الموعد" : "Appointment Status");
        setDoctorText("appointmentInstructionsTitle", isAr ? "تعليمات الموعد" : "Appointment Instructions");

        setDoctorText("appointmentInstructionOne", isAr ? "اختر التاريخ والوقت المطلوب." : "Choose the requested date and time.");
        setDoctorText("appointmentInstructionTwo", isAr ? "اكتب سبب الموعد بشكل واضح." : "Write the reason for the appointment clearly.");
        setDoctorText("appointmentInstructionThree", isAr ? "سيقوم المختبر بمراجعة طلبك." : "The laboratory will review your request.");

        setDoctorText("requestNewAppointmentTitle", isAr ? "طلب موعد جديد" : "Request New Appointment");
        setDoctorText("appointmentDateLabel", isAr ? "التاريخ المطلوب" : "Requested Date");
        setDoctorText("appointmentTimeLabel", isAr ? "الوقت المطلوب" : "Requested Time");
        setDoctorText("appointmentReasonLabel", isAr ? "سبب الموعد" : "Reason");
        setDoctorText("sendAppointmentBtn", isAr ? "إرسال طلب الموعد" : "Send Appointment Request");

        setDoctorText("appThStatus", isAr ? "الحالة" : "Status");
        setDoctorText("appThRequestedDate", isAr ? "التاريخ المطلوب" : "Requested Date");
        setDoctorText("appThRequestedTime", isAr ? "الوقت المطلوب" : "Requested Time");
        setDoctorText("appThReason", isAr ? "السبب" : "Reason");
        setDoctorText("appThManagerResponse", isAr ? "رد المدير" : "Manager Response");
    }
}

applyDoctorLanguage();