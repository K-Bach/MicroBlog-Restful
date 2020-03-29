function showList(address) {
    document.getElementById("risultato-raw").innerHTML = "";
    document.getElementById("risultato").innerHTML = "starting..";

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            visualJson(this.responseText);

        } else
            document.getElementById("risultato").innerHTML = "doing..";

    }
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
}

function visualJson(json) {
    document.getElementById("risultato-raw").innerHTML = json;
    var parsedJson = JSON.parse(json);
    var output = '<div> Codice di risposta http: ' + parsedJson.server;
    var table = '<table><tr><th>Id</th><th>User Name</th><th>Password</th></tr>';
    for (i = 0; i < parsedJson.response.length; i++) {
        table += "<tr><td>" +
                parsedJson.response[i].id + "</td><td>" +
                parsedJson.response[i].username + "</td><td>" +
                parsedJson.response[i].password + "</td></tr>";
    }
    table += "</table>";
    document.getElementById("risultato").innerHTML = output + table;
}