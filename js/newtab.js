// Copyright 2018 Grand Street Technologies. All Rights Reserved.
function setInfo(data){
    console.log("GOT DATA" + data);
    localStorage.setItem("studentInfo", data);
}


function setStudentInfo(){
    var appUrl = "https://script.google.com/macros/s/AKfycbxAS9LZunbUUhVYlQmGVk3UgIud9-YEJnvm6lYJNPALUcCJ4ME/exec";
    chrome.identity.getProfileUserInfo(function(info) { 
        email = info.email; 
        console.log("received " + email);
        console.log("submitting ajax")
        $.ajax({
            type: "POST",
            url: appUrl, 
            data: email, 
            success: setInfo});})
        
}


function completeRender(){
    var studentInfo = localStorage.getItem("studentInfo");
    console.log("FINALLY GOT" + studentInfo)
    studentInfo = JSON.parse(studentInfo);
    var name = studentInfo["name"];
    var nameElement = document.getElementById("name");
    var powerSchoolElement = document.getElementById("powerschool");
    var scheduleElement = document.getElementById("schedule");
    var announcementsElement = document.getElementById("announcements");
    var d = new Date();
    var h = d.getHours();
    var formattedDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
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


function time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var div = document.getElementById('time');
    div.textContent = h + ":" + m + ":" + s;
}


time()
renderInfo()
setInterval(time, 1000);