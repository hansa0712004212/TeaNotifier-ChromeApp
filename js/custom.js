window.onload = function () {
    var randomNumber = Math.floor((Math.random() * 12) + 1);
    document.body.style.backgroundImage = "url('images/" + randomNumber + ".gif')";
};