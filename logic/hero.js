export { Hero };
import { Bomb } from "./bomb.js";
import { isCollistion } from "./healpers.js";
class Hero {
  constructor(size) {
    this.hero = null;
    this.x = 2;
    this.y = 2;
    this.step = 3;
    this.width = size;
    this.pause = false;
    this.count = 0;
  }

  createHero() {
    this.hero = document.createElement("div");
    this.hero.setAttribute("id", "hero");
    let first = document.getElementById("1");
    first.style.position = "relative";
    first.style.overflow = "visible";
    first.appendChild(this.hero);
    this.hero.style.width = `${this.width - 10}px`;
    this.hero.style.height = `${this.width - 10}px`;
    this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`;
  }

  // create a function  to handle the movement of the hero:
  moveHero() {
    // var lastCall = 0;
    let called = false;
    let lastCall = 0;
    let limit = 4001;
    document.addEventListener("keydown", (e) => {
      if (!this.pause) {
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
            this.win();
            break;
          case "ArrowUp":
            if (this.canMoveVertically(this.hero, "up")) {
              this.y -= 2;
            }
            this.win();
            break;
          case "ArrowRight":
            if (this.canMoveHorizontally(this.hero, "right")) {
              this.x += 2;
            }
            this.win();
            break;
          case "ArrowLeft":
            if (this.canMoveHorizontally(this.hero, "left")) {
              this.x -= 2;
            }
            this.win();
        }
        this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`;
      }
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
  win() {
    let door = document.getElementsByClassName("door")[0];
    // lets get the score
    let Score = document.getElementById("score");
    if (Score) {
      let value = parseInt(Score.innerText);

      if (this.count == 0 && value >= 200) {
        let pauseBtn = document.getElementById("pauseBtn");
        pauseBtn.click();
        this.count++;
        this.midstory(() => {
          let pauseBtn = document.getElementById("pauseBtn");
          pauseBtn.click();
        });
      }
      if (value >= 400 && isCollistion(this.hero, door, 0)) {
        let popup = document.createElement("div");
        popup.setAttribute("id", "popup");
        popup.classList.add("show");
        popup.textContent = "You won!!!";
        document.body.appendChild(popup);
        let controller = document.getElementById("controller");
        controller.style.display = "none";
        setTimeout(() => {
          this.winstory(() => {
            location.reload();
          });
        }, 2000);
      }
    }
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

  winstory(onFinish) {
    let body = document.body;
    body.innerHTML = "";

    let story = document.createElement("story");
    div.id = "story";

    const paragraphs = [
      "Against all odds, Zylo defeats the raider leader and seizes back the Core of Life.",
      "Returning to Zelora, Zylo restores the Core to its sacred temple.",
      "Slowly, life blooms again, and the skies turn from a dull gray to vibrant colors.",
      "Zylo becomes a hero, and a new age of peace begins — thanks to your bravery!",
    ];

    story.textContent = paragraphs[0];
    body.appendChild(story);

    let index = 1;
    const interval = setInterval(() => {
      if (index < paragraphs.length) {
        story.textContent = paragraphs[index];
        index++;
      } else {
        clearInterval(interval);
        if (typeof onFinish === "function") {
          setTimeout(() => {
            div.classList.add("hidden");
            onFinish(); // <-- Call the function when the story is finished
          }, 1000); // wait 1 second to make it smooth
        }
      }
    }, 5000);
  }
  midstory(onFinish) {
    // Pause the game logic here (optional if you want automatic pause)

    // Create a story overlay div
    let story = document.createElement("div");
    story.id = "story";





    // Text paragraph
    const paragraphs = [
      "After countless battles and narrow escapes, Zylo picks up a distress signal.",
      'It’s a transmission from a captured Zeloran elder, revealing the raiders hideout hidden inside a massive asteroid belt called the "Crimson Thorns."',
      "However, it’s a trap: the path is filled with deadly drones and collapsing meteors!",
      "Zylo must stay sharp, push forward, and reach the Core before the last light of Zelora fades.",
    ];

    story.textContent = paragraphs[0]

    document.body.appendChild(story)

    let index = 1;
    const interval = setInterval(() => {
      if (index < paragraphs.length) {
        story.textContent = paragraphs[index]
        index++
      } else {
        clearInterval(interval);
        if (typeof onFinish === "function") {
          setTimeout(() => {
            story.remove()
            onFinish()
          }, 1000)
        }
      }
    }, 5000)
  }

  getPosition = (element) => element.getBoundingClientRect()
}
