function createComment(postId) {

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
                    getCommentById(parsedJson.response);
                    break;
            }

        }

    };

    var commentText = document.getElementsByClassName("commenttext")[1].value;
    var autore = {"id": Number(getCookie("userId"))};
    var post = {"id": Number(postId)};
    var date = new Date();
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();
    var year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var formatted_date = year + "-" + month + "-" + day;
    xmlhttp.open("POST", "http://localhost:8080/comments/", true);
    var comment = JSON.stringify({"dataOra": formatted_date, "autore": autore, "testo": commentText, "post": post});
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(comment);
}
function getCommentById(url) {

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
                    showComment(JSON.parse(this.responseText).response);
                    break;
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function showComment(parsedCommentJson) {
    var autore = parsedCommentJson.autore.username;
    var testo = parsedCommentJson.testo;
    var dataOra = parsedCommentJson.dataOra;

    var templateNodes = document.getElementById("templates").childNodes;
    var clonedComment = templateNodes[3].cloneNode(true);

    clonedComment.getElementsByClassName("autore")[0].innerHTML = autore;
    clonedComment.getElementsByClassName("card-text")[0].innerHTML = testo;
    clonedComment.getElementsByClassName("data")[0].innerHTML = dataOra;
    
    document.getElementsByClassName("overflow-auto")[1].insertBefore(clonedComment, document.getElementsByClassName("overflow-auto")[1].childNodes[0]);
}

