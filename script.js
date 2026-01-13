// Thả tim
(function(window, document) {
    const hearts = [];

    function initHearts() {
        const style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(
            ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
        ));
        document.head.appendChild(style);

        setupClickHandler();
        animateHearts();
    }

    function setupClickHandler() {
        const originalOnclick = window.onclick;
        window.onclick = function(event) {
            if (originalOnclick) originalOnclick();
            createHeart(event);
        };
    }

    function createHeart(event) {
        const heart = document.createElement("div");
        heart.className = "heart";
        hearts.push({
            el: heart,
            x: event.clientX - 5,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: getRandomColor()
        });
        document.body.appendChild(heart);
    }

    function animateHearts() {
        for (let i = 0; i < hearts.length; i++) {
            if (hearts[i].alpha <= 0) {
                document.body.removeChild(hearts[i].el);
                hearts.splice(i, 1);
                continue;
            }
            hearts[i].y--;
            hearts[i].scale += 0.004;
            hearts[i].alpha -= 0.013;
            hearts[i].el.style.cssText = `left:${hearts[i].x}px;top:${hearts[i].y}px;opacity:${hearts[i].alpha};transform:scale(${hearts[i].scale},${hearts[i].scale}) rotate(45deg);background:${hearts[i].color};z-index:99999`;
        }
        requestAnimationFrame(animateHearts);
    }

    function getRandomColor() {
        return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
    }

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        setTimeout(callback, 1000 / 60);
    };

    initHearts();
})(window, document);

// Message Box
const messageBox = document.querySelector('.js-message');
const btn = document.querySelector('.js-message-btn');
const card = document.querySelector('.js-profile-card');
const closeBtn = document.querySelectorAll('.js-message-close');

btn.addEventListener('click', function(e) {
    e.preventDefault();
    card.classList.add('active');
});

closeBtn.forEach(function(element) {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        card.classList.remove('active');
    });
});

// Chạy số animate
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
    let currentNumber = startNumber;
    const interval = setInterval(() => {
        if (currentNumber >= finalNumber) {
            clearInterval(interval);
        } else {
            let inc = Math.ceil(finalNumber / (duration / 17));
            if (currentNumber + inc > finalNumber) {
                currentNumber = finalNumber;
                clearInterval(interval);
            } else {
                currentNumber += inc;
            }
            callback(currentNumber);
        }
    }, 17);
}

document.addEventListener('DOMContentLoaded', function() {
    animateNumber(50000, 5000, 0, function(number) {
        document.getElementById('count-followers').innerText = number.toLocaleString();
    });
    animateNumber(1, 5000, 0, function(number) {
        document.getElementById('count-following').innerText = number.toLocaleString();
    });
    animateNumber(68, 5000, 0, function(number) {
        document.getElementById('count-posts').innerText = number.toLocaleString();
    });
    animateNumber(2, 5000, 0, function(number) {
        document.getElementById('count-works').innerText = number.toLocaleString();
    });

    // Xử lý tham số key từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    const keyDisplay = document.getElementById('key-display');

    if (key) {
        keyDisplay.style.display = 'block'; // Hiển thị div khi có key
        keyDisplay.innerHTML = `Key Tool: <strong>${key}</strong>`;
    }
});

// Tuyết rơi
const snowmax = 40;
const snowcolor = ["#aaaacc", "#ddddff", "#ccccdd", "#f3f3f3", "#f0ffff"];
const snowtype = ["Times", "Arial", "Times", "Verdana"];
const snowletter = "*";
const sinkspeed = 0.6;
const snowmaxsize = 50;
const snowminsize = 8;
const snowingzone = 1;

const snow = [];
let marginbottom, marginright;
const x_mv = [];
const crds = [];
const lftrght = [];

function randommaker(range) {
    return Math.floor(range * Math.random());
}

function initsnow() {
    marginbottom = document.body.scrollHeight;
    marginright = window.innerWidth - 15;

    const snowsizerange = snowmaxsize - snowminsize;
    for (let i = 0; i <= snowmax; i++) {
        crds[i] = 0;
        lftrght[i] = Math.random() * 15;
        x_mv[i] = 0.03 + Math.random() / 10;

        const snowflake = document.createElement("span");
        snowflake.className = "snowflake";
        snowflake.id = "s" + i;
        snowflake.style.fontFamily = snowtype[randommaker(snowtype.length)];
        snowflake.size = randommaker(snowsizerange) + snowminsize;
        snowflake.style.fontSize = snowflake.size + "px";
        snowflake.style.color = snowcolor[randommaker(snowcolor.length)];
        snowflake.style.zIndex = 1000;
        snowflake.sink = sinkspeed * snowflake.size / 5;

        if (snowingzone === 1) snowflake.posx = randommaker(marginright - snowflake.size);
        snowflake.posy = randommaker(2 * marginbottom - marginbottom - 2 * snowflake.size);
        snowflake.style.left = snowflake.posx + "px";
        snowflake.style.top = snowflake.posy + "px";
        snowflake.innerHTML = snowletter;

        document.body.appendChild(snowflake);
        snow[i] = snowflake;
    }
    movesnow();
}

function movesnow() {
    for (let i = 0; i <= snowmax; i++) {
        crds[i] += x_mv[i];
        snow[i].posy += snow[i].sink;
        snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
        snow[i].style.top = snow[i].posy + "px";

        if (snow[i].posy >= marginbottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])) {
            if (snowingzone === 1) snow[i].posx = randommaker(marginright - snow[i].size);
            snow[i].posy = 0;
        }
    }
    setTimeout(movesnow, 50);
}

window.onload = initsnow;