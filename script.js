// Hiển thị key từ URL (giữ nguyên)
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    const keyDisplay = document.getElementById('key-display');

    if (key) {
        keyDisplay.style.display = 'block';
        keyDisplay.innerHTML = `Key Tool: <strong>${key}</strong>`;
    }
});


// ⏱ Đếm thời gian từ 01/01/2026
const startTime = new Date("2026-01-01T00:00:00").getTime();

function updateCounter() {
    const now = Date.now();
    let diff = now - startTime;

    if (diff < 0) diff = 0;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const ms = diff % 1000;

    const f1 = document.getElementById("count-followers");
    const f2 = document.getElementById("count-following");
    const f3 = document.getElementById("count-posts");
    const f4 = document.getElementById("count-works");

    if (f1 && f2 && f3 && f4) {
        f1.innerText = String(hours).padStart(2, "0");
        f2.innerText = String(minutes).padStart(2, "0");
        f3.innerText = String(seconds).padStart(2, "0");
        f4.innerText = String(ms).padStart(3, "0");
    }

    requestAnimationFrame(updateCounter);
}

updateCounter();
