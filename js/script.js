const image = new Image();
image.src = "../images/walk-front.png";
const bgImage = new Image();
const imageLuna = new Image();
imageLuna.src = "../images/Luna.png";
const imgWeapon = new Image();
imgWeapon.src = "../images/seleccion-de-arma.png";
const imgHealth = new Image();
imgHealth.src = "../images/health.png"
const bg = new Background(canvas.width,canvas.height)
const bgLuna = new Luna(-250,-250,ctx,641,636,imageLuna);
const bgNubes = new Nubes(canvas.width, canvas.height);
const aguila = new Aguila(-100,430,ctx,379,160,image,210,0);
const weapon = new Weapon(20,650,ctx,96,35,imgWeapon)
const healthWarrior = new HealthWarrior(10,10,ctx,180,22,imgHealth);

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
    generaEnemies();
    if(arrEnemies.length > 0){
        drawEnemies();
    } 
    if(arrArrowEnemy.length > 0){
        drawArrowBackEnemy();
    }
    weapon.render();
    healthWarrior.render();
    drawPoints();
    if(requestId){
        requestAnimationFrame(updateGame);
    }
}

function gameOver(){
    console.log("Se murio")
    requestId = false;
}

function attackFront() {
    if(requestId){
        attackStatus = aguila.updateAttack(); //Hacemos que recorra todos los Frames para dar el efecto de que con un solo tecleo hace un ataque
        if(attackStatus){                    //Mientras no devuelva false se ejecutara todo el ciclo              
               requestAnimationFrame(attackFront);
        }
    }
}

function attackBack() {
    if(requestId){
        attackStatus = aguila.updateAttack(); //Hacemos que recorra todos los Frames para dar el efecto de que con un solo tecleo hace un ataque
        if(attackStatus){                     //Mientras no devuelva false se ejecutara todo el ciclo
            requestAnimationFrame(attackBack);
        }
    }
}

function generaArrowFront(){
    const arrowFront = new Arrow(aguila.x + 170, aguila.y + 50,"../images/flecha-front.png",30);
    arrArrowFront.push(arrowFront);
}

