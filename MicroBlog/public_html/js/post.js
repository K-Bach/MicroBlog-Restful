function createPost(address, form) {

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
                    var output = 'esito: ' + "post creato" + '<br>';
                    //var location = 'location: ' + selfUrl;
                    document.getElementById("risultato").innerHTML = codice + output;
                    getPost(parsedJson.response);
                    break;
                case 404:
                    document.getElementById("risultato").innerHTML = "Errore 404 ";
                    break;
                default:
                    document.getElementById("risultato").innerHTML = "Non creato.";
            }

        }

    };
    var title = form.title.value;
    var postText = form.postText.value;
    let re = /([^\s]+([\s][^\s]+)*)+/;
    var resTitle = re.test(title);
    var resPostText = re.test(postText);

    if (title === "")
    {
        document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                + "Title field  must not be null"
                + "</div>";
    } else if (postText === "")
    {
        document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                + "Text field  must not be null"
                + "</div>";
    } else if (!resTitle)
    {
        document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                + "Title field  must not contain only space characters"
                + "</div>";
    } else if (!resPostText)
    {
        document.getElementById("status").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"
                + "Text field  must not contain only space characters"
                + "</div>";
    } else
    {

        var autore = {"id": Number(getCookie("userId"))};
        var date = new Date();
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();
        var year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        var formatted_date = year + "-" + month + "-" + day;

        xmlhttp.open("POST", address, true);
        var post = JSON.stringify({"titolo": title, "autore": autore, "dataOra": formatted_date, "testo": postText});
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(post);
    }
}

function getPost(address) {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            showPost(this.responseText);

        }
    };
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
}

function getPostById(postId) {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4) {
            switch (this.status) {
                case 200:
                    showPostWithComments(this.responseText);
                    break;
            }
        }
    };
    xmlhttp.open("GET", "http://localhost:8080/posts/" + postId, true);
    xmlhttp.send();
}

