function logout() {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "enablePost=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.assign("index.html");
}