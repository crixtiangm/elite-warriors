const image = new Image();
image.src = "../images/macuahuitl.png";
const bg = new Background(canvas.width, canvas.height)
const aguila = new Aguila(10,250,ctx,205,250,image);
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame();
      };
}

function startGame() {
    if(!requestId){
       requestId = requestAnimationFrame(updateGame)
      }
}

function updateGame() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    bg.update();
    aguila.render();
    //aguila.update();
    if(requestId){
        requestAnimationFrame(updateGame);
    }
}

function attack() {
    aguila.update();
    if(attackStatus){
        requestAnimationFrame(attack)
    }
}

addEventListener("keydown", (event)=>{
    if(event.keyCode === 32){
            attackStatus = true;
            attack();
    }
  })

addEventListener("keyup", (event)=>{
    if(event.keyCode === 32){
       setTimeout(()=>{
        attackStatus = false;
       },100)
    }
  })
