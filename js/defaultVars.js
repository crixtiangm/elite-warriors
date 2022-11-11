const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let frames = 0;
let requestId;
let points = 0;

const arrArrowFront = [];
const arrArrowBack = [];
const arrSpearFront = [];
const arrSpearBack = [];
const arrMacuahuitlFront = [];
const arrMacuahuitlBack = [];

const arrEnemies = [];
const arrArrowEnemy = [];
let statusEnemies = false;

let positionJugador;

const gravity = 0.1;

//Variables para caminar y atacar

let attackStatus = true; //Variable para el estatus del ataque
let skipStatus = true; //variable para el estatus del salto
let walkStatus = false; //Variabel que inica la accion del personaje
let walkBackStatus = false;
let keyPres = 39; //Variable que inicia el juego atacando hacia delante

let selectorWeapon = 0;

let statusSkip = false;

let statusCollition = 0;

const weaponImages = [{
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
    },
    skipFront: "../images/salto-macuahuitl.png"
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
    },
    skipFront: '../images/salto-arco.png'
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
    },
    skipFront: '../images/salto-lanza.png'
}];