function generaSpearFront(){
    const spearFront = new Spears(aguila.x + 170, aguila.y + 22, "../images/lanza-front.png",40)
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

function generaArrowBackEnemy(enemie){
    const arrowEnemyBack = new Arrow(enemie.x-50,enemie.y + 62,"../images/arrow-enemy.png",30);
    arrArrowEnemy.push(arrowEnemyBack);
}

function generaSpearBack(){
    const spearFront = new Spears(aguila.x + 30, aguila.y + 23, "../images/lanza-back.png",40)
    arrSpearBack.push(spearFront);
}

function generaMacuahuitlBack(){
    const macuahuitlBack = new Macuahuitl(aguila.x + 30, aguila.y + 50, "../images/macuahuitl-back-attack.png", 50)
    arrMacuahuitlBack.push(macuahuitlBack);
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

function drawArrowBackEnemy(){
    arrArrowEnemy.forEach((flecha, flecha_index) => {
        if(flecha.x < -100){
            arrArrowEnemy.splice(flecha_index,1);
        }
        if(aguila.collision(flecha)){
            arrArrowEnemy.splice(flecha_index,1);
            let daño = aguila.daño(flecha.damage)
            if(daño <= 0){
                healthWarrior.healthH0();
                gameOver()
            }else{
                switch(daño){
                    case 180:
                        healthWarrior.healthH6();
                        break;
                    case 150:
                        healthWarrior.healthH5();
                        break;
                    case 120:
                        healthWarrior.healthH4();
                        break;
                    case 90:
                        healthWarrior.healthH3();
                        break;
                    case 60:
                        healthWarrior.healthH2();
                    case 30:
                        healthWarrior.healthH1();
                }
            }
        }else{
            flecha.updateArrowBack();
        }
        
    })
    console.log(statusCollition);
}


//Vamos a generar enemigos

function generaEnemies(){
    if((frames % 100 === 0) && statusEnemies){
        const enemyImg = new Image();
        enemyImg.src =  "../images/enemy-walk_v2.png";
        let health = Math.floor(Math.random()*150);
        const enemie = new Enemy(canvas.width,455,ctx,380,130,enemyImg,health);
        arrEnemies.push(enemie);
      } 
      return true;
}


//Dibujamos a los enemigos
function drawEnemies(){
    arrEnemies.forEach((enemie, enemie_index)=> {
        if(enemie.x < -250 || enemie.health < 0){
            arrEnemies.splice(enemie_index,1)
        }
        let count = enemie.render();
        if(count < 300){
            enemie.walk("../images/enemy-walk_v2.png");
            if(arrArrowFront.length > 0){
                arrArrowFront.forEach((arrowFront, index_arrowFront)=> {
                    if(enemie.collision(arrowFront)){
                        arrArrowFront.splice(index_arrowFront,1)
                        let daño = enemie.healthEnemy(arrowFront.damage);
                        if(daño <= 0){
                            arrEnemies.splice(enemie_index,1);
                            points = aguila.pointsWin(30);
                        }else{
                            console.log("Se daño al enemigo con flecha caminando y tiene una salud de:", daño);
                        }
                    }else{
                        enemie.update();
                    }
                })
            }else if(arrSpearFront.length > 0){
                arrSpearFront.forEach((spearFront, index_spearFront) => {
                    if(enemie.collision(spearFront)){
                        arrSpearFront.splice(index_spearFront,1);
                        let daño = enemie.healthEnemy(spearFront.damage);
                        if(daño <= 0){
                            arrEnemies.splice(enemie_index,1);
                            points = aguila.pointsWin(40);
                        }else {
                            console.log("Se daño al enemigo con lanza caminando y tiene una salud de:", daño);
                        }
                    }else{
                        enemie.update();
                    }
                })
            }else if(arrMacuahuitlFront.length == 1){
                arrMacuahuitlFront.forEach((macFront,index_macFront)=>{
                    if(enemie.collision(macFront)){
                        arrMacuahuitlFront.splice(index_macFront);
                        let daño = enemie.healthEnemy(macFront.damage);
                        if(daño <= 0){
                            arrEnemies.splice(enemie_index,1);
                            points = aguila.pointsWin(50);
                        }else{
                            console.log("Se daño al enemigo con macahuitl caminando y tiene una salud de:", daño);
                        }
                    }else{
                        enemie.update();
                    }
                })
            }else{
                enemie.update();
            }  
        }else{
            enemie.attack("../images/enemigo-arco_v2.png");
            enemie.update();
            if(count >= 323 && count < 324){
            generaArrowBackEnemy(enemie);
            }
        }
    })
}

function drawPoints(){
    ctx.font = "bold 32px serif";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillStyle = "black";
    ctx.fillText(`Points: ${points}`,205,30)
}


function walkFront() {
    walkStatus = aguila.updateWalk();
    if(walkStatus){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(aguila.x >= canvas.width/3.5){
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
            if(arrEnemies.length > 0){
                drawEnemies();
            } 
            if(arrArrowEnemy.length > 0){
                drawArrowBackEnemy();
            }
            weapon.render();
            healthWarrior.render();
            drawPoints();
            if(requestId){
                requestAnimationFrame(walkFront);
            }
            aguila.x = canvas.width/3.5;
        }else if(aguila.x < canvas.width/3.5){
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
            if(arrEnemies.length > 0){
                drawEnemies();
            } 
            if(arrArrowEnemy.length > 0){
                drawArrowBackEnemy();
            }
            weapon.render();
            healthWarrior.render();
            drawPoints();
            if(requestId){
                requestAnimationFrame(walkFront);
            }
            aguila.x ++;
        }   
    }
    
}

function walkBack() {
    walkBackStatus = aguila.updateWalk();
    if(walkBackStatus){
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
            if(arrEnemies.length > 0){
                drawEnemies();
            } 
            if(arrArrowEnemy.length > 0){
                drawArrowBackEnemy();
            }
            weapon.render();
            healthWarrior.render();
            drawPoints();
            if(requestId){
                requestAnimationFrame(walkBack);
            }
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
            if(arrEnemies.length > 0){
                drawEnemies();
            } 
            if(arrArrowEnemy.length > 0){
                drawArrowBackEnemy();
            }
            weapon.render();
            healthWarrior.render();
            drawPoints();
            if(requestId){
                requestAnimationFrame(walkBack);
            }
        }
    }
}

function skipFront(){
    skipStatus = aguila.updateSkip();
    if(skipStatus){
        if(requestId){
            requestAnimationFrame(skipFront)
        }
    }
}

function skipDown(){
    aguila.renderSkipDown();
    if(aguila.y < 430){
        if(requestId){
            requestAnimationFrame(skipDown);
        }
    }
}

function skipUp(){
    aguila.renderSkip();
    if(aguila.y > 240){
        if(requestId){
            requestAnimationFrame(skipUp);
        }
    }else{
        skipDown();
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
            if(!walkStatus){
            walkFront();
            }
            if(arrEnemies.length < 5){
                statusEnemies = true;
            }else {
                statusEnemies = false;
                console.log(arrEnemies.length)
            }
            keyPres = 39;
        }else if(event.keyCode === 38){
            aguila.skip(weaponImages[selectorWeapon].skipFront,weaponImages[selectorWeapon].width);
            skipFront();
            aguila.userPull = 0.1;
            skipUp();
        }else if(event.keyCode === 37){
            aguila.walkBack(weaponImages[selectorWeapon].walkBack,weaponImages[selectorWeapon].width);
            if(!walkBackStatus){
                walkBack();
            }
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
                    weapon.arrow();
                    break;
                case 2:
                    if(keyPres == 39){
                        aguila.walkFront(weaponImages[selectorWeapon].walkFront,weaponImages[selectorWeapon].width)
                    }else{
                        aguila.walkFront(weaponImages[selectorWeapon].walkBack,weaponImages[selectorWeapon].width);
                    }
                    weapon.spear();
                    break;
                default:
                    selectorWeapon = 0;
                    if(keyPres == 39){
                        aguila.walkFront(weaponImages[0].walkFront,weaponImages[selectorWeapon].width);
                    }else{
                        aguila.walkFront(weaponImages[0].walkBack,weaponImages[selectorWeapon].width);
                    }
                    weapon.macuahuitl();
                    break;
            }
        }
  })

addEventListener("keyup", (event)=>{
    if(event.keyCode === 39){
       statusEnemies = false;
    }
  })