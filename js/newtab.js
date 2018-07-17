// Copyright 2018 Grand Street Technologies. All Rights Reserved.
function setInfo(data){
    localStorage.setItem("studentInfo", data);
}


function setStudentInfo(){
    var appUrl = "https://script.google.com/a/students.spprep.org/macros/s/AKfycbxNGcRrqrdfzV2x8s_7aI5dPlVBHLTt6KfmaVE64xFxgyt3LLv_/exec";
    chrome.identity.getProfileUserInfo(function(info) { 
        email = info.email; 
        $.ajax({
            type: "POST",
            url: appUrl, 
            data: email, 
            success: setInfo});})
        
}


function completeRender(){
    var studentInfo = localStorage.getItem("studentInfo");
    var nameElement = document.getElementById("name");
    studentInfo = JSON.parse(studentInfo);
    var name = studentInfo["name"];
    var nameElement = document.getElementById("name");
    var powerSchoolElement = document.getElementById("powerschool");
    var scheduleElement = document.getElementById("schedule");
    var announcementsElement = document.getElementById("announcements");
    var d = new Date();
    var h = d.getHours();
    if(h < 12){
        nameElement.innerHTML = "Good morning, " + name;
    }
    else if(h < 17){
        nameElement.innerHTML = "Good afternoon, " + name;
    }
    else{
        nameElement.innerHTML = "Good evening, " + name;
    }
    if(studentInfo["email"].includes("students")){
        powerSchoolElement.setAttribute("href", "http://powerschool.spprep.org");
    }
    else{
        powerSchoolElement.setAttribute("href", "https://spprep.powerschool.com/teachers/pw.html");
    }
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if(month < 10){
        month = "0" + month;
    }
    else if(day < 10){
        day = "0" + day;
    }
    var formattedDate = year + "-" + month + "-" + day;
    scheduleElement.setAttribute("href", "http://intranet.spprep.org/images/pdf/Student_Schedules/Current_Student_Schedules/" + studentInfo["id"] + ".pdf");
    announcementsElement.setAttribute("href", "http://intranet.spprep.org/calendar/announcements/" + formattedDate + ".html");
}


function renderInfo(){
    var studentInfo = localStorage.getItem("studentInfo");
    if(studentInfo == null){
        setStudentInfo();
        $(document).ajaxStop(function () {
            completeRender();
        });
    }
    else{
        completeRender();
    }
}


function refresh(){
    localStorage.removeItem("studentInfo");
    location.reload();
}


function handleRefresh(){
    document.getElementById("refresh").addEventListener("click", refresh);
}


function time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    if(s < 10){
        s = "0" + s;
    }
    if(m < 10){
        m = "0" + m;
    }
    if(h < 10){
        h = "0" + h;
    }
    if(h <= 12){
        s = s + " am";
    }
    else{
        h = h - 12;
        s = s + " pm";
    }
    var div = document.getElementById('time');
    div.textContent = h + ":" + m + ":" + s;
}


time();
renderInfo();
handleRefresh();
setInterval(time, 1000);