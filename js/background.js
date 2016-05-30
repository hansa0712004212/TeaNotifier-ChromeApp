/**
 * Set morning tea time default hour.
 * Value must be an integer between 0 - 11.
 * @type Number
 */
var defaultMorningTHour = 10;

/**
 * Set morning tea time default minute.
 * Value must be an integer between 0 - 59.
 * @type Number
 */
var defaultMorningTMinute = 0;

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
var defaultEveningTMinute = 30;

/**
 * Default text to speak out when notification pops up.
 * @type String
 */
var defaultTTSText = "It is tea time. Select your choice ?";

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

// Global variables
var date;
var hours;
var minutes;
var seconds;
var userEmail;

/**
 * Tick the time.
 * @returns {undefined}
 */
var ticker = function () {
    date = new Date();
    if (isWeekday()) {
        console.log(date.getSeconds());
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        if (((hours === defaultMorningTHour && minutes === defaultMorningTMinute)
                || (hours === defaultEveningTHour && minutes === defaultEveningTMinute))
                && seconds === 00) {
            notify();
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
    if (Notification.permission !== "granted")
        Notification.requestPermission();
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
var notify = function () {
    if (!Notification) {
        alert('Desktop notifications not available in your browser.');
        return;
    }
    console.log("awa");

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var notificationIcon = "images/morningTea.png";
        if (hours > 11) {
            notificationIcon = "images/eveningTea.png";
        }
        playNotificationSound();
        var notification = new Notification(getUserEmailWithGreeting(),
                {icon: notificationIcon,
                    body: defaultTTSText});
        setTimeout(platTTS, 1000);
        notification.onclick = function () {
            window.open("https://goo.gl/ghM5Md");
        };
    }
};

/**
 * run TTS.
 * @returns {undefined}
 */
var platTTS = function () {
    chrome.tts.speak(defaultTTSText,
            {'lang': defaultTTSLanguage, 'rate': defaultTTSSpeed});
};

/**
 * Play notification sound.
 * @returns {undefined}
 */
var playNotificationSound = function () {
    var sound = new Audio('../sounds/popup.mp3');
    sound.play();
};
