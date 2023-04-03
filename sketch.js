const tamCelda = 50;
const url_image_rover = "https://i.ibb.co/XFj3bCR/microrove.png";

//Variable para guardar la imagen del robot;
let img_rover;

//corre solo una vez cuando inicia el programa
function setup() {
  console.log("setup - frameCount:" + frameCount);

  //Cargamos la imagen
  img_rover = loadImage(url_image_rover);

  //createCanvas: ancho, alto en píxeles
  createCanvas(800, 800);

  //Creamos tablero y lo dibujamos
  tablero = new Tablero();
  tablero.dibujar();

  r1 = new Robot(0, 0);
  r2 = new Robot(0, 1);
}

//corre continuamente después de la función setup
function draw() {
  console.log("draw - frameCount:" + frameCount);
  clear();
  tablero.dibujar();

  r1.dibujar();
  r2.dibujar();
  //instrucciones a ejecutar en bucle
}

function mover() {
  r1.mover(0, 1);
  r2.mover(1, 0);
}
setInterval(mover, 1000);

class Tablero {
  constructor() {
    this.celdas = [];
    this.robots = [];
    this.obstaculos = []; // array de obstáculos

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.celdas.push(new Celda(i, j));
      }
    }
  }

  dibujar() {
    this.celdas.forEach(celda => celda.dibujar());
  }

  esCeldaBloqueada(x, y) {
    return this.robots.some(robot => robot.x == x && robot.y == y) || this.obstaculos.some(obstaculo => obstaculo.x == x && obstaculo.y == y);
  }
}


class Obstaculo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  dibujar() {
    let tam = tamCelda;
    let x = (this.x * tamCelda);
    let y = (this.y * tamCelda);
    fill(255, 0, 0);
    stroke(0);
    rect(x, y, tamCelda, tamCelda);
  }
}

class Celda {
  constructor(x, y) {
    this.color = (x + y) % 2 == 0 ? 255 : 0;
    this.x = x;
    this.y = y;
  }

  dibujar() {
    let x = this.x * tamCelda;
    let y = this.y * tamCelda;
    fill(this.color);
    stroke(0);
    rect(x, y, tamCelda, tamCelda);
  }
}

class Robot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ruta = [];
  }

  dibujar() {
    // Dibuja el robot en la posición actual
    let tam = tamCelda;
    let x = (this.x * tamCelda);
    let y = (this.y * tamCelda);
    image(img_rover, x, y, tam, tam);
  }

  mover(dx, dy) {
    // Actualiza las coordenadas del robot según el desplazamiento especificado
    let newX = this.x + dx;
    let newY = this.y + dy;

    // Comprueba que la nueva posición está dentro del tablero
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      this.x = newX;
      this.y = newY;
    }
  }

  buscarRuta(destX, destY) {
    // Algoritmo de búsqueda de ruta
    // Actualiza el arreglo this.ruta con la secuencia de movimientos a realizar
    // para llegar a la celda (destX, destY)
  }

  seguirRuta() {
    if (this.ruta.length > 0) {
      let [dx, dy] = this.ruta.shift();
      this.mover(dx, dy);
    }
  }
}
