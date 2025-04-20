export { Hero };
import { Bomb } from "./bomb.js";
class Hero {
  constructor(size) {
    this.hero = null;
    this.x = 2;
    this.y = 2;
    this.step = 3;
    this.width = size;
  }

  createHero() {
    this.hero = document.createElement("div");
    this.hero.setAttribute("id", "hero");
    let first = document.getElementById("1");
    first.style.position = "relative";
    first.style.overflow = "visible";
    first.appendChild(this.hero);
    this.hero.style.width = `${Math.floor(this.width-this.step)}px`;
    this.hero.style.height = `${Math.floor(this.width-this.step)}px`;
    this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`;
  }
  // create a function  to handle the movement of the hero:
  moveHero() {
    // var lastCall = 0;
    let called = false;
    let lastCall = 0;
    let limit = 3001;
    document.addEventListener("keydown", (e) => {
      console.log(e.key);
      switch (e.key) {
        case " ":
          let axis = this.bringHeroAxis();
          let bomb = new Bomb(this.hero, axis.x, axis.y);

          if (!called) {
            bomb.create();
            lastCall = Date.now();
          }

          called = true;

          if (called && Date.now() - lastCall >= limit) {
            bomb.create(); //
            lastCall = Date.now();
          }

        case "ArrowDown":
          if (this.canMoveVertically(this.hero, "down")) {
            this.y += 2;
          }
          break;
        case "ArrowUp":
          if (this.canMoveVertically(this.hero, "up")) {
            this.y -= 2;
          }
          break;
        case "ArrowRight":
          if (this.canMoveHorizontally(this.hero, "right")) {
            this.x += 2;
          }
          break;
        case "ArrowLeft":
          if (this.canMoveHorizontally(this.hero, "left")) {
            this.x -= 2;
          }
      }
      this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`;
    });
  }

  // check the horizontal movement:
  canMoveHorizontally(element, direction = "left") {
    let can = true;
    let elements = this.getHorizontalBricks(element, direction);
    let position = this.getPosition(element);
    elements.forEach((element) => {
      if (direction === "right") {
        if (!(position.right + this.step < element.left)) {
          can = false;
        }
      } else {
        if (!(position.left - this.step > element.right)) {
          can = false;
        }
      }
    });
    return can;
  }


  // Get all the bricks in the horizontal range:
  getHorizontalBricks(element, direction = "left") {
    let bricks = document.querySelectorAll(".solid");
    let position = this.getPosition(element);
    let elements = [];
    bricks.forEach((brick) => {
      let hinder = this.getPosition(brick);
      if (
        position.top > hinder.top - position.height &&
        position.bottom < hinder.bottom + position.height
      ) {
        if (direction === "left" && position.left > hinder.right) {
          elements.push(hinder);
        } else if (direction === "right" && position.right < hinder.left) {
          elements.push(hinder);
        }
      }
    });
    return elements;
  }
  // check the vertical movement:
  canMoveVertically(element, direction = "down") {
    let can = true;
    let elements = this.getVerticalBricks(element, direction);
    let position = this.getPosition(element);
    elements.forEach((element) => {
      if (direction === "up") {
        if (position.top - this.step < element.bottom) {
          can = false;
        }
      } else {
        if (position.bottom + this.step > element.top) {
          can = false;
        }
      }
    });
    return can;
  }

  // Get all the bricks in the vertical range:
  getVerticalBricks(element, direction = "down") {
    let bricks = document.querySelectorAll(".solid");
    let position = this.getPosition(element);
    let elements = [];
    bricks.forEach((brick) => {
      let hinder = this.getPosition(brick);
      if (
        position.right < hinder.right + position.width &&
        position.left > hinder.left - position.width
      ) {
        if (direction === "down" && position.bottom < hinder.top) {
          elements.push(hinder);
        } else if (direction === "up" && position.top > hinder.bottom) {
          this.hero;
          elements.push(hinder);
        }
      }
    });
    return elements;
  }

  // gring the center of the hero
  bringHeroAxis() {
    let obj = {};
    let position = this.getPosition(this.hero);
    obj.x = position.x + position.width / 2;
    obj.y = position.y + position.height / 2;
    return obj;
  }

  throttle(fn, limit, lastCall) {
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        fn.apply(this, args);
      }
    };
  }

  getPosition = (element) => element.getBoundingClientRect();
}
