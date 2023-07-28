const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

// When you press space, add the jump class for Mario to jump.
const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500)
}

const gameOver = (pipePosition, marioPosition) => {
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png'
        mario.style.width = '80px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
    }
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    gameOver(pipePosition, marioPosition);
}, 10);

document.addEventListener('keydown', jump);