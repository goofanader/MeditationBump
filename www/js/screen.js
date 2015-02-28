var canvas;
var ctx;

function init() {
    canvas = document.getElementById('gameScreen');
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");

      window.addEventListener('resize', resizeCanvas, false);
      window.addEventListener('orientationchange', resizeCanvas, false);
      resizeCanvas();
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}  

init();
resizeCanvas();

ctx.rect(canvas.width/2, canvas.height/2, 10, 10);
ctx.stroke();

function startTouching(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(e);
}

function whileTouching(e) {
    console.log('touching!');
    ctx.rect(e.screenX, e.screenY, 10, 10);
    ctx.stroke();
}

function endTouching(e) {
    console.log(e)
}

window.addEventListener('touchstart', startTouching, false);
window.addEventListener('touchmove', whileTouching, false);
window.addEventListener('touchend', endTouching, false);