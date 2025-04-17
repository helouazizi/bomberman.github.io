import { canMoveHorizontally, canMoveVertically } from "./healpers.js";
class Enemy {
  constructor(enemiesCount) {
    this.enemiesCount = enemiesCount;
    this.Directions = new Set();
    this.positionX = 0;
    this.positionY = 0;
  }
  // create the enemies
  createEnimies() {
    this.enemiesCount.forEach((id) => {
      let Enemy = document.createElement("div");
      Enemy.classList.add("enemy");
      let brick = document.getElementById(`${id}`);
      brick.appendChild(Enemy);
    });
  }
  //lets move enemies
  moveEnimies() {
    let enemies = document.querySelectorAll(".enemy");
    let firstenemy = enemies[0];
    firstenemy.style.backgroundColor = "black";
    // let moved = trues
    setInterval(() => {
      let coordinates = this.getRandomCoordinates();
      if (coordinates.line === "horizontal") {
        setInterval(() => {
          if (canMoveHorizontally(firstenemy, coordinates.direction)) {
            if (coordinates.direction === "left") {
              this.positionX--;
              firstenemy.style.transform = `translate( ${this.positionX}px,${this.positionY}px)`;
            } else {
              this.positionX++;
              firstenemy.style.transform = `translate( ${this.positionX}px,${this.positionY}px)`;
            }
          }
        }, 16.76);
      } else {
        setInterval(() => {
          let coordinates = this.getRandomCoordinates();

          if (canMoveVertically(firstenemy, coordinates.direction)) {
            if (coordinates.direction === "down") {
              this.positionY++;
            } else {
              this.positionY--;
            }
            firstenemy.style.transform = `translate( ${this.positionX}px,${this.positionY}px)`;
          }
        }, 16.67);
      }
    }, 1000);
  }

  // Get a valid random direction:
  getRandomCoordinates() {
    let random = Math.floor(Math.random() * 4) + 1;
    let coordination = {};
    switch (random) {
      case 1:
        coordination.direction = "up";
        coordination.line = "vertical";
        break;
      case 2:
        coordination.direction = "right";
        coordination.line = "horizontal";

        break;
      case 3:
        coordination.direction = "down";
        coordination.line = "vertical";

        break;
      default:
        coordination.direction = "left";
        coordination.line = "horizontal";
    }
    return coordination;
  }
}

export { Enemy };
