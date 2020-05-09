function createComment (postId) {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4) {
            switch (this.status) {

            }

        }

    };
    var commentText = document.getElementsByClassName("commenttext").value;
    var autore = {"id": Number(getCookie("userId"))};
    var post = {"id": Number(postId)};
    var date = new Date();
    xmlhttp.open("POST", "http://localhost:8080/comments/", true);
    var comment = JSON.stringify({"dataOra": date, "autore": autore, "testo": commentText, "post": post});
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(comment);
}
