let offlineStartTime = null;
let lastOnlineTime = "Never";
const historyTableBody = document.querySelector('#history-table tbody');

// Daftar emoji lucu
const onlineEmojis = ['😄', '😸', '🐼', '😊', '🐱'];
const offlineEmojis = ['😢', '🥺', '🐾', '🙀', '😿'];

// Fungsi memilih emoji secara acak
function getRandomEmoji(emojiList) {
    return emojiList[Math.floor(Math.random() * emojiList.length)];
}

// Fungsi menambahkan riwayat ke tabel
function addHistory(status) {
    const now = new Date();
    const formattedTime = now.toLocaleString();

    const row = document.createElement('tr');
    row.classList.add(status === "Online" ? 'online' : 'offline');

    const statusCell = document.createElement('td');
    statusCell.textContent = status;
    statusCell.classList.add('status');
    if (status === "Offline") {
        statusCell.classList.add('offline');
    }

    const timeCell = document.createElement('td');
    timeCell.textContent = formattedTime;

    row.appendChild(statusCell);
    row.appendChild(timeCell);
    historyTableBody.appendChild(row);
}

// Fungsi cek status koneksi
function checkNetworkStatus() {
    const statusIndicator = document.getElementById('status-indicator');
    const statusMessage = document.getElementById('status-message');
    const timeStatus = document.getElementById('time-status');
    const emojiContainer = document.getElementById('emoji-container');

    if (navigator.onLine) {
        if (offlineStartTime) {
            addHistory('Online');
            offlineStartTime = null;
        }

        const randomEmoji = getRandomEmoji(onlineEmojis);
        statusIndicator.textContent = `Online ${randomEmoji}`;
        statusIndicator.classList.remove('offline');
        statusIndicator.classList.add('online');
        statusMessage.textContent = 'You are connected to the internet.';
        emojiContainer.textContent = randomEmoji;
        timeStatus.textContent = `Last Online: ${new Date().toLocaleString()}`;
    } else {
        if (!offlineStartTime) {
            offlineStartTime = new Date();
            addHistory('Offline');
        }

        const randomEmoji = getRandomEmoji(offlineEmojis);
        statusIndicator.textContent = `Offline ${randomEmoji}`;
        statusIndicator.classList.remove('online');
        statusIndicator.classList.add('offline');
        statusMessage.textContent = 'No internet connection detected.';
        emojiContainer.textContent = randomEmoji;
        timeStatus.textContent = `Offline since: ${offlineStartTime.toLocaleTimeString()}`;
    }
}

// Jalankan cek status setiap 5 detik
setInterval(checkNetworkStatus, 5000);
checkNetworkStatus();
