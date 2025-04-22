import {
  canMoveHorizontally,
  canMoveVertically,
  bringElementAxis,
  getPosition,
} from "./healpers.js";
class Enemy {
  constructor(id, size) {
    this.width = size
    this.id = id;
  
    this.score = 0
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
    Enemy.style.width = `${Math.floor(this.width - 3)}px`;
    Enemy.style.height = `${Math.floor(this.width - 3)}px`;
    Enemy.classList.add("enemy");
    Enemy.setAttribute("id", `enemy-${this.id}`);
    let brick = document.getElementById(`${this.id}`);
    brick.appendChild(Enemy);
  }
  //lets move enemies
  moveEnemy() {
    let herodead = false;
    let enemyDead = false
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
      // mmnm
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

      enemy.style.transform = `translate( ${this.positionX}px,${this.positionY}px)`;
      let hero = document.getElementById("hero")
      let bomb = document.getElementById("bomb")
      if (hero) {
        herodead = this.isCollistion(enemy, hero, 0);
      }
      if (bomb) {
        herodead = this.isCollistion(hero, bomb, this.width)&& document.querySelectorAll(".affected").length != 0;
        enemyDead = this.isCollistion(enemy, bomb, this.width);
      }
      /////////////////////
      if (herodead) {
        let hero = document.getElementById("hero");
        let left = document.getElementById("left")
        let leftValue = parseInt(left.innerText)-1
        left.innerText = `${leftValue}`
        hero.classList.add("boom-out");
        clearInterval(moving);
        hero.classList.add("boom-out");

        setTimeout(() => {
          // Lock the final state (optional safety net)
          hero.style.opacity = "0";
          hero.style.transform = "scale(0) rotate(720deg)";
          // THEN hide it completely (if needed)
          hero.style.display = "none";
        }, 1000);
      }
      /////////////////
      if (enemyDead && document.querySelectorAll(".affected").length != 0) {
        enemy.style.display = "none"
        let Score = document.getElementById("score")
        let value = parseInt(Score.innerText) + 100
        Score.textContent = `${value}`
      }
    }, 20);
  }

  isCollistion(enemy, targetElement, width) {
    let dead = false;
    let targetCoordinates = getPosition(targetElement);
    let enemyCoordinates = getPosition(enemy);
    let targetAxis = bringElementAxis(targetElement);
    let enemyAxix = bringElementAxis(enemy);
    if (
      this.isCoixial(targetCoordinates, enemyAxix, "y") &&
      targetAxis.y < enemyAxix.y &&
      targetCoordinates.bottom + width > enemyCoordinates.top
    ) {
      // hero.style.display = "none";
      dead = true;
    }

    // top
    if (
      this.isCoixial(targetCoordinates, enemyAxix, "y") &&
      targetAxis.y > enemyAxix.y &&
      targetCoordinates.top - width < enemyCoordinates.bottom
    ) {
      // hero.style.display = "none";
      dead = true;
    }
    // right
    if (
      this.isCoixial(targetCoordinates, enemyAxix, "x") &&
      targetCoordinates.right + width > enemyCoordinates.left &&
      targetAxis.x < enemyAxix.x
    ) {
      // hero.style.display = "none";
      dead = true;
    }

    //left
    if (
      this.isCoixial(targetCoordinates, enemyAxix, "x") &&
      targetCoordinates.left - width < enemyCoordinates.right &&
      enemyAxix.x < targetAxis.x
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
