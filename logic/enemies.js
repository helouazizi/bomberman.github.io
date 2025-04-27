import {
  canMoveHorizontally,
  canMoveVertically,
 
 isCollistion
} from "./healpers.js";
class Enemy {
  constructor(id, size) {
    this.width = size;
    this.id = id;
    this.score = 0;
    this.moveright = true;
    this.moveleft = true;
    this.moveup = true;
    this.movedown = true;
    this.positionX = 0;
    this.positionY = 0;
    this.requestId = null;
    this.paused = false;
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
    if (!this.paused) {
      let herodead = false;
      let enemyDead = false;
      let enemy = document.getElementById(`enemy-${this.id}`);

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
        // block the leftLeft
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
      let hero = document.getElementById("hero");
      let bomb = document.getElementById("bomb");
      if (hero && enemy) {
        herodead = isCollistion(enemy, hero, 0);
      }
      if (bomb) {
        herodead =
          isCollistion(hero, bomb, this.width) &&
          document.querySelectorAll(".affected").length != 0;
        enemyDead = isCollistion(enemy, bomb, this.width);
      }

      // In case the hero is dead:
      if (herodead) {
        let hero = document.getElementById("hero");
        let left = document.getElementById("left");
        let leftValue = parseInt(left.innerText) - 1;
        left.innerText = `${leftValue}`;
        hero.classList.add("boom-out");
        // clearInterval(moving);

        setTimeout(() => {
          // Lock the final state (optional safety net)
          hero.style.opacity = "0";
          hero.style.transform = "scale(0) rotate(720deg)";
          // THEN hide it completely (if needed)
          hero.classList.remove("boom-out");
          hero.style.transform = `translate( ${0}px,${0}px)`;
          hero.style.opacity = "1";
        }, 1000);
        let pauseBtn = document.getElementById("pauseBtn");
        pauseBtn.classList.add("dead");
        pauseBtn.click();
      }
      /////////////////
      if (enemyDead && document.querySelectorAll(".affected").length != 0) {
        enemy.style.display = "none";
        let Score = document.getElementById("score");
        let value = parseInt(Score.innerText) + 100;
        this.score += 100;
        Score.textContent = `${value}`;
      }

      //this.win();
      this.requestId = requestAnimationFrame(() => this.moveEnemy());
    }
  }
  pauseAnimation() {
    this.paused = true;
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }
  // win() {
  //   // lets get the score
  //   let Score = document.getElementById("score");
  //   if (Score) {
  //     let value = parseInt(Score.innerText);
  //     let hero = document.getElementById("hero");
  //     let door = document.getElementsByClassName("door");
  //     // let IsONDoor =
  //     if (value >= 400 && isCollistion(hero,door,this.width)) {
  //       let popup = document.createElement("div");
  //       popup.setAttribute("id", "popup");
  //       popup.classList.add("show");
  //       popup.textContent = "You won!!!";
  //       document.body.appendChild(popup);
  //       let controller = document.getElementById("controller");
  //       controller.style.display = "none";
  //       setTimeout(() => {
  //         location.reload();
  //       }, 2000);
  //     }
  //   }
  // }
  resumeAnimation() {
    if (!this.paused) return;
    this.paused = false;
    this.requestId = requestAnimationFrame(() => this.moveEnemy());
  }

  
}

export { Enemy };
