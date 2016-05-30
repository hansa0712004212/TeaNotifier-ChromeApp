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
var defaultTTSSpeed = 0.7;

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
        if (((hours === defaultMorningTHour && minutes === defaultMorningTMinute)
                || (hours === defaultEveningTHour && minutes === defaultEveningTMinute))
                && seconds === 00) {
            notifyTeaRequest();
            teaReady();
        }
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
        teaReadyMinute = parseInt((defaultMorningTMinute + teaReadyDelay) % 60);
        teaReadyHour = defaultMorningTHour
                + parseInt((defaultMorningTMinute + teaReadyDelay) / 60);
    } else { // evening tea ready
        teaReadyMinute = parseInt((defaultEveningTMinute + teaReadyDelay) % 60);
        teaReadyHour = defaultEveningTHour
                + parseInt((defaultEveningTMinute + teaReadyDelay) / 60);
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
                    body: defaultTTSTeaRequestText});
        setTimeout(playTeaRequestTTS, 1000);
        notification.onclick = function () {
            window.open("https://goo.gl/ghM5Md");
            notification.close();
        };
    }
};

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
                    body: defaultTTSTeaReadyText});
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
    chrome.tts.speak(defaultTTSTeaRequestText,
            {'lang': defaultTTSLanguage, 'rate': defaultTTSSpeed});
};

/**
 * run play tea ready TTS.
 * @returns {undefined}
 */
var playTeaReadyTTS = function () {
    chrome.tts.speak(defaultTTSTeaReadyText,
            {'lang': defaultTTSLanguage, 'rate': defaultTTSSpeed});
};

/**
 * Play tea request notification sound.
 * @returns {undefined}
 */
var playTeaRequestSound = function () {
    var sound = new Audio('../sounds/popup.mp3');
    sound.play();
};

/**
 * Play tea ready notification sound.
 * @returns {undefined}
 */
var playTeaReadySound = function () {
    var sound = new Audio('../sounds/teaready.mp3');
    sound.play();
};
