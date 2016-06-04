/**
 * Set morning tea time default hour.
 * Value must be an integer between 0 - 11.
 * @type Number
 */
var defaultMorningTHour = 9;

/**
 * Set morning tea time default minute.
 * Value must be an integer between 0 - 59.
 * @type Number
 */
var defaultMorningTMinute = 55;

/**
 * Set evening tea time default hour.
 * Value must be an integer between 12 - 23.
 * @type Number
 */
var defaultEveningTHour = 15;

/**
 * Set evening tea time default minute.
 * Value must be an integer between 0 - 59.
 * @type Number
 */
var defaultEveningTMinute = 25;

/**
 * No of minutes till tea ready.
 * @type String
 */
var teaReadyDelay = 20;

/**
 * Default text to speak out when tea request notification pops up.
 * @type String
 */
var defaultTTSTeaRequestText = "It is tea time. Select your choice ?";

/**
 * Default text to speak out when tea ready notification pops up.
 * @type String
 */
var defaultTTSTeaReadyText = "Guys !!!, Tea ready.";

/**
 * Default text to speech language. 
 * en-IN for Indian English act.
 * @type String
 */
var defaultTTSLanguage = "en-IN";

/**
 * Default text to speech speed. 
 * 1.0 is any language default speed. 
 * @type Number
 */
var defaultTTSSpeed = 0.8;

/**
 * TTS voice gender.
 * @type String
 */
var defaultTTSGender = "female";

// Global variables
var date;
var hours;
var minutes;
var seconds;
var userEmail;
var teaReadyHour = 0;
var teaReadyMinute = 0;

/**
 * Tick the time.
 * @returns {undefined}
 */
var ticker = function () {
    date = new Date();
    if (isWeekday()) {
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        // check for tea time.
        if (((hours === getMorningTeaHour() && minutes === getMorningTeaMinute())
                || (hours === getEveningTeaHour() && minutes === getEveningTeaMinute()))
                && seconds === 00) {
            notifyTeaRequest();
            teaReady();
        }
        // check for tea ready time.
        if (hours === teaReadyHour && minutes === teaReadyMinute && seconds === 0) {
            notifyTeaReady();
        }
    }
};

/**
 * Check whether today is a weekday.
 * Assuming, Sunday is the start day of the week.
 * @returns {Boolean}
 */
var isWeekday = function () {
    return (date.getDay() > 0 && date.getDay() < 6);
};

/**
 * Check time on each given interval.
 * @param {type} function to execute
 * @param {type} delay
 */
setTimeout(loadDefaults, 1000);
setInterval(ticker, 1000);


/**
 * Request permission on page load.
 * @param {type} DOM content
 * @param {type} function
 */
document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

/**
 * Get greeting message with current logged in user's email.
 * @returns {String}
 */
var getUserEmailWithGreeting = function () {
    var greeting = "Good Morning ";
    if (hours > 12) {
        greeting = "Good Evening ";
    }
    if (userEmail && userEmail !== null) {
        return greeting + userEmail.split("@")[0];
    } else {
        return greeting + "Typefi User";
    }
};

/**
 * Prepare tea ready notification.
 * @returns {undefined}
 */
var teaReady = function () {
    if (date.getHours() < 12) { // morning tea ready
        teaReadyMinute = parseInt((getMorningTeaMinute() + getTeaReadyDelay()) % 60);
        teaReadyHour = getMorningTeaHour()
                + parseInt((getMorningTeaMinute() + getTeaReadyDelay()) / 60);
    } else { // evening tea ready
        teaReadyMinute = parseInt((getEveningTeaMinute() + getTeaReadyDelay()) % 60);
        teaReadyHour = getEveningTeaHour()
                + parseInt((getEveningTeaMinute() + getTeaReadyDelay()) / 60);
    }
};

/**
 * Get current signed in user's email address.
 * @param {type} param
 */
chrome.identity.getProfileUserInfo(function (userInfo) {
    userEmail = userInfo.email;
});

/**
 * Launch notification.
 * @returns {undefined}
 */
