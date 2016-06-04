/**
 * when initialize options window.
 * @returns {undefined}
 */
window.onload = function () {
    /**
     * Set silent mode value in chrome storage.
     * @returns {undefined}
     */
    var setSilentMode = function () {
        if (document.getElementById('silent').checked === true) {
            localStorage.setItem('silent', "true");
        } else {
            localStorage.setItem('silent', "false");
        }
    };

    /**
     * Set plain mode value in chrome storage.
     * @returns {undefined}
     */
    var setPlainMode = function () {
        if (document.getElementById('plain').checked === true) {
            localStorage.setItem('plain', "true");
        } else {
            localStorage.setItem('plain', "false");
        }
    };

    /**
     * Set morning tea hour value in chrome storage.
     * @returns {undefined}
     */
    var setMorningTeaHour = function () {
        localStorage.setItem('morningTeaHour', document.getElementById('morningTeaHour').value);
    };

    /**
     * Set morning tea minute value in chrome storage.
     * @returns {undefined}
     */
    var setMorningTeaMinute = function () {
        localStorage.setItem('morningTeaMinute', document.getElementById('morningTeaMinute').value);
    };

    /**
     * Set evning tea hour value in chrome storage.
     * @returns {undefined}
     */
    var setEveningTeaHour = function () {
        localStorage.setItem('eveningTeaHour', document.getElementById('eveningTeaHour').value);
    };

    /**
     * Set evening tea minute value in chrome storage.
     * @returns {undefined}
     */
    var setEveningTeaMinute = function () {
        localStorage.setItem('eveningTeaMinute', document.getElementById('eveningTeaMinute').value);
    };

    /**
     * Set tts language value in chrome storage.
     * @returns {undefined}
     */
    var setTTSLanguage = function () {
        localStorage.setItem('ttsLanguage', document.getElementById('ttsLanguage').value);
    };

    /**
     * Set tts speed value in chrome storage.
     * @returns {undefined}
     */
    var setTTSSpeed = function () {
        localStorage.setItem('ttsSpeed', document.getElementById('ttsSpeed').value);
    };

    /**
     * Set tts gender value in chrome storage.
     * @returns {undefined}
     */
    var setTTSGender = function () {
        localStorage.setItem('ttsGender', document.getElementById('ttsGender').value);
    };

    /**
     * Set tea request message value in chrome storage.
     * @returns {undefined}
     */
    var setTTSTeaRequestText = function () {
        localStorage.setItem('ttsTeaRequestText', document.getElementById('ttsTeaRequestText').value);
    };

    /**
     * Set tts tea ready value in chrome storage.
     * @returns {undefined}
     */
    var setTTSTeaReadyText = function () {
        localStorage.setItem('ttsTeaReadyText', document.getElementById('ttsTeaReadyText').value);
    };

    /**
     * Set tea ready delay value in chrome storage.
     * @returns {undefined}
     */
    var setTeaReadyDelay = function () {
        localStorage.setItem('teaReadyDelay', document.getElementById('teaReadyDelay').value);
    };

    /**
     * Get silent mode value in chrome storage.
     * @returns {undefined}
     */
    var getSilentMode = function () {
        if (localStorage.getItem('silent') === "true") {
            document.getElementById('silent').checked = true;
        } else {
            document.getElementById('silent').checked = false;
        }
    };

    /**
     * Get plain mode value in chrome storage.
     * @returns {undefined}
     */
    var getPlainMode = function () {
        if (localStorage.getItem('plain') === "true") {
            document.getElementById('plain').checked = true;
        } else {
            document.getElementById('plain').checked = false;
        }
    };

    /**
     * Get morning tea hour value in chrome storage.
     * @returns {undefined}
     */
    var getMorningTeaHour = function () {
        document.getElementById('morningTeaHour').value = localStorage.getItem('morningTeaHour');
    };

    /**
     * Get morning tea minute value in chrome storage.
     * @returns {undefined}
     */
    var getMorningTeaMinute = function () {
        document.getElementById('morningTeaMinute').value = localStorage.getItem('morningTeaMinute');
    };

    /**
     * Get evening tea hour value in chrome storage.
     * @returns {undefined}Set  value in chrome storage.
     */
    var getEveningTeaHour = function () {
        document.getElementById('eveningTeaHour').value = localStorage.getItem('eveningTeaHour');
    };

    /**
     * Get evening tea minute value in chrome storage.
     * @returns {undefined}
     */
    var getEveningTeaMinute = function () {
        document.getElementById('eveningTeaMinute').value = localStorage.getItem('eveningTeaMinute');
    };

    /**
     * Get tts language value in chrome storage.
     * @returns {undefined}
     */
    var getTTSLanguage = function () {
        document.getElementById('ttsLanguage').value = localStorage.getItem('ttsLanguage');
    };

    /**
     * Get tts speed value in chrome storage.
     * @returns {undefined}
     */
    var getTTSSpeed = function () {
        document.getElementById('ttsSpeed').value = localStorage.getItem('ttsSpeed');
    };

    /**
     * Get tts gender value in chrome storage.
     * @returns {undefined}
     */
    var getTTSGender = function () {
        document.getElementById('ttsGender').value = localStorage.getItem('ttsGender');
    };

    /**
     * Get tea request message value in chrome storage.
     * @returns {undefined}
     */
    var getTTSTeaRequestText = function () {
        document.getElementById('ttsTeaRequestText').value = localStorage.getItem('ttsTeaRequestText');
    };

    /**
     * Get tea ready message value in chrome storage.
     * @returns {undefined}
     */
    var getTTSTeaReadyText = function () {
        document.getElementById('ttsTeaReadyText').value = localStorage.getItem('ttsTeaReadyText');
    };

    /**
     * Get tea ready delay value in chrome storage.
     * @returns {undefined}
     */
    var getTeaReadyDelay = function () {
        document.getElementById('teaReadyDelay').value = localStorage.getItem('teaReadyDelay');
    };

    /**
     * Uninstall extension it-self.
     * @returns {undefined}
     */
    var uninstallMyself = function () {
        chrome.management.uninstallSelf({showConfirmDialog: true});
    };

    /**
     * Go back to home view.
     * @returns {undefined}
     */
    var goHome = function () {
        window.location.href = "popup.html";
    };

    /**
     * Perform factory reset.
     * @returns {undefined}
     */
    var factoryReset = function () {
        localStorage.setItem('silent', "false");
        localStorage.setItem('plain', "false");
        localStorage.setItem('morningTeaHour', 9);
        localStorage.setItem('morningTeaMinute', 55);
        localStorage.setItem('eveningTeaHour', 15);
        localStorage.setItem('eveningTeaMinute', 25);
        localStorage.setItem('ttsLanguage', "en-IN");
        localStorage.setItem('ttsSpeed', 0.8);
        localStorage.setItem('ttsGender', "female");
        localStorage.setItem('ttsTeaRequestText', "It is tea time. Select your choice ?");
        localStorage.setItem('ttsTeaReadyText', "Guys !!!, Tea ready.");
        localStorage.setItem('teaReadyDelay', 20);
        loadData();
    };

    /**
     * Load saved settings data from chrome storage.
     * @returns {undefined}
     */
    var loadData = function () {
        getSilentMode();
        getPlainMode();
        getMorningTeaHour();
        getMorningTeaMinute();
        getEveningTeaHour();
        getEveningTeaMinute();
        getTTSTeaReadyText();
        getTTSTeaRequestText();
        getTeaReadyDelay();
        getTTSSpeed();
        getTTSLanguage();
        getTTSGender();
    };

    // load all stored data.
    loadData();

    // Action Events.
    document.getElementById('silent').onclick = setSilentMode;
    document.getElementById('plain').onclick = setPlainMode;
    document.getElementById('uninstall').onclick = uninstallMyself;
    document.getElementById('close').onclick = goHome;
    document.getElementById('reset').onclick = factoryReset;
    document.getElementById('morningTeaHour').onchange = setMorningTeaHour;
    document.getElementById('morningTeaMinute').onchange = setMorningTeaMinute;
    document.getElementById('eveningTeaHour').onchange = setEveningTeaHour;
    document.getElementById('eveningTeaMinute').onchange = setEveningTeaMinute;
    document.getElementById('teaReadyDelay').onchange = setTeaReadyDelay;
    document.getElementById('ttsLanguage').onchange = setTTSLanguage;
    document.getElementById('ttsSpeed').onchange = setTTSSpeed;
    document.getElementById('ttsTeaRequestText').onchange = setTTSTeaRequestText;
    document.getElementById('ttsTeaReadyText').onchange = setTTSTeaReadyText;
    document.getElementById('ttsGender').onchange = setTTSGender;
};