class Animacion {
    constructor(options) {
        this.context = options.context;
        this.image = options.image; // Path to image sprite sheet
        this.x = options.x; // Coordinates on canvas
        this.y = options.y;
        this.width = options.width; // Size of sprite frame
        this.height = options.height;
        this.frames = options.frames; // Number of frames in a row
        this.frameIndex = options.frameIndex; // Current frame
        this.row = options.row; // Row of sprites
        this.ticksPerFrame = options.ticksPerFrame; // Speed of animation
        this.tickCount = options.tickCount; // How much time has passed
    }

    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.frames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
                }
        }
    }

    updateWalk(){
        let status = true;
        if(status){
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.frames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                    status = false;
                }
            }
        }
        return status;
    }

    updateAttack(){
        let status = true;
        if(status){
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.frames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                    status = false;
                }
            }
        }
        return status;
    }

    updateSkip(){
        let status = true;
        if(status){
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.frames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                    status = false;
                }
            }
        }
        return status;
    }

    render() {
        this.context.drawImage(
            this.image,
            this.frameIndex * this.width, // The x-axis coordinate of the top left corner
            this.row * this.height, // The y-axis coordinate of the top left corner
            this.width, // The width of the sub-rectangle
            this.height, // The height of the sub-rectangle
            this.x, // The x coordinate
            this.y,// The y coordinate
            this.width, // The width to draw the image
            this.height // The width to draw the image
        );
    }
}


class Background {
    //Metodo para colocar las propiedades o atributos de la clase
    //width y higth son variables que va recibir la clase
    /**
     * 
     * @param {number} w => canvas.width 
     * @param {number} h => canvas.height
     */
    constructor(w,h){
        //las posiciones son parte de los atributos de esta clase
        //x,y,w,h
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.heigth = h;
        //img
        this.image = new Image();
        this.image.src = "../images/Escenario-final.png"
    }

    render(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);
        ctx.drawImage(
            this.image,
            this.x + this.width,
            this.y,
            this.width,
            this.heigth
        )
    }

    //Metodo update
    update(){
        //este metodo se va a ocupar para dibujar
        //hacer un loop infinito para que siempre se vea la imagen
        if(this.x < -canvas.width){
            this.x = 0;
        }
        //hacer que se mueva el background
        this.x --;
        //ctx.drawimage recibe cinco valores por defectto y el primer valor es todo el objeto
        ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);

        //Dibujamos una segunda imagen para un fondo infinito
        ctx.drawImage(
            this.image,
            this.x + this.width,//  coloque la imagen 2 despues de la imagen 1
            this.y,
            this.width,
            this.heigth
        )
    }
}

class Instructions {
    constructor(w,h){
        //las posiciones son parte de los atributos de esta clase
        //x,y,w,h
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.heigth = h;
        //img
        this.image = new Image();
        this.image.src = "../images/bg-instructions.png"
    }

    render(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);
        ctx.drawImage(
            this.image,
            this.x + this.width,
            this.y,
            this.width,
            this.heigth
        )
    }
}


class Nubes {
    constructor(w,h){
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.heigth = h;
        this.image = new Image();
        this.image.src = '../images/Nubes.png';
    }

    render(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);

        ctx.drawImage(
            this.image,
            this.x + this.width, //Colocamos la segunda imagen despues de la primera
            this.y,
            this.width,
            this.heigth
        )
    }

    update(){
        if(this.x < -canvas.width){
            this.x = 0;
        }
        this.x --;

        ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);

        ctx.drawImage(
            this.image,
            this.x + this.width, //Colocamos la segunda imagen despues de la primera
            this.y,
            this.width,
            this.heigth
        )
    }
}

class Luna extends Animacion {
    constructor(x,y,context,w,h,image){
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: w,
            height: h,
            frameIndex: 0,
            row: 0,
            tickCount:0,
            ticksPerFrame: 30,
            frames:2
        });
    }
}


class Aguila extends Animacion {
    
