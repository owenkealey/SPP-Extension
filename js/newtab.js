// Copyright 2018 Phantom Labs. All Rights Reserved.


function completeStudentRender(){
    var studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
    var name = studentInfo["name"];
    var powerSchoolElement = document.getElementById("powerschool");
    var nameElement = document.getElementById("name");
    var d = new Date();
    var h = d.getHours();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if(month < 10){
        month = "0" + month;
    }
    else if(day < 10){
        day = "0" + day;
    }
    if(h < 12){
        nameElement.innerHTML = "Good morning, " + name + "!";
    }
    else if(h < 17){
        nameElement.innerHTML = "Good afternoon, " + name+ "!";
    }
    else{
        nameElement.innerHTML = "Good evening, " + name+ "!";
    }
    powerSchoolElement.setAttribute("href", "http://powerschool.spprep.org");
}

function butrym(){
    location.href='https://spprep.org/2018/11/01/prep-remembers-mr-jan-butrym-01/';
}

function renderTeacherInfo(){
    var powerSchoolElement = document.getElementById("powerschool");
    var powerSubElement = document.getElementById("power_sub");
    var nameElement = document.getElementById("name");
    var d = new Date();
    var h = d.getHours();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if(month < 10){
        month = "0" + month;
    }
    else if(day < 10){
        day = "0" + day;
    }
    if(h < 12){
        nameElement.innerHTML = "Good morning!";
    }
    else if(h < 17){
        nameElement.innerHTML = "Good afternoon!";
    }
    else{
        nameElement.innerHTML = "Good evening!";
    }
    powerSubElement.setAttribute("href", "https://spprep.powerschool.com/subs/pw.html");
    powerSchoolElement.setAttribute("href", "https://spprep.powerschool.com/teachers/pw.html");
    powerSubElement.style = "display:visible;";
}


function setStudentInfo(email){
    var appUrl = "https://script.google.com/macros/s/AKfycbxAS9LZunbUUhVYlQmGVk3UgIud9-YEJnvm6lYJNPALUcCJ4ME/exec";
    $.ajax({
        type: "POST",
        url: appUrl, 
        data: email, 
        success: function(data){
            if(data == "ERROR"){
                var qualifiedData = {"email":email, "name":"", "id":"", "pdf":""}
                localStorage.setItem("studentInfo", qualifiedData)
            }
            else{
                localStorage.setItem("studentInfo", data);
            }
        }
    });
}


function renderStudentInfo(email){
    var studentInfo = localStorage.getItem("studentInfo");
    if(studentInfo == null){
        setStudentInfo(email);
        $(document).ajaxStop(function () {
            completeStudentRender();
        });
    }
    else{
        completeStudentRender();
    }
}



function renderInfo(){
    chrome.identity.getProfileUserInfo(function(info) { 
        email = info.email; 
        if(email.includes("students")){
            renderStudentInfo(email);
        }
        else{
            renderTeacherInfo();
        }
    });
    var today = new Date();
    if(today.getMonth() == 10 && today.getDay() == 31){
        document.getElementById("butrym").style.display = "auto";
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
    if(h < 12){
        s = s + " am";
    }
    else if(h == 12){
        s = s + " pm";
    }
    else if(h ==24){
        h = 12;
        s = s+ " am"
    }
    else{
        h = h - 12;
        s = s + " pm";
    }

    if(h == 00){
        h = 12;
    }
    var div = document.getElementById('time');
    div.textContent = h + ":" + m + ":" + s;
}


time();
setInterval(time, 1000);
renderInfo();
handleRefresh();