// Copyright 2018 Grand Street Technologies. All Rights Reserved.
function getStudentInfo(){
    var appUrl = "https://script.google.com/macros/s/AKfycbxAS9LZunbUUhVYlQmGVk3UgIud9-YEJnvm6lYJNPALUcCJ4ME/exec";
    var loggedInUser
    chrome.extension.sendMessage({}, function(response) {
        loggedInUser = response.email
    });
    console.log(loggedInUser)
    var studentInfo;
    $.post(appUrl, loggedInUser, function(data) {
        localStorage.setItem("studentInfo", data);
    });
    return studentInfo;
}


function renderInfo(){
    var studentInfo = localStorage.getItem("studentInfo");
    if(studentInfo == null){
        var studentInfo = getStudentInfo();
    }
    var studentInfo = JSON.parse(studentInfo);
    var name = studentInfo["name"];
    var nameElement = document.getElementById("name");
    var powerSchoolElement = document.getElementById("powerschool");
    var scheduleElement = document.getElementById("schedule");
    var announcementsElement = document.getElementById("accouncements");
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
    if(studentInfo["email"].contains("students")){
        powerSchoolElement.setAttribute("href", "https://powerschool.spprep.org");
    }
    else{
        powerSchoolElement.setAttribute("href", "https://spprep.powerschool.com/teachers/pw.html");
    }
    scheduleElement.setAttribute("href", "http://intranet.spprep.org/images/pdf/Student_Schedules/Current_Student_Schedules/" + studentInfo["id"] + ".pdf");
    announcementsElement.setAttribute("href", "http://intranet.spprep.org/calendar/announcements/" + formattedDate + ".html");
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
setInterval(time, 1000);
renderInfo()