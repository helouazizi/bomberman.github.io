import { canMoveHorizontally, canMoveVertically,bringElementAxis,getPosition } from "./healpers.js";
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
      this.isCollistion(enemy)
     
      // console.log("/////////////////////////////////////");
      // console.log("top", this.moveup);
      // console.log("right", this.moveright);
      // console.log("down", this.movedown);
      // console.log("left", this.moveleft);
      // console.log("/////////////////////////////////////");
    }, 20);
  }

  isCollistion(enemy) {
    let hero = document.getElementById("hero");
    let heroCoordinates = getPosition(hero);
    let enemyCoordinates = getPosition(enemy);
    let heroAxis = bringElementAxis(hero);
    let enemyAxix = bringElementAxis(enemy);

    if (
      this.isCoixial(heroCoordinates, enemyAxix, "y") &&
      heroAxis.y < enemyAxix.y &&
      heroCoordinates.bottom > enemyCoordinates.top
    ) {
      console.log("yeees");
      hero.style.display = "none";
    }

    // top
    if (
      this.isCoixial(heroCoordinates, enemyAxix, "y") &&
      heroAxis.y > enemyAxix.y &&
      heroCoordinates.top < enemyCoordinates.bottom
    ) {
      console.log("yeees");
      hero.style.display = "none";
    }
    // right
    if (
      this.isCoixial(heroCoordinates, enemyAxix, "x") &&
      heroCoordinates.right > enemyCoordinates.left &&
      heroAxis.x < enemyAxix.x
    ) {
      console.log("yeees");
      hero.style.display = "none";
    }

    //left
    if (
      this.isCoixial(heroCoordinates, enemyAxix, "x") &&
      heroCoordinates.left < enemyCoordinates.right&&
      enemyAxix.x < heroAxis.x
    ) {
      console.log("yeees");
      hero.style.display = "none";
    }
  }
  isCoixial(coordes, axis, direction) {
    let coixial = false;
    switch (direction) {
      case "y":
        if (axis.x >= coordes.left && axis.x <= coordes.right) {
          coixial = true;
        }
        break;

      case "x":
        if (axis.y >= coordes.top && axis.y <= coordes.bottom) {
          coixial = true;
        }
        break;
    }

    return coixial;
  }

}

export { Enemy };
