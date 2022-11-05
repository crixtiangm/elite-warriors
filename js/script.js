const image = new Image();
image.src = "../images/walk-front.png";
const bgImage = new Image();
const imageLuna = new Image();
imageLuna.src = "../images/Luna.png";
const bg = new Background(canvas.width,canvas.height)
const bgLuna = new Luna(-250,-250,ctx,641,636,imageLuna);
const bgNubes = new Nubes(canvas.width, canvas.height);
const aguila = new Aguila(-100,430,ctx,379,160,image);


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

function attackFront() {
    attackStatus = aguila.updateAttack(); //Hacemos que recorra todos los Frames para dar el efecto de que con un solo tecleo hace un ataque
    if(attackStatus){                     //Mientras no devuelva false se ejecutara todo el ciclo
        requestAnimationFrame(attackFront);
    }
}

function attackBack() {
    attackStatus = aguila.updateAttack(); //Hacemos que recorra todos los Frames para dar el efecto de que con un solo tecleo hace un ataque
    if(attackStatus){                     //Mientras no devuelva false se ejecutara todo el ciclo
        requestAnimationFrame(attackBack);
    }
}

function walkFront() {
    walkStatus = aguila.updateWalk();
    if(walkStatus){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(aguila.x >= canvas.width/3){
        bg.update();
        bgLuna.render();
        bgNubes.update();
        aguila.render();
        requestAnimationFrame(walkFront);
        aguila.x = canvas.width/3;
        }else if(aguila.x < canvas.width/3){
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
        if(aguila.x > -100){
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
        if(event.code === "Space"){
            switch(keyPres){
                case 39:
                    aguila.attackFront(weaponImages[selectorWeapon].attackFront,weaponImages[selectorWeapon].width);
                    attackFront()
                    break;
                case 37:
                    aguila.attackBack(weaponImages[selectorWeapon].attackBack,weaponImages[selectorWeapon].width);
                    attackBack();
                    break;
                default:
                    aguila.attackFront(weaponImages[selectorWeapon].attackFront,weaponImages[selectorWeapon].width)
                    attackFront()
                    break;
            }         
        }else if(event.keyCode === 39){
            aguila.walkFront(weaponImages[selectorWeapon].walkFront,weaponImages[selectorWeapon].width);
            walkFront();
            keyPres = 39;
        }else if(event.keyCode === 37){
            aguila.walkBack(weaponImages[selectorWeapon].walkBack,weaponImages[selectorWeapon].width);
            walkBack();
            keyPres = 37;
        }else if(event.shiftKey){
            selectorWeapon ++;
            console.log(selectorWeapon)
            switch(selectorWeapon){
                case 1:
                    if(keyPres == 39){
                        aguila.walkFront(weaponImages[selectorWeapon].walkFront,weaponImages[selectorWeapon].width)
                    }else{
                        aguila.walkFront(weaponImages[selectorWeapon].walkBack,weaponImages[selectorWeapon].width);
                    }
                    break;
                case 2:
                    if(keyPres == 39){
                        aguila.walkFront(weaponImages[selectorWeapon].walkFront,weaponImages[selectorWeapon].width)
                    }else{
                        aguila.walkFront(weaponImages[selectorWeapon].walkBack,weaponImages[selectorWeapon].width);
                    }
                    break;
                default:
                    selectorWeapon = 0;
                    if(keyPres == 39){
                        aguila.walkFront(weaponImages[0].walkFront,weaponImages[selectorWeapon].width);
                    }else{
                        aguila.walkFront(weaponImages[0].walkBack,weaponImages[selectorWeapon].width);
                    }
                    break;
            }
        }
  })

addEventListener("keyup", (event)=>{
    if(event.keyCode === 32){
       //aguila.walk()
    }
  })