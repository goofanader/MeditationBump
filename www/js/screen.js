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

ctx.rect(20, 20, 150, 100);
ctx.stroke();