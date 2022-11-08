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
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    bg.render();
    bgLuna.render();
    bgNubes.render();
    aguila.render();
    if(arrArrowFront.length > 0){
        drawArrowFront();
    }
    if(arrArrowBack.length > 0){
        drawArrowBack();
    }
    if(arrSpearFront.length > 0){
        drawSpearFront();
    }
    if(arrSpearBack.length > 0){
        drawSpearBack();
    }
    if(arrMacuahuitlFront.length > 1){
            drawMacuahuitlFront();
    } 
    if(arrMacuahuitlBack.length > 1){
        drawMacuahuitlBack();
    }
    console.log("me estoy ejecutando")
    if(requestId){
        requestAnimationFrame(updateGame);
    }
}

function attackFront() {
    attackStatus = aguila.updateAttack(); //Hacemos que recorra todos los Frames para dar el efecto de que con un solo tecleo hace un ataque
    if(attackStatus){                    //Mientras no devuelva false se ejecutara todo el ciclo              
        requestAnimationFrame(attackFront);
    }
}

function attackBack() {
    attackStatus = aguila.updateAttack(); //Hacemos que recorra todos los Frames para dar el efecto de que con un solo tecleo hace un ataque
    if(attackStatus){                     //Mientras no devuelva false se ejecutara todo el ciclo
        requestAnimationFrame(attackBack);
    }
}

function generaArrowFront(){
    const arrowFront = new Arrow(aguila.x + 170, aguila.y + 50,"../images/flecha-front.png",30);
    arrArrowFront.push(arrowFront);
}

function generaSpearFront(){
    const spearFront = new Spears(aguila.x + 170, aguila.y + 23, "../images/lanza-front.png",40)
    arrSpearFront.push(spearFront);
}

function generaMacuahuitlFront(){
    const macuahuitlFront = new Macuahuitl(aguila.x + 180, aguila.y + 50, "../images/macuahuitl-front.png", 50)
    arrMacuahuitlFront.push(macuahuitlFront);
}

function drawArrowFront(){
    arrArrowFront.forEach((flecha, flecha_index )=>{
        if(flecha.x > canvas.width){
            arrArrowFront.splice(flecha_index,1);
        }
        flecha.updateArrowFront();
    })
}

function drawSpearFront(){
    arrSpearFront.forEach((spear, spear_index) => {
        if(spear.x > canvas.width){
            arrSpearFront.splice(spear_index,1)
        }
        spear.updateSpearFront();
    })
}

function drawMacuahuitlFront(){
    arrMacuahuitlFront.forEach((mac, mac_index) => {
        if(arrMacuahuitlFront.length > 1){
            arrMacuahuitlFront.splice(mac)
        }
        mac.updateMacuahuitlFront();
    })
}

function generaArrowBack(){
    const arrowBack = new Arrow(aguila.x + 30, aguila.y + 50,"../images/flecha-back.png",30);
    arrArrowBack.push(arrowBack);
}

function generaSpearBack(){
    const spearFront = new Spears(aguila.x + 30, aguila.y + 23, "../images/lanza-back.png",40)
    arrSpearBack.push(spearFront);
}

function generaMacuahuitlBack(){
    const macuahuitlBack = new Macuahuitl(aguila.x + 40, aguila.y + 50, "../images/macuahuitl-back-attack.png", 50)
    arrMacuahuitlBack.push(macuahuitlBack);
    console.log("Macuahuitl aqui estoy")
    console.table(arrMacuahuitlBack)
}

function drawArrowBack(){
    arrArrowBack.forEach((flecha, flecha_index) => {
        if(flecha.x < -100){
            arrArrowBack.splice(flecha_index,1);
        }
        flecha.updateArrowBack();
    })
}

function drawSpearBack(){
    arrSpearBack.forEach((spear, spear_index) => {
        if(spear.x < -100){
            arrSpearBack.splice(spear_index,1);
        }
        spear.updateSpearBack();
    })
}

function drawMacuahuitlBack(){
    arrMacuahuitlBack.forEach((mac) => {
        if(arrMacuahuitlBack.length > 1){
            arrMacuahuitlBack.splice(mac)
        }
        mac.updateMacuahuitlBack();
    })
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
            if(arrArrowFront.length > 0){
                drawArrowFront();
            }
            if(arrSpearFront.length > 0){
                drawSpearFront();
            }
            requestAnimationFrame(walkFront);
            aguila.x = canvas.width/3;
        }else if(aguila.x < canvas.width/3){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            bg.render();
            bgLuna.render();
            bgNubes.render();
            aguila.render(); 
            if(arrArrowFront.length > 0){
                drawArrowFront();
            }
            if(arrSpearFront.length > 0){
                drawSpearFront();
            }
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
            if(arrArrowBack.length > 0){
                drawArrowBack();
            }
            if(arrSpearBack.length > 0){
                drawSpearBack();
            }
            requestAnimationFrame(walkBack);
            aguila.x --;
        }else if(aguila.x <= 0){
            bg.render();
            bgLuna.render();
            bgNubes.render();
            aguila.render();
            if(arrArrowBack.length > 0){
                drawArrowBack();
            }
            if(arrSpearBack.length > 0){
                drawSpearBack();
            }
            requestAnimationFrame(walkBack);
        }
    }
}


addEventListener("keydown", (event)=>{
        if(event.code === "Space"){
            switch(keyPres){
                case 39:
                    aguila.attackFront(weaponImages[selectorWeapon].attackFront,weaponImages[selectorWeapon].width);
                    if(selectorWeapon === 1){
                        generaArrowFront();
                    }else if(selectorWeapon === 2){
                        generaSpearFront();
                    }else{
                        generaMacuahuitlFront();
                    }
                    attackFront()
                    break;
                case 37:
                    aguila.attackBack(weaponImages[selectorWeapon].attackBack,weaponImages[selectorWeapon].width);
                    if(selectorWeapon === 1){
                        generaArrowBack();
                    }else if(selectorWeapon === 2){
                        generaSpearBack();
                    }else{
                        generaMacuahuitlBack();
                    }
                    attackBack();
                    break;
                default:
                    aguila.attackFront(weaponImages[selectorWeapon].attackFront,weaponImages[selectorWeapon].width)
                    if(selectorWeapon === 1){
                        generaArrowFront();
                    }else if(selectorWeapon === 2){
                        generaSpearFront();
                    }
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