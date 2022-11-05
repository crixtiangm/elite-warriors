const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let requestId;

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
    width: 379
},
{
    walkFront: '../images/arco-walk-front.png',
    walkBack: '../images/arco-walk-back.png',
    attackFront: '../images/Arco-Front.png',
    attackBack: '../images/Arco-Back.png',
    width: 379
},
{
    walkFront: '../images/lanza-walk-front.png',
    walkBack: '../images/lanza-walk-back.png',
    attackFront: '../images/attack-lanza-front.png',
    attackBack: '../images/attack-lanza-back.png',
    width:379
}];
