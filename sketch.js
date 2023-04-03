const tamCelda = 50;
const url_image_rover = "https://i.ibb.co/XFj3bCR/microrove.png";

//Variable para guardar la imagen del robot;
let img_rover;

//corre solo una vez cuando inicia el programa
function setup(){
    console.log("setup - frameCount:"+frameCount);
    
    //Cargamos la imagen
    img_rover = loadImage(url_image_rover);
    
    //createCanvas: ancho, alto en píxeles
    createCanvas(800,800);

    //Creamos tablero y lo dibujamos
    tablero = new Tablero();
    tablero.dibujar();

    r1 = new Robot(0, 0);
    r2 = new Robot(0, 1);
}

//corre continuamente después de la función setup
function draw(){
    console.log("draw - frameCount:"+frameCount);
    clear();
    tablero.dibujar();

    r1.dibujar();
    r2.dibujar();
      //instrucciones a ejecutar en bucle
   
}

function mover(){
    r1.mover(0,1);
    r2.mover(1,0);
}
setInterval(mover, 1000);

class Tablero {
    constructor() {
      
      this.celdas = [];
      this.robots = [];
      this.obstaculos = [];

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          this.celdas.push(new Celda(i, j));
        }
      }

      // Añade obstáculos al tablero
      this.obstaculos.push(new Obstaculo(2, 2));
      this.obstaculos.push(new Obstaculo(2, 3));
      this.obstaculos.push(new Obstaculo(3, 3));
      this.obstaculos.push(new Obstaculo(4, 3));
      this.obstaculos.push(new Obstaculo(5, 3));
      this.obstaculos.push(new Obstaculo(5, 2));
      this.obstaculos.push(new Obstaculo(5, 1));
      this.obstaculos.push(new Obstaculo(4, 1));
    }

    dibujar(){
        this.celdas.forEach(celda => celda.dibujar());
        this.obstaculos.forEach(obstaculo => obstaculo.dibujar());
    }

    esCeldaBloqueada(x, y) {
        // Comprueba si una celda está bloqueada por un obstáculo
        for (let obstaculo of this.obstaculos) {
            if (obstaculo.x == x && obstaculo.y == y) {
                return true;
            }
        }

        return false;
    }
class Obstaculo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dibujar() {
        let tam = tamCelda;
        let x = (this.x * tamCelda) ;
        let y = (this.y * tamCelda) ;
        fill(255, 0, 0);
        stroke(0);
        rect(x, y, tamCelda, tamCelda);
    }
}

class Celda {
    constructor(x, y) {
        this.color  = (x + y) % 2 == 0 ? 255 : 0;
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
  let x = (this.x * tamCelda) ;
  let y = (this.y * tamCelda) ;
  image(img_rover, x, y, tam, tam);
}

mover(dx, dy) {
  // Actualiza las coordenadas del robot según el desplazamiento especificado
  let newX = this.x + dx;
  let newY = this.y + dy;

  // Comprueba que la nueva posición está dentro del tablero y no está bloqueada por un obstáculo
  if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && !tablero.esCeldaBloqueada(newX, newY)) {
    this.x = newX;
    this.y = newY;
  }
}

seguirRuta() {
    if (this.ruta.length > 0) {
        let siguienteCelda = this.ruta[0];
        let dx = siguienteCelda.x - this.x;
        let dy = siguienteCelda.y - this.y;

        this.mover(dx, dy);

        if (dx == 0 && dy == 0) {
            this.ruta.shift();
        }
    }
}

function planificarRuta(inicio, destino, tablero) {
// Implementa aquí tu algoritmo de búsqueda o planificación de rutas
// Puedes utilizar diferentes algoritmos como A*, BFS, DFS, etc.
}

// Función que se ejecuta cuando se presiona la tecla "p"
function activarModoProgramacion() {
modoProgramacion = true;
}

// Función que se ejecuta cuando se presiona la tecla "Enter" en el modo de programación
function ejecutarPrograma(programa) {
// Ejecuta el programa para mover los robots
// El programa debe ser una lista de comandos como ["arriba", "izquierda", "derecha", "abajo"]
}

let modoProgramacion = false;
let programaActual = [];

function keyPressed() {
  if (modoProgramacion) {
    if (keyCode == ENTER) {
      ejecutarPrograma(programaActual);
      programaActual = [];
      modoProgramacion = false;
    } else {
      let comando = "";
      if (keyCode == UP_ARROW) {
        comando = "arriba";
      } else if (keyCode == DOWN_ARROW) {
        comando = "abajo";
      } else if (keyCode == LEFT_ARROW) {
        comando = "izquierda";
      } else if (keyCode == RIGHT_ARROW) {
        comando = "derecha";
      }
      // Implementa aquí la lógica para agregar el comando a programaActual
    }
  }
}
}
  

