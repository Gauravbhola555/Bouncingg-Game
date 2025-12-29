let score = 0;
let fallingObject = document.getElementById('fallingObject');
let basket = document.getElementById('basket');
let gameArea = document.getElementById('gameArea');
let gameInterval;
let objectInterval;

function startGame() {
    document.addEventListener('keydown', moveBasket);
    objectInterval = setInterval(createFallingObject, 1200);
}

function createFallingObject() {
    let object = fallingObject.cloneNode();
    object.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    object.style.top = '0px';
    gameArea.appendChild(object);
    fall(object);
}

function fall(object) {
    let fallInterval = setInterval(() => {
        let objectTop = parseInt(object.style.top);
        if (objectTop < gameArea.clientHeight - 30) {
            object.style.top = objectTop + 5 + 'px';
        } else {
            clearInterval(fallInterval);
            gameArea.removeChild(object);
        }

        if (isCaught(object)) {
            clearInterval(fallInterval);
            gameArea.removeChild(object);
            score++;
            document.getElementById('score').innerText = 'Score: ' + score;
        }
    }, 50);
}

function isCaught(object) {
    let objectRect = object.getBoundingClientRect();
    let basketRect = basket.getBoundingClientRect();
    return (
        objectRect.bottom >= basketRect.top &&
        objectRect.left + objectRect.width >= basketRect.left &&
        objectRect.left <= basketRect.left + basketRect.width
    );
}

function moveBasket(event) {
    let basketLeft = parseInt(basket.style.left);
    if (event.key === 'ArrowLeft' && basketLeft > 0) {
        basket.style.left = basketLeft - 20 + 'px';
    } else if (event.key === 'ArrowRight' && basketLeft < gameArea.clientWidth - 80) {
        basket.style.left = basketLeft + 20 + 'px';
    }
}

startGame();