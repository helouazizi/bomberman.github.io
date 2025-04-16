import { canMoveHorizontally } from "./healpers.js";
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
      // let enemyPos = getPosition(firstenemy)
      // let bricksPos = getHorizontalBricks(firstenemy,"left")
      // console.log("enemyPos",enemyPos);
      // console.log("posbriks",bricksPos);
      if (canMoveHorizontally(firstenemy, "left") && this.moveleft) {
        enemiesPositions[0].x--;
      } else if (canMoveHorizontally(firstenemy, "right") && this.moveright) {
        enemiesPositions[0].x++;
      }
      if (!canMoveHorizontally(firstenemy, "left")) {
        this.moveleft = false;
        this.moveright = true;
      } else if (!canMoveHorizontally(firstenemy, "right")) {
        this.moveleft = true;
        this.moveright = false;
      }
      firstenemy.style.transform = `translate( ${enemiesPositions[0].x}px,${enemiesPositions[0].y}px)`;
    }, 16.67);
  }
}

export { Enemy };
