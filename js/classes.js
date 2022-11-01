class Sprite {
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
     * @param {number} h 
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
        this.image.src = "../images/bg.png"
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

class Aguila extends Sprite {
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
            frames:4
        });
    }

    attack() {
        this.frames = 3;
        this.frameIndex = 0;
        this.row = 1;
        this.ticksPerFrame = 2;
    }
}
