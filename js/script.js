const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

// Get a reference to the restart button.
const restartButton = document.getElementById("restartButton");

let isJumping = false;
let collider = 120;
let largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// When you press space, add the jump class for Mario to jump.
const jump = () => {

    if (!isJumping) {
        isJumping = true;

        mario.classList.add("jump");

        setTimeout(() => {
            mario.classList.remove("jump");
            isJumping = false;
        }, 500)
    }
}

const changeSprite = () => {
    mario.src = "./images/game-over.png"
    mario.style.width = "80px";
    mario.style.marginLeft = "50px";
    
    if (largura <= 968)
        mario.style.width = "50px";
}

const gameOver = (pipePosition, marioPosition) => {
    if (largura <= 968)
        collider = 70

    if (pipePosition <= collider && pipePosition > 0 && marioPosition < 80) {

        // Stop pipe animation.
        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        // Stop mario animation.
        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;

        // Change mario sprite.
        changeSprite();

        restartButton.style.display = "block";

        restartButton.addEventListener("click", () => {
            // Reload the page to restart the game.
            window.location.reload();
        });

        clearInterval(loop);
    }
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

    gameOver(pipePosition, marioPosition);
}, 10);

document.addEventListener("keydown", (event) => {
    if (event.code === "Space")
        jump();
});