function showUsersList(address) {
    document.getElementById("risultato-raw").innerHTML = "";
    document.getElementById("risultato").innerHTML = "starting..";

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        
        document.getElementById("risultato").innerHTML = "doing..";
        if (this.readyState == 4 && this.status == 200) {
            
            visualUsersJson(this.responseText);

        }

    }
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
}

function visualUsersJson(json) {
    document.getElementById("risultato-raw").innerHTML = json;
    var parsedJson = JSON.parse(json);
    var output = '<div> Codice di risposta http: ' + parsedJson.server;
    var table = '<table class="table"><tr><th>Id</th><th>User Name</th><th>Password</th></tr>';
    for (i = 0; i < parsedJson.response.length; i++) {
        table += "<tr><td>" +
                parsedJson.response[i].id + "</td><td>" +
                parsedJson.response[i].username + "</td><td>" +
                parsedJson.response[i].password + "</td></tr>";
    }
    table += "</table>";
    document.getElementById("risultato").innerHTML = output + table;
}

function showPostsList(address) {
    document.getElementById("risultato-raw").innerHTML = "";
    document.getElementById("risultato").innerHTML = "starting..";

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        document.getElementById("risultato").innerHTML = "doing..";
        if (this.readyState == 4 && this.status == 200) {
            
            visualPostsJson(this.responseText);

        }
    }
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
}

function visualPostsJson(json) {
    document.getElementById("risultato-raw").innerHTML = json;
    var parsedJson = JSON.parse(json);
    var output = '<div> Codice di risposta http: ' + parsedJson.server;
    var table = '<table class="table"><tr><th>Id</th><th>Title</th><th>Author</th><th>Date & hour</th><th>Text</th></tr>';
    for (i = 0; i < parsedJson.response.length; i++) {
        table += "<tr><td>" +
                parsedJson.response[i].id + "</td><td>" +
                parsedJson.response[i].titolo + "</td><td>" +
                parsedJson.response[i].autore.username + "</td><td>" +
                parsedJson.response[i].dataOra + "</td><td>" +
                parsedJson.response[i].testo + "</td></tr>";
    }
    table += "</table>";
    document.getElementById("risultato").innerHTML = output + table;
}

function showCommentsList(address) {
    document.getElementById("risultato-raw").innerHTML = "";
    document.getElementById("risultato").innerHTML = "starting..";

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        
        document.getElementById("risultato").innerHTML = "doing..";
        if (this.readyState == 4 && this.status == 200) {
            
            visualCommentsJson(this.responseText);

        }

    }
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
}

function visualCommentsJson(json) {
    document.getElementById("risultato-raw").innerHTML = json;
    var parsedJson = JSON.parse(json);
    var output = '<div> Codice di risposta http: ' + parsedJson.server;
    var table = '<table class="table"><tr><th>Id</th><th>Date & hour</th><th>Author</th><th>Text</th><th>Post</th></tr>';
    for (i = 0; i < parsedJson.response.length; i++) {
        table += "<tr><td>" +
                parsedJson.response[i].id + "</td><td>" +
                parsedJson.response[i].dataOra + "</td><td>" +
                parsedJson.response[i].autore.username + "</td><td>" +
                parsedJson.response[i].testo + "</td><td>" +
                parsedJson.response[i].post.id + "</td></tr>";
    }
    table += "</table>";
    document.getElementById("risultato").innerHTML = output + table;
}