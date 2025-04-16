export { Field };
import { Enemy } from "./enemies.js";


// Create a field to set the battle field of
// our game and the track the progress of the game:
class Field {

  #count = 1;
  constructor(height) {
    this.height = height;
    this.width = (height * 15) / 13;
    this.container = null;
    this.battleField = null;
    this.randomGates = new Set();
    this.randomEnemies = new Set();
    this.stage = 1;
  }
  // Create the battlefield:
  Create() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", "container");
    document.body.appendChild(this.container);
  }

  // Create the battle field:
  CreateBattleField() {
    this.Create();
    let fragment = document.createDocumentFragment();
    let board = document.createElement("div"); 
    board.setAttribute("id", "bord");
    board.style.width = `${this.width}vw`;
    board.style.height = `${this.height / 3}vh`;

    let time = document.createElement("div");
    time.setAttribute("id", "time");
    let score = document.createElement("div");
    score.setAttribute("id", "score");

    let attempts = document.createElement("div");
    attempts.setAttribute("id", "attempts");
    fragment.append(time, score, attempts);
    board.appendChild(fragment);
    this.container.appendChild(board);

    this.battleField = document.createElement("div");
    this.battleField.setAttribute("id", "battleField");
    this.battleField.style.width = `${this.width}vh`;
    this.battleField.style.height = `${this.height}vh`;

    for (let y = 1; y <= 13; y++) {
      let wall = document.createElement("div");
      wall.setAttribute("class", "wall");
      wall.setAttribute("id", `wall-${y}`);
      wall.style.width = `100%`;
      wall.style.height = `${this.height / 13}vh`;
      for (let x = 1; x <= 15; x++) {
        let brick = document.createElement("div");
        brick.setAttribute("class", "brick");

        brick.style.width = `${this.width / 15}vw`;
        brick.style.height = `100%`;
        wall.appendChild(brick);

        if (
          y === 1 ||
          y === 13 ||
          x == 1 ||
          x == 15 ||
          (y % 2 !== 0 && x % 2 !== 0)
        ) {
          brick.classList.add("solid");
        } else {
          brick.classList.add("path");
          brick.setAttribute("id", `${this.#count}`);
          this.#count++;
        }
      }
      this.battleField.appendChild(wall);
    }
    this.container.appendChild(this.battleField);
    this.createGates();
    // Instantiate the enemies:
    this.generateRandomIds(34, 113, "enemies")
    let enemies = new Enemy(this.randomEnemies)
    enemies.createEnimies();
    enemies.moveEnimies();
  
    
  }

  // Genrate the breakable walls randomly:
  generateRandomIds(min, max, choice) {
    let count = 0;
    let enemiesCount = 4;

    switch (this.stage) {
      case 2:
        count = 20
        enemiesCount = 5
        break
      case 3:
        count = 22
        enemiesCount = 6
        break
      case 4:
        count = 25
        enemiesCount = 7
        break
      case 5:
        count = 30
        enemiesCount = 8
        break
      default:
        count = 16
        enemiesCount = 4
    }

    let edge = count

    if (choice === "enemies") {
      edge = enemiesCount
    }

    let checker = new Set()
    do {
      let num = Math.floor(Math.random() * (max - min + 1)) + min
      if (choice === "enemies" && !this.randomGates.has(num)) {
        this.randomEnemies.add(num)
        checker.add(num)
      } else if (choice === "gate" && num != 1 && num != 14 && num != 2) {
        this.randomGates.add(num)
        checker.add(num)
      }
    } while (checker.size < edge)
  }

  // create the breakable walls
  createGates() {
    this.generateRandomIds(1, 113, "gate")
    let Ids = Array.from(this.randomGates)
    document.getElementById(`${Ids[Ids.length / 2]}`).classList.add("door")
    Ids.forEach((id) => {
      let brick = document.getElementById(`${id}`)
      brick.classList.add("solid", "gate")
    })
  }


  // Get the position of each element within
  getPosition = (element) => element.getBoundingClientRect();
}
