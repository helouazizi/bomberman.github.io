export { Field };
// import { Enemy } from "./enemies.js";

// Create a field to set the battle field of
// our game and the track the progress of the game:
class Field {
  #count = 1;
  constructor(height, stage, map) {
    this.map = map;
    this.height = height;
    this.width = height;
    this.container = null;
    this.battleField = null;
    this.randomGates = new Set();
    this.randomEnemies = new Set();
    this.time = 200;
    this.score = 0;
    this.stage = stage;
    this.left = 3;
  }
  // Create the battlefield:

  Create() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", "container");
    document.body.appendChild(this.container);
    this.container.style.width = `${this.width}px`;
    this.container.style.height = "fit-content";
  }

  // Create the battle field:
  CreateBattleField() {
    this.Create();

    console.log(this.width, "width");

    let fragment = document.createDocumentFragment();
    let board = document.createElement("div");
    board.setAttribute("id", "board");
    board.style.width = `${this.width * 15}px`;
    board.style.height = `50px`;

    // lets creaete time
    let time = document.createElement("div");
    time.setAttribute("id", "time");
    time.setAttribute("class", "dashboard");
    let timeText = document.createElement("strong");
    timeText.innerHTML = `Time: <span id="timeCounter">${this.time}</span>`;
    time.appendChild(timeText);

    // lets create score
    let score = document.createElement("div");
    score.setAttribute("class", "dashboard");
    let scoreText = document.createElement("strong");
    scoreText.setAttribute("id", "score");
    scoreText.textContent = `${this.score}`;
    score.appendChild(scoreText);

    // lets create attempts
    let attempts = document.createElement("div");
    attempts.setAttribute("id", "attempts");
    attempts.setAttribute("class", "dashboard");
    let left = document.createElement("p");
    left.innerHTML = `Left: <span id="left">${this.left}</span>`;
    attempts.appendChild(left);

    fragment.append(time, score, attempts);
    board.appendChild(fragment);
    this.container.appendChild(board);
    this.battleField = document.createElement("div");
    this.battleField.setAttribute("id", "battleField");

    // for (let y = 1; y <= 13; y++) {
    //   let wall = document.createElement("div");
    //   wall.setAttribute("class", "wall");
    //   wall.setAttribute("id", `wall-${y}`);
    //   for (let x = 1; x <= 15; x++) {
    //     let brick = document.createElement("div");
    //     brick.setAttribute("class", "brick");

    //     brick.style.width = `${this.width}px`;
    //     brick.style.height = `${this.height}px`;
    //     wall.appendChild(brick);

    //     if (
    //       y === 1 ||
    //       y === 13 ||
    //       x == 1 ||
    //       x == 15 ||
    //       (y % 2 !== 0 && x % 2 !== 0)
    //     ) {
    //       brick.classList.add("solid", "borders");
    //     } else {
    //       brick.classList.add("path");
    //       brick.setAttribute("id", `${this.#count}`);
    //       this.#count++;
    //     }
    //   }
    //   this.battleField.appendChild(wall);
    // }
    for (let y = 0; y < this.map.length; y++) {
      let wall = document.createElement("div");
      wall.setAttribute("class", "wall");
      wall.setAttribute("id", `wall-${y + 1}`);
    
      for (let x = 0; x < this.map[y].length; x++) {
        let brick = document.createElement("div");
        brick.style.width = `${this.width}px`;
        brick.style.height = `${this.height}px`;
    
        const tile = this.map[y][x];
    
        switch (tile) {
          case 1: // WALL
          brick.classList.add("solid", "borders");
            break;
          case 2: // GATE
            brick.classList.add("class", "solid"  ,"gate");
          
            break;
          case 3: // ENEMY
            brick.classList.add("class", "brick", "enemy");
          
            break;
          default: // EMPTY
            brick.classList.add("class", "brick" ,"path");
            brick.setAttribute("id", `${this.#count}`);
            this.#count++;
        }
    
        wall.appendChild(brick);
      }
    
      this.battleField.appendChild(wall);
    }
    this.container.appendChild(this.battleField);
    
    this.container.appendChild(this.battleField);
    
    // Instantiate the enemies:
  
  }

  // Genrate the breakable walls randomly:


  // Get the position of each element within
  getPosition = (element) => element.getBoundingClientRect();
}
