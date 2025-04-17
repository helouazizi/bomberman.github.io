import { canMoveHorizontally, canMoveVertically } from "./healpers.js";
class Enemy {
  constructor(enemiesCount) {
    this.enemiesCount = enemiesCount;
    this.moveright = true;
    this.moveleft = true;
    this.moveup = true;
    this.movedown = true;
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
    // lets craete enimeis positions
    let enemiesPositions = [];
    for (let i = 0; i < this.enemiesCount.size; i++) {
      let enemyPos = {};
      enemyPos.x = 0;
      enemyPos.y = 0;
      enemiesPositions.push(enemyPos);
    }
    let enemies = document.querySelectorAll(".enemy");
    let firstenemy = enemies[0];
    firstenemy.style.backgroundColor = "black";
    console.log(enemies, "enemies");

    // let make the set interval to moove the enenmy
    setInterval(() => {
  
      if (canMoveHorizontally(firstenemy, "left") && this.moveleft) {
        enemiesPositions[0].x--;
      } else if (canMoveHorizontally(firstenemy, "right") && this.moveright) {
        enemiesPositions[0].x++;
      } else if (canMoveVertically(firstenemy, "up") && this.moveup) {
        enemiesPositions[0].y--;
      } else if (canMoveVertically(firstenemy, "down") && this.movedown) {
        enemiesPositions[0].y++;
      }

      // ///////////////////////////////////////////////
      if (!canMoveHorizontally(firstenemy, "left")) {
        // block the left
        this.moveleft = false;
        this.moveright = true;
      }
      if (!canMoveHorizontally(firstenemy, "right")) {
        // lets block the right
        this.moveright = false;
        this.moveleft = true;

      }
      if (!canMoveVertically(firstenemy, "up")) {
        // lets block the top
        this.moveup = false;
        this.movedown = true;
   
      }
      if (!canMoveVertically(firstenemy, "down")) {
        // lets block the down
        this.movedown = false;
        this.moveup = true
      }
      firstenemy.style.transform = `translate( ${enemiesPositions[0].x}px,${enemiesPositions[0].y}px)`;
      console.log("/////////////////////////////////////");
      console.log("top", this.moveup);
      console.log("right", this.moveright);
      console.log("down",this.movedown);
      console.log("left", this.moveleft);
      // console.log("/////////////////////////////////////");
    }, 20);
  }
}

export { Enemy };
