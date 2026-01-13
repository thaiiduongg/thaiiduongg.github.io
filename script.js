// ================== TIMER TỪ 01/01/2026 ==================
const startTime = new Date("2026-01-01T00:00:00").getTime();

function updateCounter() {
    const now = Date.now();
    let diff = now - startTime;

    if (diff < 0) diff = 0;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const ms = diff % 1000;

    document.getElementById("count-followers").textContent = String(hours).padStart(2, "0");
    document.getElementById("count-following").textContent = String(minutes).padStart(2, "0");
    document.getElementById("count-posts").textContent = String(seconds).padStart(2, "0");
    document.getElementById("count-works").textContent = String(ms).padStart(3, "0");

    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);
