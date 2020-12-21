

Notification.requestPermission((status) => {
    console.log(`Notification permission status: ${status}`)
});

async function showNotification() {
    var count = 0;
    console.log(`notifications, count: ${count}`);
    const result = await Notification.requestPermission();
    if (result === 'granted') {
        const noti = new Notification('Hello', {
            body: 'It\'s fun.',
            icon: 'images/D4M-Logo PNG-8.png'
        });
        noti.onclick = () => alert('clicked');
    }
}

showNotification();