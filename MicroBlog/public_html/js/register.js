function register(address) {
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
            switch (this.status) {
                case 201:
                    var parsedJson = JSON.parse(this.responseText);
                    //var selfUrl = this.getResponseHeader("location");
                    var codice = 'Codice di risposta http: ' + parsedJson.server + '<br>';
                    var output = 'esito: ' + "utente registrato" + '<br>';
                    document.getElementById("status").innerHTML = "<div class=\"alert alert-success\" role=\"alert\">"
                            + "Registered successfully!"
                            + "</div>";
                    //var location = 'location: ' + selfUrl;
                    document.getElementById("risultato").innerHTML = codice + output;
                    break;
                case 404:
                    document.getElementById("risultato").innerHTML = "Errore 404 ";
                    break;
                default:
                    document.getElementById("risultato").innerHTML = "Non eseguito.";
            }

        }

    };
    var username = document.formRegister.registerUsername.value;
    var password = document.formRegister.registerPassword.value;
    xmlhttp.open("POST", address, true);
    var user = JSON.stringify({"username": username,
        "password": password
    });
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(user);
}