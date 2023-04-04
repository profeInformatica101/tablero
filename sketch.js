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
  // Ejemplo de cómo agregar obstáculos al tablero
tablero.generarLaberinto();

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
    this.obstaculos.forEach(obstaculo => obstaculo.dibujar()); // Asegúrate de que esta línea esté presente
  }
  esCeldaBloqueada(x, y) {
    return this.robots.some(robot => robot.x == x && robot.y == y) || this.obstaculos.some(obstaculo => obstaculo.x == x && obstaculo.y == y);
  }

  agregarObstaculo(x, y) {
    this.obstaculos.push(new Obstaculo(x, y));
  }

  generarLaberinto() {
    const probabilidadObstaculo = 0.25; // Ajusta la probabilidad de tener obstáculos en el tablero (0 a 1)
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (Math.random() < probabilidadObstaculo) {
          // Asegúrate de no colocar obstáculos en las posiciones iniciales de los robots
          if (!((i === 0 && j === 0) || (i === 0 && j === 1))) {
            this.agregarObstaculo(i, j);
          }
        }
      }
    }
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
    this.angulo = 0; // Agrega un atributo angulo para controlar la rotación de la imagen
  }

  dibujar() {
    // Dibuja el robot en la posición actual
    let tam = tamCelda;
    let x = (this.x * tamCelda);
    let y = (this.y * tamCelda);
    push();
    translate(x + tam / 2, y + tam / 2);
    rotate(radians(this.angulo));
    image(img_rover, -tam / 2, -tam / 2, tam, tam);
    pop();
  }
  detectarObstaculo(dx, dy) {
    let newX = this.x + dx;
    let newY = this.y + dy;
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && tablero.esCeldaBloqueada(newX, newY)) {
      return true;
    }
    return false;
  }
  mover(dx, dy) {
    let obstaculoDetectado = false;
    do {
      let newX = this.x + dx;
      let newY = this.y + dy;
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && !tablero.esCeldaBloqueada(newX, newY)) {
        // No hay obstáculo, avanzamos en la dirección especificada
        this.x = newX;
        this.y = newY;
        obstaculoDetectado = false;
      } else {
        // Hay un obstáculo, giramos 90 grados y comprobamos de nuevo
        [dx, dy] = [dy, -dx];
        this.angulo += 90;
        obstaculoDetectado = true;
      }
    } while (obstaculoDetectado);
  }mover(dx, dy) {
    let obstaculoDetectado = false;
    do {
      let newX = this.x + dx;
      let newY = this.y + dy;
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && !tablero.esCeldaBloqueada(newX, newY)) {
        // No hay obstáculo, avanzamos en la dirección especificada
        this.x = newX;
        this.y = newY;
        obstaculoDetectado = false;
      } else {
        // Hay un obstáculo, giramos 90 grados y comprobamos de nuevo
        [dx, dy] = [dy, -dx];
        this.angulo += 90;
        obstaculoDetectado = true;
      }
    } while (obstaculoDetectado);
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
