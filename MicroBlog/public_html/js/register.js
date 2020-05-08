function register(address) {


    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {


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

    let re = /[\s]/;
    var resUsername = re.test(username);
    var resPassword = re.test(password);

    if (username === "")
    {
        document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                + "Username field  must not be null"
                + "</div>";
    } else if (password === "")
    {
        document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                + "Password field  must not be null"
                + "</div>";
    } else if (resUsername)
    {
        document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                + "Username field  must not contain space characters"
                + "</div>";
    } else if (resPassword)
    {
        document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                + "Password field  must not contain space characters"
                + "</div>";
    } else
    {
        document.getElementById("risultato-raw").innerHTML = "";
        document.getElementById("risultato").innerHTML = "starting..";
        xmlhttp.open("POST", address, true);
        var user = JSON.stringify({"username": username,"password": password});
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(user);
        document.getElementById("risultato").innerHTML = "waiting response..";
    }
}