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
            location.assign("posts.html");
            break;
        default:
            document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">" 
                                                + "Error, try again..."
                                                + "</div>";
    }
}