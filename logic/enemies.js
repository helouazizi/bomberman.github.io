import {
  canMoveHorizontally,
  canMoveVertically,
  bringElementAxis,
  getPosition,
} from "./healpers.js";
class Enemy {
  constructor(id, left) {
    this.id = id;
    this.left = left;
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
    let dead = false;
    let enemy = document.getElementById(`enemy-${this.id}`);
    let moving = setInterval(() => {
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
      dead = this.isCollistion(enemy);
      if (dead) {
        let hero = document.getElementById("hero");
        hero.classList.add("boom-out");

        clearInterval(moving);
        hero.classList.add("boom-out");

        setTimeout(() => {
          // Lock the final state (optional safety net)
          hero.style.opacity = "0";
          hero.style.transform = "scale(0) rotate(720deg)";

          // THEN hide it completely (if needed)
          hero.style.display = "none";
        }, 650);
      }

      // console.log("/////////////////////////////////////");
      // console.log("top", this.moveup);
      // console.log("right", this.moveright);
      // console.log("down", this.movedown);
      // console.log("left", this.moveleft);
      // console.log("/////////////////////////////////////");
    }, 20);
  }

  isCollistion(enemy) {
    let dead = false;
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
      // hero.style.display = "none";
      dead = true;
    }

    // top
    if (
      this.isCoixial(heroCoordinates, enemyAxix, "y") &&
      heroAxis.y > enemyAxix.y &&
      heroCoordinates.top < enemyCoordinates.bottom
    ) {
      // hero.style.display = "none";
      dead = true;
    }
    // right
    if (
      this.isCoixial(heroCoordinates, enemyAxix, "x") &&
      heroCoordinates.right > enemyCoordinates.left &&
      heroAxis.x < enemyAxix.x
    ) {
      // hero.style.display = "none";
      dead = true;
    }

    //left
    if (
      this.isCoixial(heroCoordinates, enemyAxix, "x") &&
      heroCoordinates.left < enemyCoordinates.right &&
      enemyAxix.x < heroAxis.x
    ) {
      // hero.style.display = "none";
      dead = true;
    }
    return dead;
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
