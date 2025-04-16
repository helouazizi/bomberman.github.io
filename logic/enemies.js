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
      // let enemyPos = getPosition(firstenemy)
      // let bricksPos = getHorizontalBricks(firstenemy,"left")
      // console.log("enemyPos",enemyPos);
      // console.log("posbriks",bricksPos);
      // console.log("up", this.moveup);
      // console.log("down", this.movedown);
      // console.log("left",this.moveleft);
      // console.log("right", this.moveright);

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
      // if (!canMoveHorizontally(firstenemy, "left")) {
      //   // block the left
      //   this.moveleft = false;
      //   // lets check the top
      //   if (canMoveVertically(firstenemy, "up")) {
      //     this.moveup = true;
      //     this.movedown = false;
      //     this.moveright = false;
      //   } else if (canMoveVertically(firstenemy, "down")) {
      //     this.moveup = false;
      //     this.movedown = true;
      //     this.moveright = false;
      //   } else if (canMoveHorizontally(firstenemy, "right")) {
      //     this.moveup = false;
      //     this.movedown = false;
      //     this.moveright = true;
      //   }
      // } else if (!canMoveHorizontally(firstenemy, "right")) {
      //   // lets block the right
      //   this.moveright = false;

      //   // lets check the top
      //   if (canMoveVertically(firstenemy, "up")) {
      //     this.moveup = true;
      //     this.movedown = false;
      //     this.moveleft = false;
      //   } else if (canMoveVertically(firstenemy, "down")) {
      //     this.moveup = false;
      //     this.movedown = true;
      //     this.moveleft = false;
      //   } else if (canMoveHorizontally(firstenemy, "left")) {
      //     this.moveup = false;
      //     this.movedown = false;
      //     this.moveleft = true;
      //   }
      // } else if (!canMoveVertically(firstenemy, "up")) {
      //   // lets block the top
      //   this.moveup = false;
      //   // lets check the top
      //   if (canMoveHorizontally(firstenemy, "right")) {
      //     this.moveright = true;
      //     this.movedown = false;
      //     this.moveleft = false;
      //   } else if (canMoveHorizontally(firstenemy, "left")) {
      //     this.moveright = false;
      //     this.movedown = false;
      //     this.moveleft = true;
      //   } else if (canMoveVertically(firstenemy, "down")) {
      //     this.moveright = false;
      //     this.movedown = true;
      //     this.moveleft = false;
      //   }
      // } else if (!canMoveVertically(firstenemy, "down")) {
      //   // lets block the down
      //   this.movedown = false;

      //   // lets check the top
      //   if (canMoveHorizontally(firstenemy, "right")) {
      //     this.moveright = true;
      //     this.moveup = false;
      //     this.moveleft = false;
      //   } else if (canMoveHorizontally(firstenemy, "left")) {
      //     this.moveright = false;
      //     this.moveup = false;
      //     this.moveleft = true;
      //   } else if (canMoveVertically(firstenemy, "up")) {
      //     this.moveright = false;
      //     this.moveup = true;
      //     this.moveleft = false;
      //   }
      // }
      firstenemy.style.transform = `translate( ${enemiesPositions[0].x}px,${enemiesPositions[0].y}px)`;
    }, 16.67);
  }
}

export { Enemy };