var notifyTeaRequest = function () {
    if (!Notification) {
        alert('Desktop notifications not available in your browser.');
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var notificationIcon = "images/morningTea.png";
        if (hours > 11) {
            notificationIcon = "images/eveningTea.png";
        }
        playTeaRequestSound();
        var notification = new Notification(getUserEmailWithGreeting(),
                {icon: notificationIcon,
                    body: getTTSTeaRequestText()});
        setTimeout(playTeaRequestTTS, 1000);
        notification.onclick = function () {
            window.open("https://goo.gl/ghM5Md");
            notification.close();
        };
    }
};

/**
 * triggers when meets tea ready time.
 * @returns {undefined}
 */
var notifyTeaReady = function () {
    if (!Notification) {
        alert('Desktop notifications not available in your browser.');
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var notificationIcon = "images/eveningTea.png";
        if (hours > 11) {
            notificationIcon = "images/morningTea.png";
        }
        playTeaReadySound();
        var notification = new Notification(getUserEmailWithGreeting(),
                {icon: notificationIcon,
                    body: getTTSTeaReadyText()});
        setTimeout(playTeaReadyTTS, 3000);
        notification.onclick = function () {
            notification.close();
        };
    }
};

/**
 * run tea request TTS.
 * @returns {undefined}
 */
var playTeaRequestTTS = function () {
    if (getSilentMode() === "false") {
        chrome.tts.speak(getTTSTeaRequestText(),
                {'lang': getTTSLanguage(), 'gender': getTTSGender(), 'rate': getTTSSpeed()});
    }
};

/**
 * run play tea ready TTS.
 * @returns {undefined}
 */
var playTeaReadyTTS = function () {
    if (getSilentMode() === "false") {
        chrome.tts.speak(getTTSTeaReadyText(),
                {'lang': getTTSLanguage(), 'gender': getTTSGender(), 'rate': getTTSSpeed()});
    }
};

/**
 * Play tea request notification sound.
 * @returns {undefined}
 */
var playTeaRequestSound = function () {
    if (getSilentMode() === "false") {
        var sound = new Audio('../sounds/popup.mp3');
        sound.play();
    }
};

/**
 * Play tea ready notification sound.
 * @returns {undefined}
 */
var playTeaReadySound = function () {
    if (getSilentMode() === "false") {
        var sound = new Audio('../sounds/teaready.mp3');
        sound.play();
    }
};

/**
 * Get silent mode value.
 * @returns {DOMString}
 */
var getSilentMode = function () {
    if (localStorage.getItem('silent')) {
        return localStorage.getItem('silent');
    } else {
        setSilentMode();
    }
};

/**
 * Get plain mode value.
 * @returns {DOMString}
 */
var getPlainMode = function () {
    if (localStorage.getItem('plain')) {
        return localStorage.getItem('plain');
    } else {
        setPlainMode();
    }
};

/**
 * Get morning tea hour value.
 * @returns {unresolved}
 */
var getMorningTeaHour = function () {
    if (localStorage.getItem('morningTeaHour')) {
        return parseInt(localStorage.getItem('morningTeaHour'));
    } else {
        setMorningTeaHour();
    }
};

/**
 * Get morning tea minute value.
 * @returns {unresolved}
 */
var getMorningTeaMinute = function () {
    if (localStorage.getItem('morningTeaMinute')) {
        return parseInt(localStorage.getItem('morningTeaMinute'));
    } else {
        setMorningTeaMinute();
    }
};

/**
 * Get evening tea hour value.
 * @returns {unresolved}
 */
var getEveningTeaHour = function () {
    if (localStorage.getItem('eveningTeaHour')) {
        return parseInt(localStorage.getItem('eveningTeaHour'));
    } else {
        setEveningTeaHour();
    }
};

/**
 * Get evening tea minute value.
 * @returns {unresolved}
 */
var getEveningTeaMinute = function () {
    if (localStorage.getItem('eveningTeaMinute')) {
        return parseInt(localStorage.getItem('eveningTeaMinute'));
    } else {
        setEveningTeaMinute();
    }
};

/**
 * Get tts language value.
 * @returns {DOMString}
 */
var getTTSLanguage = function () {
    if (localStorage.getItem('ttsLanguage')) {
        return localStorage.getItem('ttsLanguage');
    } else {
        setTTSLanguage();
    }
};

