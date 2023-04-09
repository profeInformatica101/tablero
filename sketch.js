const tamCelda = 50;
let rutaEncontrada = false;
const url_image_rover = "https://raw.githubusercontent.com/profeInformatica101/tablero/main/robot/rover.png";
//Variable para guardar la imagen del robot;
let img_rover;

//corre solo una vez cuando inicia el programa
function setup() {
  console.log("setup - frameCount:" + frameCount);
  frameRate(1); // Establecer el número de cuadros por segundo en 1

  //Cargamos la imagen
  img_rover = loadImage(url_image_rover);

  //createCanvas: ancho, alto en píxeles
  createCanvas(800, 800);

  //Creamos tablero y lo dibujamos
  tablero = new Tablero();
  // Ejemplo de cómo agregar obstáculos al tablero
  //tablero.generarLaberinto();
  //tablero.agregarObstaculo(0,2);
  //tablero.agregarObstaculo(1,6);
  tablero.agregarObstaculo(3,7);
  tablero.agregarObjetivo(5, 0); // Agregar un objetivo en la posición (7, 0)
  tablero.dibujar();

 // r1 = new Robot(0, 7);
  
  r1 = new Robot(5, 7);
}

//corre continuamente después de la función setup
function draw() {
  //console.log("draw - frameCount:" + frameCount);
  clear();
  tablero.dibujar();
  r1.dibujar();
  if (!objetivoAlcanzado(r1)) {
    movimientos(r1);
  } else {
    console.log("Objetivo alcanzado");
   // alert("Objetivo alcanzado");
  }


}

function objetivoAlcanzado(robot) {
  return robot.x === tablero.objetivo.x && robot.y === tablero.objetivo.y;
}

function movimientos(robot) {
 /** if (robot.estaBloqueado()) {
    console.log("girar");
    robot.girarIzquierda();
  } else {
    robot.moverCelda(1);
  }
  */
 robot.moverCelda(1);
}


/**
 * ##############
 * # Tablero #
 * ##############
 *
 * La clase Tablero representa el tablero del juego.
 * Contiene un arreglo de Celdas, Robots, Obstáculos y un Objetivo.
 */
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
    this.objetivo.dibujar();
  }
  esCeldaBloqueada(x, y) {
    return this.robots.some(robot => robot.x == x && robot.y == y) || this.obstaculos.some(obstaculo => obstaculo.x == x && obstaculo.y == y);
  }

  agregarObstaculo(x, y) {
    this.obstaculos.push(new Obstaculo(x, y));
  }

  agregarObjetivo(x, y) {
    this.objetivo = new Objetivo(x, y);
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

class Objetivo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  dibujar() {
    let tam = tamCelda;
    let x = (this.x * tamCelda);
    let y = (this.y * tamCelda);
    fill(0, 0, 255);
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
    console.log("Angulo:"+this.angulo);
     // Rotar la imagen según los grados especificados
    if (this.angulo == 90) {
      rotate(HALF_PI);
    } else if (this.angulo == 180) {
      rotate(PI);
    } else if (this.angulo == 270) {
      rotate(-HALF_PI);
    } else {
      rotate(0);
    }
    image(img_rover, -tam / 2, -tam / 2, tam, tam);
    pop();
  }
  estaBloqueado() {
    let dx, dy;
  
    if (this.angulo == 90) {
      dx = 1;
      dy = 0;
    } else if (this.angulo == 180) {
      dx = 0;
      dy = 1;
    } else if (this.angulo == 270) {
      dx = -1;
      dy = 0;
    } else {
      dx = 0;
      dy = -1;
    }

    let newX = this.x + dx;
    let newY = this.y + dy;

    return (newX < 0 || newX >= 8 || newY < 0 || newY >= 8 || tablero.esCeldaBloqueada(newX, newY));
  }

  moverCelda(n) {
    let dx, dy;
  
    // Calcular el desplazamiento en función del ángulo actual
    if (this.angulo == 90) {
      dx = n;
      dy = 0;
    } else if (this.angulo == 180) {
      dx = 0;
      dy = n;
    } else if (this.angulo == 270) {
      dx = -n;
      dy = 0;
    } else {
      dx = 0;
      dy = -n;
    }
  
      this.mover(dx, dy);
    
  }

  girarDerecha(){
    this.angulo = (this.angulo + 90)%360;
  }
  girarIzquierda(){
    this.angulo = (this.angulo + 270)%360;
  }
  mover(dx, dy) {
      let newX = this.x + dx;
      let newY = this.y + dy;
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && !tablero.esCeldaBloqueada(newX, newY)) {
        // No hay obstáculo, avanzamos en la dirección especificada
        this.x = newX;
        this.y = newY;
        console.log(this.x + ","+this.y);
      }else{
        console.log("Bloqueado");
      } 
  }

  buscarRuta(destX, destY) {
    const openSet = [];
    const closedSet = [];
    const startNode = {
      x: this.x,
      y: this.y,
      gCost: 0,
      hCost: this.distanciaManhattan(this.x, this.y, destX, destY),
      parent: null,
    };
    startNode.fCost = startNode.gCost + startNode.hCost;
    openSet.push(startNode);
  
    while (openSet.length > 0) {
      let currentNode = openSet[0];
      let currentIndex = 0;
  
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].fCost < currentNode.fCost) {
          currentNode = openSet[i];
          currentIndex = i;
        }
      }
  
      if (currentNode.x === destX && currentNode.y === destY) {
        this.ruta = [];
        let temp = currentNode;
        while (temp.parent) {
          this.ruta.unshift([temp.parent.x - temp.x, temp.parent.y - temp.y]);
          temp = temp.parent;
        }
        return;
      }
  
      openSet.splice(currentIndex, 1);
      closedSet.push(currentNode);
  
      const vecinos = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
      ];
  
      for (const vecino of vecinos) {
        const x = currentNode.x + vecino.dx;
        const y = currentNode.y + vecino.dy;
  
        if (x < 0 || x >= 8 || y < 0 || y >= 8 || tablero.esCeldaBloqueada(x, y)) {
          continue;
        }
  
        const existingNode = closedSet.find((node) => node.x === x && node.y === y);
        if (existingNode) {
          continue;
        }
  
        const gCost = currentNode.gCost + 1;
        let neighborNode = openSet.find((node) => node.x === x && node.y === y);
  
        if (!neighborNode) {
          neighborNode = {
            x,
            y,
            parent: currentNode,
            gCost,
            hCost: this.distanciaManhattan(x, y, destX, destY),
          };
          neighborNode.fCost = neighborNode.gCost + neighborNode.hCost;
          openSet.push(neighborNode);
        } else if (gCost < neighborNode.gCost) {
          neighborNode.parent = currentNode;
          neighborNode.gCost = gCost;
          neighborNode.fCost = neighborNode.gCost + neighborNode.hCost;
        }
      }
    }
  }
  

  seguirRuta() {
    if (this.ruta.length > 0) {
      let [dx, dy] = this.ruta.shift();
      this.mover(dx, dy);
    }
  }
}
