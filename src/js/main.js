window.onload = () => {
    var count = 0;
    console.log(`main onload count: ${count}`);
    if ('serviceWorker' in navigator) {
        console.log(`main if_navigator count: ${count}`);
        navigator.serviceWorker
            .register('/sw.js');
        /*navigator.serviceWorker
            .register('/site_1/sw.js');
            */
        navigator.serviceWorker
            .register('/site_2/sw.js');
        count++;
    }
}

/*
var deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    showAddToHomeScreen();

});

function showAddToHomeScreen() {

    var a2hsBtn = document.querySelector(".ad2hs-prompt");

    a2hsBtn.style.display = "flex";

    a2hsBtn.addEventListener("click", addToHomeScreen);
}
*/