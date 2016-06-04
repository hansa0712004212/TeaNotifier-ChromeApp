/**
 * when popup initialize.
 * @returns {undefined}
 */
window.onload = function () {
    // check for preferred background.
    if (getPlainMode() === "false") {
        // generate random number to select random background animation.
        var randomNumber = Math.floor((Math.random() * 12) + 1);
        // apply random background.
        document.body.style.backgroundImage = "url('images/" + randomNumber + ".gif')";
    }
};

/**
 * get preferred background format from saved settings.
 * @returns {DOMString}
 */
var getPlainMode = function () {
    if (localStorage.getItem('plain')) {
        return localStorage.getItem('plain');
    }
};