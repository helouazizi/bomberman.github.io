import { canMoveHorizontally, canMoveVertically } from "./healpers.js";
class Enemy {
  constructor(id) {
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
    Enemy.classList.add("enemy");
    Enemy.setAttribute("id", `enemy-${this.id}`);
    let brick = document.getElementById(`${this.id}`);
    brick.appendChild(Enemy);
  }
  //lets move enemies
  moveEnemy() {
    let enemy = document.getElementById(`enemy-${this.id}`);
    enemy.style.backgroundColor = "black";
    console.log(enemy, "enemies");

    // let make the set interval to moove the enenmy
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
      enemy.style.transform = `translate( ${this.positionX}px,${this.positionY}px)`;
      console.log("/////////////////////////////////////");
      console.log("top", this.moveup);
      console.log("right", this.moveright);
      console.log("down", this.movedown);
      console.log("left", this.moveleft);
      // console.log("/////////////////////////////////////");
    }, 20);
  }
}

export { Enemy };
