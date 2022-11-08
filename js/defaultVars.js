const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let frames = 0;
let requestId;

let arrArrowFront = [];
let arrArrowBack = [];
let arrSpearFront = [];
let arrSpearBack = [];
let arrMacuahuitlFront = [];
let arrMacuahuitlBack = [];


//Variables para caminar y atacar

let attackStatus = true; //Variable para el estatus del ataque
let walkStatus = true; //Variabel que inica la accion del personaje
let keyPres = 39; //Variable que inicia el juego atacando hacia delante

let selectorWeapon = 0;

let weaponImages = [{
    walkFront: '../images/walk-front.png',
    walkBack: '../images/walk-back.png',
    attackFront: '../images/macuahuitl.png',
    attackBack: '../images/macuahuitl-back.png',
    width: 379,
    weapon: {
        width: 100,
        height: 25,
        damage:50,
        macuahuitlFront: "../images/macuahuitl-front.png",
        macuahuitlBack: "../images/macuahuitl-back-attack.png"
    }
},
{
    walkFront: '../images/arco-walk-front.png',
    walkBack: '../images/arco-walk-back.png',
    attackFront: '../images/Arco-Front.png',
    attackBack: '../images/Arco-Back.png',
    width: 379,
    weapon: {
        width: 100,
        height:15,
        damage: 30,
        arrowFront:"../images/flecha-front.png",
        arrowBack: "../images/flecha-back.png"
    }
},
{
    walkFront: '../images/lanza-walk-front.png',
    walkBack: '../images/lanza-walk-back.png',
    attackFront: '../images/attack-lanza-front.png',
    attackBack: '../images/attack-lanza-back.png',
    width:379,
    weapon:{
        width: 170,
        height: 32,
        spearFront:"../images/lanza-front.png",
        spearBack:"../images/lanza-back.png"
    }
}];
