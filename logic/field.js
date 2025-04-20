export { Field };
import { Enemy } from "./enemies.js";

// Create a field to set the battle field of
// our game and the track the progress of the game:
class Field {
  #count = 1;
  constructor(height) {
    this.height = height;
    this.width = height;
    this.container = null;
    this.battleField = null;
    this.randomGates = new Set();
    this.randomEnemies = new Set();
    this.time = 200;
    this.score = 0;
    this.stage = 5;
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
    let fragment = document.createDocumentFragment();
    let board = document.createElement("div");
    board.setAttribute("id", "board");
    board.style.width = `${this.width*15}px`;
    console.log(this.width*15,"heeeeeeeee");
    
    board.style.height = `50px`;
    //board.style.border = `5px solid red`;

    // lets creaete time
    let time = document.createElement("div");
    time.setAttribute("id", "time");
    time.setAttribute("class", "dashboard");
    let timeText = document.createElement("strong");
    timeText.innerHTML = `Time: <span id="timeCounter">${this.time}</span>`;
    time.appendChild(timeText);

    // lets create score
    let score = document.createElement("div");
    score.setAttribute("id", "score");
    score.setAttribute("class", "dashboard");
    let scoreText = document.createElement("strong");
    scoreText.textContent = `${this.score}`;
    score.appendChild(scoreText);

    // lets create attempts
    let attempts = document.createElement("div");
    attempts.setAttribute("id", "attempts");
    attempts.setAttribute("class", "dashboard");
    let left = document.createElement("p");
    left.innerHTML = `Left: <span>${this.left - 1}</span>`;
    attempts.appendChild(left);

    fragment.append(time, score, attempts);
    board.appendChild(fragment);
    this.container.appendChild(board);
    this.battleField = document.createElement("div");
    this.battleField.setAttribute("id", "battleField");

    for (let y = 1; y <= 13; y++) {
      let wall = document.createElement("div");
      wall.setAttribute("class", "wall");
      wall.setAttribute("id", `wall-${y}`);
      // wall.style.width = `${this.width}px`;
      // wall.style.height = `${this.height / 13}px`;
      for (let x = 1; x <= 15; x++) {
        let brick = document.createElement("div");
        brick.setAttribute("class", "brick");

        brick.style.width = `${this.width}px`;
        brick.style.height = `${this.height}px`;
        wall.appendChild(brick);

        if (
          y === 1 ||
          y === 13 ||
          x == 1 ||
          x == 15 ||
          (y % 2 !== 0 && x % 2 !== 0)
        ) {
          brick.classList.add("solid", "borders");
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
    this.generateRandomIds(34, 113, "enemies");

    this.randomEnemies.forEach((id) => {
      let enemy = new Enemy(id);
      enemy.createEnemy();
      enemy.moveEnemy();
    });
  }

  // Genrate the breakable walls randomly:
  generateRandomIds(min, max, choice) {
    let count = 0;
    let enemiesCount = 4;

    switch (this.stage) {
      case 2:
        count = 20;
        enemiesCount = 5;
        break;
      case 3:
        count = 22;
        enemiesCount = 6;
        break;
      case 4:
        count = 25;
        enemiesCount = 7;
        break;
      case 5:
        count = 30;
        enemiesCount = 8;
        break;
      default:
        count = 16;
        enemiesCount = 4;
    }

    let edge = count;

    if (choice === "enemies") {
      edge = enemiesCount;
    }

    let checker = new Set();
    do {
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (choice === "enemies" && !this.randomGates.has(num)) {
        this.randomEnemies.add(num);
        checker.add(num);
      } else if (choice === "gate" && num != 1 && num != 14 && num != 2) {
        this.randomGates.add(num);
        checker.add(num);
      }
    } while (checker.size < edge);
  }

  // create the breakable walls
  createGates() {
    this.generateRandomIds(1, 113, "gate");
    let Ids = Array.from(this.randomGates);
    document.getElementById(`${Ids[Ids.length / 2]}`).classList.add("door");
    Ids.forEach((id) => {
      let brick = document.getElementById(`${id}`);
      brick.classList.add("solid", "gate");
    });
  }

  // Get the position of each element within
  getPosition = (element) => element.getBoundingClientRect();

  // Handle the time deadline of each game:
  handleLeftTime() {
    let counter = document.getElementById("timeCounter");
    const countdown = setInterval(() => {
      counter.textContent = this.time;
      this.time--;
      if (this.time < 0) {
        clearInterval(countdown);
        counter.textContent = "Time's up!";
      }
    }, 1000);
  }
}
