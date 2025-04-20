import {
  canMoveHorizontally,
  canMoveVertically,
  getPosition,
} from "./healpers.js";
class Enemy {
  constructor(id,size) {
    this.width = size
    this.id = id;
    this.moveright = true;
    this.moveleft = true;
    this.moveup = true;
    this.movedown = true;
    this.positionX = 0;
    this.positionY = 0;
  }
  // create the enemies
  createEnemy() {
    let Enemy = document.createElement("div");
    Enemy.style.width = `${this.width-3}px`;
    Enemy.style.height = `${this.width-3}px`;
    Enemy.classList.add("enemy");
    Enemy.setAttribute("id", `enemy-${this.id}`);
    let brick = document.getElementById(`${this.id}`);
    brick.appendChild(Enemy);
  }
  //lets move enemies
  moveEnemy() {
    let enemy = document.getElementById(`enemy-${this.id}`);

    setInterval(() => {
      if (canMoveHorizontally(enemy, "left") && this.moveleft) {
        this.positionX--;
      } else if (canMoveHorizontally(enemy, "right") && this.moveright) {
        this.positionX++;
      } else if (canMoveVertically(enemy, "up") && this.moveup) {
        this.positionY--;
      } else if (canMoveVertically(enemy, "down") && this.movedown) {
        this.positionY++;
      }

      // ///////////////////////////////////////////////
      if (!canMoveHorizontally(enemy, "left")) {
        // block the left
        this.moveleft = false;
        this.moveright = true;
      }
      if (!canMoveHorizontally(enemy, "right")) {
        // lets block the right
        this.moveright = false;
        this.moveleft = true;
      }
      if (!canMoveVertically(enemy, "up")) {
        // lets block the top
        this.moveup = false;
        this.movedown = true;
      }
      if (!canMoveVertically(enemy, "down")) {
        // lets block the down
        this.movedown = false;
        this.moveup = true;
      }
      
      // htis handle the enney collistion with the herro
      this.isCollistion(enemy)

      enemy.style.transform = `translate( ${this.positionX}px,${this.positionY}px)`;
    }, 20);
  }

  // htid the function that handle the object colitions
  isCollistion(enemy){
    let hero = document.getElementById("hero");
    let heroCoordinates = getPosition(hero);
    let enemyCoordinates = getPosition(enemy);
    console.log(heroCoordinates.width ,heroCoordinates.height , "hero");
    console.log(enemyCoordinates.width,enemyCoordinates.height, "enemy");
    if (
      heroCoordinates.left === enemyCoordinates.left &&
      heroCoordinates.right === enemyCoordinates.right &&
      heroCoordinates.bottom > enemyCoordinates.top
    ) {
      console.log("yeees");
      hero.style.display = "none";
    }
    if (
      heroCoordinates.left === enemyCoordinates.left &&
      heroCoordinates.right === enemyCoordinates.right &&
      heroCoordinates.top > enemyCoordinates.bottom
    ) {
      console.log("yeees");
      hero.style.display = "none";
    }
    if (
      heroCoordinates.top === enemyCoordinates.top &&
      heroCoordinates.bottom === enemyCoordinates.bottom &&
      heroCoordinates.right > enemyCoordinates.left
    ) {
      console.log("yeees");
      hero.style.display = "none";
    }
    if (
      heroCoordinates.top === enemyCoordinates.top &&
      heroCoordinates.bottom === enemyCoordinates.bottom &&
      heroCoordinates.left > enemyCoordinates.right
    ) {
      console.log("yeees");
      hero.style.display = "none";
    }
  }
}

export { Enemy };
