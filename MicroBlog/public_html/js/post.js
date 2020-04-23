function createPost(address) {

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
    var title = document.formPost.title.value;
    var postText = document.formPost.postText.value;
    var autore = {"id": Number(getCookie("userId"))};
    var date = new Date();
    xmlhttp.open("POST", address, true);
    var post = JSON.stringify({"titolo": title, "autore": autore, "dataOra": date, "testo": postText});
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(post);
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
            var clonedPost = templateNodes[1].cloneNode(true);

            //compilazione del post
            clonedPost.getElementsByClassName("card-header")[0].innerHTML = author;
            clonedPost.getElementsByClassName("card-title")[0].innerHTML = title;
            clonedPost.getElementsByClassName("card-text")[0].innerHTML = text;
            clonedPost.getElementsByClassName("card-footer")[0].innerHTML = date;
            var button = clonedPost.getElementsByClassName("btn btn-primary")[0];
            button.remove();

            for (i = parsedCommentsJson.response.length - 1; i >= 0; i--)
            {
                //valori del commento presi dal json
                //var id = parsedPostJson.id;
                var autore = parsedCommentsJson.response[i].autore.username;
                var testo = parsedCommentsJson.response[i].testo;

                //clonazione del comment template
                var templateNodes1 = document.getElementById("templates").childNodes;
                var clonedComment = templateNodes1[3].cloneNode(true);

                //compilazione del commento
                clonedComment.getElementsByClassName("card-header")[0].innerHTML = autore;
                clonedComment.getElementsByClassName("card-text")[0].innerHTML = testo;
                clonedPost.getElementsByClassName("overflow-auto")[0].appendChild(clonedComment);
            }
            //caricamento del post nella pagina html
            document.getElementById("overlay").appendChild(clonedPost);

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

    //assegnazione dell'id del post al div
    var buttonOnclick = document.createAttribute("onclick");       // Create a "id" attribute
    buttonOnclick.value = "getPostById(" + id + ")";                           // Set the value of the id attribute
    clonedPost.getElementsByClassName("btn btn-primary")[0].setAttributeNode(buttonOnclick);

    //compilazione del post
    clonedPost.getElementsByClassName("card-header")[0].innerHTML = author;
    clonedPost.getElementsByClassName("card-title")[0].innerHTML = title;
    clonedPost.getElementsByClassName("card-text")[0].innerHTML = text;
    clonedPost.getElementsByClassName("card-footer")[0].innerHTML = date;
    var comments = clonedPost.getElementsByClassName("overflow-auto")[0];
    comments.remove();

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
    var httpCode = parsedJson.server;

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
        var comments = clonedPost.getElementsByClassName("overflow-auto")[0];
        comments.remove();

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