    constructor(x,y,context,w,h,image,health,points){
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: w,
            height: h,
            frameIndex: 0,
            row: 0,
            tickCount:0,
            ticksPerFrame: 2,
            frames:1
        });
        this.vy = 2 //gravity
        this.userPull = 0;
        this.health = health;
        this.points = points;
    }
    
    walkFront(path){
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 8;
        this.width = 379;
        this.image = new Image();
        this.image.src = path;
    }

    walkBack(path) {
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 4;
        this.width = 379;
        this.image = new Image();
        this.image.src = path;
    }

    attackFront(path,w){
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 2;
        this.y = 430;
        this.width = w;
        this.image = new Image();
        this.image.src = path;
    }

    attackBack(path,w){
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 2;
        this.y = 430;
        this.width = w;
        this.image = new Image();
        this.image.src = path;
    }

    skip(path,w){
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 3;
        this.y = 430;
        this.width = w;
        this.image = new Image();
        this.image.src = path;
    }

    renderSkip(){
        this.vy = this.vy + (gravity - this.userPull);
        
        if(this.y >= 430){
            this.userPull = 0;
            this.y = 428;
            this.vy = 2;
        }
        this.y -= this.vy;
        //modificar su "Y" con la gravedad

        this.context.drawImage(
            this.image,
            this.frameIndex * this.width, 
            this.row * this.height, 
            this.width, 
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    renderSkipDown(){
        this.vy = this.vy + (gravity - this.userPull);

        if(this.y >= 430){
            this.userPull = 0;
            this.y = 428;
            this.vy = 2;
        }
        this.y += this.vy;
        //modificar su "Y" con la gravedad

        this.context.drawImage(
            this.image,
            this.frameIndex * this.width, 
            this.row * this.height, 
            this.width, 
            this.height, 
            this.x, 
            this.y,
            this.width, 
            this.height 
        );
    }

    daño(damage){
        this.health = this.health - damage;
        return this.health;
    }

    pointsWin(puntos){
        this.points = this.points +  puntos;
        return this.points;
    }

    collision(item){
        return(
            this.x + 160 < (item.x + 35) + item.width/2 &&
            this.x + 170 > (item.x + 35) &&
            this.y < item.y + item.height &&
            this.y + this.height > item.y
            )   
    }
}

class Enemy {
    constructor(x,y,context,w,h,image,health){
            this.context = context;
            this.image = image;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.frameIndex = 0;
            this.row = 0;
            this.tickCount = 0;
            this.ticksPerFrame = 4;
            this.frames = 5;
            this.health = health;
            this.count = 0;
    }

    walk(path){
        this.image = new Image();
        this.image.src = path;
    }

    attack(path){
        this.image = new Image();
        this.image.src = path;
    }


    update(){
        let status = true;
        if(status){
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.frames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                    status = false;
                }
            }
        }
        return status;
    }

    render(){
        this.count ++;
        if(this.count < 300){
        this.x --;
        this.context.drawImage(
            this.image,
            this.frameIndex * this.width, 
            this.row * this.height, 
            this.width, 
            this.height, 
            this.x, 
            this.y,
            this.width, 
            this.height 
        );
        }else if(this.count >= 300 && this.count < 325){
            this.context.drawImage(
                this.image,
                this.frameIndex * this.width, 
                this.row * this.height, 
                this.width, 
                this.height, 
                this.x, 
                this.y,
                this.width, 
                this.height 
            );
            
        }else{
            this.count = 0;
        }
        return this.count;
    }

    healthEnemy(damage){
        this.health = this.health - damage;
        return this.health;
    }

    collision(item){
        return(
            this.x + 155 < (item.x + 35) + item.width/2 &&
            this.x + 180 > (item.x + 35) &&
            this.y < item.y + item.height &&
            this.y + this.height > item.y
            )
    }

}


class Arrow {
    constructor(x,y,path,damage){
        this.x = x;
        this.y = y;
        this.width = 170;
        this.height = 32;
        this.path = path;
        this.damage = damage;
        this.image = new Image();
        this.image.src = this.path;
    }

    updateArrowFront(){
        this.x += 4;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    updateArrowBack(){
        this.x -= 4;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    collision(item){
        return(
            this.x + 35 < (item.x + 155) + item.width/2 &&
            this.x + 135 > (item.x + 155) &&
            this.y < item.y + item.height &&
            this.y + this.height > item.y
            )
    }
}

class Spears {
    constructor(x,y,path,damage){
        this.x = x;
        this.y = y;
        this.width = 170;
        this.height = 32;
        this.path = path;
        this.damage = damage;
        this.image = new Image();
        this.image.src = this.path;
    }

    updateSpearFront(){
        this.x += 4;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    updateSpearBack(){
        this.x -= 4;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Macuahuitl {
    constructor(x,y,path,damage){
        this.x = x;
        this.y = y;
        this.width = 170;
        this.height = 32;
        this.path = path;
        this.damage = damage;
        this.image = new Image();
        this.image.src = this.path;
    }

    updateMacuahuitlFront(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    updateMacuahuitlBack(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Weapon extends Animacion{
    constructor(x,y,context,w,h,image){
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: w,
            height: h,
            frameIndex: 0,
            row: 0,
            tickCount:0,
            ticksPerFrame: 30,
            frames: 1
        });
    }

    macuahuitl(){
        this.row = 0;
    }

    arrow(){
        this.row = 1;
    }

    spear(){
        this.row = 2;
    }

}

class HealthWarrior extends Animacion {
    constructor(x,y,context,w,h,image){
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: w,
            height: h,
            frameIndex: 0,
            row: 0,
            tickCount:0,
            ticksPerFrame: 30,
            frames: 1
        });
    }

    healthFull(){
        this.row = 0;
    }

    healthH6(){
        this.row = 1;
    }

    healthH5(){
        this.row = 2;
    }

    healthH4(){
        this.row = 3;
    }

    healthH3(){
        this.row = 4;
    }

    healthH2(){
        this.row = 5;
    }

    healthH1(){
        this.row = 6;
    }

    healthH0(){
        this.row = 7;
    }
}

class GameOver extends Animacion {
    constructor(x,y,context,w,h,image){
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: w,
            height: h,
            frameIndex: 0,
            row: 0,
            tickCount:0,
            ticksPerFrame: 30,
            frames: 1
        });
    }
}
