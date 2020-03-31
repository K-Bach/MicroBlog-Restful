
function login() {
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
        if (this.readyState === 4) {

            visualJson(this.responseText);

        }

    };
    var username = document.formLogin.loginUsername.value;
    var password = document.formLogin.loginPassword.value;
    var address = "http://localhost:8080/users?username=" + username + "&password=" + password;
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
}

function visualJson(json) {

    document.getElementById("risultato-raw").innerHTML = json;
    var parsedJson = JSON.parse(json);
    var codice = 'Codice di risposta http: ' + parsedJson.server + '<br>';
    var output = 'esito: ' + parsedJson.response;
    document.getElementById("risultato").innerHTML = codice + output;
    switch (parsedJson.server) {
        case 302:

            document.getElementById("status").innerHTML = "<div class=\"alert alert-success\" role=\"alert\">"
                    + "User found"
                    + "</div>";

            if (document.formLogin.loginUsername.value === "admin")
                setCookie("enablePost", "true", 1);
            else
                setCookie("enablePost", "false", 1);

            setCookie("username", document.formLogin.loginUsername.value, 1);
            location.assign("blog.html");

            break;
        default:
            document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                    + "Error, try again..."
                    + "</div>";
    }
}

function checkPostPermission()
{
    var permission = getCookie("enablePost");
    var username = getCookie("username");
    document.getElementById("userwelcome").innerHTML = username;
    if (permission === "true")
    {
        document.getElementById("formPost").innerHTML = '<form class="col-md-3">'
                + '<div class="form-group">'
                + '<label for="title">Title</label>'
                + '<input type="text" class="form-control" id="title" placeholder="">'
                + '</div>'
                + '<div class="form-group ">'
                + '<label for="postText">What do you want to write?</label>'
                + '<textarea class="form-control" id="postText" rows="3"></textarea>'
                + '<input type="button" value="Login" onClick="login()">'
                + '</div>'
                + '</form>';
    }

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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
    var table = '<table class="table row justify-content-md-center"><tr><th>Id</th><th>Title</th><th>Author</th><th>Date & hour</th><th>Text</th></tr>';
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