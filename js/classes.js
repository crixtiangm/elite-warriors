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
        this.image = new Image();//Mando a llamar la clase nativa de image
        //Image = {src:"", onload()...}
        //../ salimos un nivel
        //./ en el mismo nivel
        this.image.src = "../images/Escenario-final.png"
    }

    render(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);
        ctx.drawImage(
            this.image,
            this.x + this.width,//  coloque la imagen 2 despues de la imagen 1
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

/*
class Aguila {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        // Image 
        this.image = new Image();
        this.image.src = "../images/Guerrero-Aguila.png"
    }

    update(){
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}*/

class Aguila extends Animacion {
    
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
            ticksPerFrame: 2,
            frames:1
        });
    }
    

    walk(path) {
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 8;
        this.width = 150;
        this.image = new Image();
        this.image.src = path;
    }

    walkArco() {
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 8;
        this.width = 150;
        this.image = new Image();
        this.image.src = '../images/arco-walk-front.png';
    }
    walkFront(path){
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 8;
        this.width = 150;
        this.image = new Image();
        this.image.src = path;
    }

    walkBack(path) {
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 4;
        this.width = 150;
        this.image = new Image();
        this.image.src = path;//'../images/walk-back.png';
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

    walkArcoBack() {
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 4;
        this.width = 150;
        this.image = new Image();
        this.image.src = '../images/arco-walk-back.png';
    }

    macuahuitl() {
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 2;
        this.y = 430;
        this.width = 160;
        this.image = new Image();
        this.image.src = '../images/macuahuitl.png';
    }

    macuahuitlBack() {
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 2;
        this.y = 430;
        this.width = 160;
        this.image = new Image();
        this.image.src = '../images/macuahuitl-back.png';
    }

    arco(){
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 2;
        this.y = 430;
        this.width = 240;
        this.image = new Image();
        this.image.src = '../images/Arco-Front.png' 
    }

    arcoBack() {
        this.frames = 5;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 2;
        this.y = 430;
        this.width = 240;
        this.image = new Image();
        this.image.src = '../images/Arco-Back.png'
    }
}
