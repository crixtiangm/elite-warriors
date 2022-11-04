const image = new Image();
image.src = "../images/walk-front.png";
const bgImage = new Image();
const imageLuna = new Image();
imageLuna.src = "../images/Luna.png";
const bg = new Background(canvas.width,canvas.height)
const bgLuna = new Luna(-250,-250,ctx,641,636,imageLuna)
const bgNubes = new Nubes(canvas.width, canvas.height);
//const aguila = new Aguila(50,394,ctx,330,235,image);
const aguila = new Aguila(100,430,ctx,150,160,image);


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
    bg.render();
    bgLuna.render();
    bgNubes.render();
    aguila.render();
    if(requestId){
        requestAnimationFrame(updateGame);
    }
}

function attack() {
    attackStatus = aguila.updateAttack(); //Hacemos que recorra todos los Frames para dar el efecto de que con un solo tecleo hace un ataque
    if(attackStatus){                     //Mientras no devuelva false se ejecutara todo el ciclo
        requestAnimationFrame(attack);
    }
}

function walkFront() {
    walkStatus = aguila.updateWalk();
    if(walkStatus){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(aguila.x >= canvas.width/2){
        bg.update();
        bgLuna.render();
        bgNubes.update();
        aguila.render();
        requestAnimationFrame(walkFront);
        aguila.x = canvas.width/2;
        }else if(aguila.x < canvas.width/2){
            bg.render();
            bgLuna.render();
            bgNubes.render();
            aguila.render();
            requestAnimationFrame(walkFront);
            aguila.x ++;
        }
        
        
    }
}

function walkBack() {
    walkStatus = aguila.updateWalk();
    if(walkStatus){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(aguila.x > 0){
        bg.render();
        bgLuna.render();
        bgNubes.render();
        aguila.render();
        requestAnimationFrame(walkBack);
        aguila.x --;
        }else if(aguila.x <= 0){
            bg.render();
            bgLuna.render();
            bgNubes.render();
            aguila.render();
            requestAnimationFrame(walkBack);
        }
    }
}

addEventListener("keydown", (event)=>{
        if(event.keyCode === 32){
            aguila.macuahuitl();
            attack()
        }else if(event.keyCode === 39){
            aguila.walk();
            walkFront();
        }else if(event.keyCode ===37){
            aguila.walkBack();
            walkBack();
        }
  })

addEventListener("keyup", (event)=>{
    if(event.keyCode === 32){
       //aguila.walk()
    }
  })