/**
 * Get tts speaking speed value.
 * @returns {unresolved}
 */
var getTTSSpeed = function () {
    if (localStorage.getItem('ttsSpeed')) {
        return parseFloat(localStorage.getItem('ttsSpeed'));
    } else {
        setTTSSpeed();
    }
};

/**
 * Get tts gender value.
 * @returns {DOMString}
 */
var getTTSGender = function () {
    if (localStorage.getItem('ttsGender')) {
        return localStorage.getItem('ttsGender');
    } else {
        setTTSGender();
    }
};

/**
 * Get tea request message value.
 * @returns {DOMString}
 */
var getTTSTeaRequestText = function () {
    if (localStorage.getItem('ttsTeaRequestText')) {
        return localStorage.getItem('ttsTeaRequestText');
    } else {
        setTTSTeaRequestText();
    }
};

/**
 * Get tea ready message value.
 * @returns {DOMString}
 */
var getTTSTeaReadyText = function () {
    if (localStorage.getItem('ttsTeaReadyText')) {
        return localStorage.getItem('ttsTeaReadyText');
    } else {
        setTTSTeaReadyText();
    }
};

/**
 * Get tea ready delay value.
 * @returns {unresolved}
 */
var getTeaReadyDelay = function () {
    if (localStorage.getItem('teaReadyDelay')) {
        return parseInt(localStorage.getItem('teaReadyDelay'));
    } else {
        setTeaReadyDelay();
    }
};

/**
 * Set silent mode value.
 * @returns {undefined}
 */
var setSilentMode = function () {
    localStorage.setItem('silent', false);
};

/**
 * Set plain mode value.
 * @returns {undefined}
 */
var setPlainMode = function () {
    localStorage.setItem('plain', false);
};

/**
 * Set morning tea hour value.
 * @returns {undefined}
 */
var setMorningTeaHour = function () {
    localStorage.setItem('morningTeaHour', defaultMorningTHour);
};

/**
 * Set morning tea minute value.
 * @returns {undefined}
 */
var setMorningTeaMinute = function () {
    localStorage.setItem('morningTeaMinute', defaultMorningTMinute);
};

/**
 * Set evening tea hour value.
 * @returns {undefined}
 */
var setEveningTeaHour = function () {
    localStorage.setItem('eveningTeaHour', defaultEveningTHour);
};

/**
 * Set evening tea minute value.
 * @returns {undefined}
 */
var setEveningTeaMinute = function () {
    localStorage.setItem('eveningTeaMinute', defaultEveningTMinute);
};

/**
 * Set tts language value.
 * @returns {undefined}
 */
var setTTSLanguage = function () {
    localStorage.setItem('ttsLanguage', defaultTTSLanguage);
};

/**
 * Set tts speaking speed value.
 * @returns {undefined}
 */
var setTTSSpeed = function () {
    localStorage.setItem('ttsSpeed', defaultTTSSpeed);
};

/**
 * Set tts gender value.
 * @returns {undefined}
 */
var setTTSGender = function () {
    localStorage.setItem('ttsGender', defaultTTSGender);
};

/**
 * Set tea request message value.
 * @returns {undefined}
 */
var setTTSTeaRequestText = function () {
    localStorage.setItem('ttsTeaRequestText', defaultTTSTeaRequestText);
};

/**
 * Set tea ready message value.
 * @returns {undefined}
 */
var setTTSTeaReadyText = function () {
    localStorage.setItem('ttsTeaReadyText', defaultTTSTeaReadyText);
};

/**
 * Set tea ready delay value.
 * @returns {undefined}
 */
var setTeaReadyDelay = function () {
    localStorage.setItem('teaReadyDelay', teaReadyDelay);
};

/**
 * load defaults values for 1st ever run.
 * @returns {undefined}
 */
function loadDefaults() {
    getSilentMode();
    getPlainMode();
    getMorningTeaHour();
    getMorningTeaMinute();
    getEveningTeaHour();
    getEveningTeaMinute();
    getTTSLanguage();
    getTTSSpeed();
    getTTSGender();
    getTTSTeaRequestText();
    getTTSTeaReadyText();
    getTeaReadyDelay();
}