function showPostWithComments(post) {

    var parsedPostJson = JSON.parse(post);

    var id = parsedPostJson.response.id;
    var title = parsedPostJson.response.titolo;
    var author = parsedPostJson.response.autore;
    var date = parsedPostJson.response.dataOra;
    var text = parsedPostJson.response.testo;

    var post = JSON.stringify({"id": id, "titolo": title, "autore": author, "dataOra": date, "testo": text});

    getCommentsByPost(post, id);

}
function getCommentsByPostNotLogged(parsedPostJson, postId) {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            var parsedCommentsJson = JSON.parse(this.responseText);

            var httpCode = parsedCommentsJson.server;

            //valori del post presi dal json
            var id = JSON.parse(parsedPostJson).id;
            var title = JSON.parse(parsedPostJson).titolo;
            var author = JSON.parse(parsedPostJson).autore.username;
            var date = JSON.parse(parsedPostJson).dataOra;
            var text = JSON.parse(parsedPostJson).testo;

            //clonazione del post template
            var templateNodes = document.getElementById("templates").childNodes;
            var clonedPostWithCommentsWithoutFormComment = templateNodes[7].cloneNode(true);

            //compilazione del post
            clonedPostWithCommentsWithoutFormComment.getElementsByClassName("card-header")[0].innerHTML = author;
            clonedPostWithCommentsWithoutFormComment.getElementsByClassName("card-title")[0].innerHTML = title;
            clonedPostWithCommentsWithoutFormComment.getElementsByClassName("card-text")[0].innerHTML = text;
            clonedPostWithCommentsWithoutFormComment.getElementsByClassName("card-footer")[0].innerHTML = date;

            for (i = parsedCommentsJson.response.length - 1; i >= 0; i--)
            {
                //valori del commento presi dal json
                //var id = parsedPostJson.id;
                var autore = parsedCommentsJson.response[i].autore.username;
                var testo = parsedCommentsJson.response[i].testo;
                var dataOra = parsedCommentsJson.response[i].dataOra;

                //clonazione del comment template
                var clonedComment = templateNodes[3].cloneNode(true);

                //compilazione del commento
                clonedComment.getElementsByClassName("autore")[0].innerHTML = autore;
                clonedComment.getElementsByClassName("card-text")[0].innerHTML = testo;
                clonedComment.getElementsByClassName("data")[0].innerHTML = dataOra;
                clonedPostWithCommentsWithoutFormComment.getElementsByClassName("overflow-auto")[0].appendChild(clonedComment);
            }
            //caricamento del post nella pagina html
            document.getElementById("overlay").appendChild(clonedPostWithCommentsWithoutFormComment);
            document.getElementById("overlay").style.display = "block";


        }
    };
    xmlhttp.open("GET", "http://localhost:8080/posts/" + postId + "/comments", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(parsedPostJson);
}
function getCommentsByPost(parsedPostJson, postId) {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            var parsedCommentsJson = JSON.parse(this.responseText);

            var httpCode = parsedCommentsJson.server;

            //valori del post presi dal json
            var id = JSON.parse(parsedPostJson).id;
            var title = JSON.parse(parsedPostJson).titolo;
            var author = JSON.parse(parsedPostJson).autore.username;
            var date = JSON.parse(parsedPostJson).dataOra;
            var text = JSON.parse(parsedPostJson).testo;

            //clonazione del post template
            var templateNodes = document.getElementById("templates").childNodes;
            var clonedPostWithComments = templateNodes[5].cloneNode(true);

            //compilazione del post
            clonedPostWithComments.getElementsByClassName("card-header")[0].innerHTML = author;
            clonedPostWithComments.getElementsByClassName("card-title")[0].innerHTML = title;
            clonedPostWithComments.getElementsByClassName("card-text")[0].innerHTML = text;
            clonedPostWithComments.getElementsByClassName("card-footer")[0].innerHTML = date;

            for (i = parsedCommentsJson.response.length - 1; i >= 0; i--)
            {
                //valori del commento presi dal json
                //var id = parsedPostJson.id;
                var autore = parsedCommentsJson.response[i].autore.username;
                var testo = parsedCommentsJson.response[i].testo;
                var dataOra = parsedCommentsJson.response[i].dataOra;

                //clonazione del comment template
                var clonedComment = templateNodes[3].cloneNode(true);

                //compilazione del commento
                clonedComment.getElementsByClassName("autore")[0].innerHTML = autore;
                clonedComment.getElementsByClassName("card-text")[0].innerHTML = testo;
                clonedComment.getElementsByClassName("data")[0].innerHTML = dataOra;
                clonedPostWithComments.getElementsByClassName("overflow-auto")[0].appendChild(clonedComment);
            }
            //caricamento del post nella pagina html
            document.getElementById("overlay").appendChild(clonedPostWithComments);
            var actionAtt = document.createAttribute("action");
            actionAtt.value = "javascript:createComment(" + id + ");";
            var form = document.getElementsByName("formComment")[1];
            form.setAttributeNode(actionAtt);
            document.getElementById("overlay").style.display = "block";


        }
    };
    xmlhttp.open("GET", "http://localhost:8080/posts/" + postId + "/comments", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(parsedPostJson);
}
function showPost(json) {
    var parsedJson = JSON.parse(json);
    var httpCode = parsedJson.server;

    var oldPosts = document.getElementById('posts');

    //valori del post presi dal json
    var id = parsedJson.response.id;
    var title = parsedJson.response.titolo;
    var author = parsedJson.response.autore.username;
    var date = parsedJson.response.dataOra;
    var text = parsedJson.response.testo;

    //clonazione del post template
    var postTemplateNodes = document.getElementById("templates").childNodes;
    var clonedPost = postTemplateNodes[1].cloneNode(true);

    //assegnazione dell'id del post al div
    var att = document.createAttribute("id");       // Create a "id" attribute
    att.value = id;                           // Set the value of the id attribute
    clonedPost.setAttributeNode(att);

    var buttonOnclick = document.createAttribute("onclick");
    buttonOnclick.value = "getPostById(" + id + ")";
    clonedPost.getElementsByClassName("btn btn-primary")[0].setAttributeNode(buttonOnclick);

    //compilazione del post
    clonedPost.getElementsByClassName("card-header")[0].innerHTML = author;
    clonedPost.getElementsByClassName("card-title")[0].innerHTML = title;
    clonedPost.getElementsByClassName("card-text")[0].innerHTML = text;
    clonedPost.getElementsByClassName("card-footer")[0].innerHTML = date;

    //caricamento del post nella pagina html
    oldPosts.insertBefore(clonedPost, oldPosts.firstChild);
}

function showPostsList(address) {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            visualPostsJson(this.responseText);

        }
    };
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
}

function visualPostsJson(json) {
    var parsedJson = JSON.parse(json);

    var posts = "";
    for (i = parsedJson.response.length - 1; i >= 0; i--) {

        //valori del post presi dal json
        var id = parsedJson.response[i].id;
        var title = parsedJson.response[i].titolo;
        var author = parsedJson.response[i].autore.username;
        var date = parsedJson.response[i].dataOra;
        var text = parsedJson.response[i].testo;

        //clonazione del post template
        var postTemplateNodes = document.getElementById("templates").childNodes;
        var clonedPost = postTemplateNodes[1].cloneNode(true);

        //assegnazione dell'id del post al div
        var att = document.createAttribute("id");       // Create a "id" attribute
        att.value = id;                           // Set the value of the id attribute
        clonedPost.setAttributeNode(att);

        //assegnazione dell'id del post al div
        var buttonOnclick = document.createAttribute("onclick");       // Create a "id" attribute
        buttonOnclick.value = "getPostById(" + id + ")";                           // Set the value of the id attribute
        clonedPost.getElementsByClassName("btn btn-primary")[0].setAttributeNode(buttonOnclick);

        //compilazione del post
        clonedPost.getElementsByClassName("card-header")[0].innerHTML = author;
        clonedPost.getElementsByClassName("card-title")[0].innerHTML = title;
        clonedPost.getElementsByClassName("card-text")[0].innerHTML = text;
        clonedPost.getElementsByClassName("card-footer")[0].innerHTML = date;

        //caricamento del post nella pagina html
        document.getElementById("posts").appendChild(clonedPost);
    }
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