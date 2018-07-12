function getStudentInfo(){
    var appUrl = "URL";
    var loggedInUser
    chrome.extension.sendMessage({}, function(response) {
        loggedInUser = response.email
    });
    var studentInfo;
    $.post(appUrl, loggedInUser, function(data) {
        localStorage.setItem("studentInfo", data);
    });
    return studentInfo;
}


function renderInfo(){
    var studentInfo = localStorage.getItem("studentId");
    if(studentInfo == null){
        var studentInfo = getStudentInfo();
    }
    var studentInfo = JSON.parse(studentInfo);
    var name = studentInfo["name"].split(" ")[0];
    var nameElement = document.getElementById("name");
    var powerSchoolElement = document.getElementById("powerschool");
    var scheduleElement = document.getElementById("schedule");
    var announcementsElement = document.getElementById("accouncements");
    var d = new Date();
    var h = d.getHours();
    var formattedDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    if(h < 12){
        nameElement.innerHTML = "Good morning " + name;
    }
    else if(h < 17){
        nameElement.innerHTML = "Good afternoon " + name;
    }
    else{
        nameElement.innerHTML = "Good evening " + name;
    }
    if(studentInfo["email"].contains("students")){
        powerSchoolElement.setAttribute("href", "powerschool.spprep.org");
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
    var span = document.getElementById('time');
    span.textContent = h + ":" + m + ":" + s;
    }
setInterval(time, 1000);
renderInfo()