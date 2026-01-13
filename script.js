// ================== TIMER TỪ 01/01/2026 =================
const startTime = new Date("2026-01-01T00:00:00").getTime();

function updateCounter() {
    const now = Date.now();
    let diff = now - startTime;

    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("count-followers").textContent = days;
    document.getElementById("count-following").textContent = String(hours).padStart(2, "0");
    document.getElementById("count-posts").textContent = String(minutes).padStart(2, "0");
    document.getElementById("count-works").textContent = String(seconds).padStart(2, "0");

    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);

