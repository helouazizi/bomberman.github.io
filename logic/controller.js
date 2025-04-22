import { Enemy } from "./enemies.js";
import { Field } from "./field.js";
import { Hero } from "./hero.js";

class Control {
  constructor(stage, lives, score) {
    this.stage = stage;
    this.lives = lives;
    this.score = score;
    this.gameStatus = "initial";
    this.controller = null;
    this.pausebtn = null;
    this.restartbtn = null;
    this.resumebtn = null;
    this.startbtn = null;
  }

  createBoard() {
    const screenWidth = window.innerWidth;
    // Calculate a responsive unit size based on window width
    let unitSize = screenWidth * 0.02;
    unitSize = Math.max(20, Math.min(unitSize, 80));

    let controller = document.createElement("div");
    controller.setAttribute("id", "controller");
    controller.style.width = `${unitSize * 15}px`;
    let title = document.createElement("h1");
    let start = document.createElement("button");
    let restart = document.createElement("button");
    let resume = document.createElement("button");
    let pause = document.createElement("button");
    // Add value to my buttons:
    start.value = "start";
    restart.value = "restart";
    resume.value = "resume";
    pause.value = "pause";

    // Add text content to my btns
    title.textContent = "Bomberman";
    start.textContent = "start";
    restart.textContent = "restart";
    resume.textContent = "resume";
    pause.textContent = "pause";

    // set atributes
    title.setAttribute("class", "title");
    start.setAttribute("class", "controlBtn");
    restart.setAttribute("class", "controlBtn");
    resume.setAttribute("class", "controlBtn");
    pause.setAttribute("class", "controlBtn");
    controller.append(title, start, restart, resume, pause);
    controller.classList.add("show");
    document.body.appendChild(controller);

    // hide the buttons that should:
    if (this.gameStatus === "initial") {
      restart.classList.add("hidden");
      resume.classList.add("hidden");
      pause.classList.add("hidden");

      restart.classList.remove("show");
      resume.classList.remove("show");
      pause.classList.remove("show");
    } else {
      start.classList.remove("show");
      start.classList.add("hidden");

      restart.classList.remove("hidden");
      resume.classList.remove("hidden");
      pause.classList.remove("hidden");

      restart.classList.add("show");
      resume.classList.add("show");
      pause.classList.add("show");
    }

    this.controller = controller;
    this.pausebtn = pause;
    this.restartbtn = restart;
    this.startbtn = start;
    this.resumebtn = resume;
  }

  gameController() {
    if (this.gameStatus === "initial") {
      console.log("create");
      this.createBoard();
      this.gameStatus = "started";
    }
    ////////// resizing ///////////////
    const screenWidth = window.innerWidth;
    let unitSize = screenWidth * 0.02;
    unitSize = Math.max(20, Math.min(unitSize, 80));
    // document.body.innerHTML = "";

    ////////////// classes ////////////////
    let field = new Field(unitSize, this.stage);
    let hero = new Hero(unitSize);
    ////////////////////////////
    let enemies = [];

    //////////////// events //////////////////
    let controlBtns = document.querySelectorAll(".controlBtn");

    controlBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(">>------>", e.target.value);
        switch (e.target.value) {
          case "start":
            this.pausebtn.classList.remove("hidden");
            this.pausebtn.classList.add("show");

            this.startbtn.classList.remove("show");
            this.startbtn.classList.add("hidden");
            field.CreateBattleField();
            hero.createHero();
            hero.moveHero();
            this.gameController();
            let randomIds = field.randomEnemies;
            console.log(randomIds);
            randomIds.forEach((id) => {
              let enemy = new Enemy(id, field.width);
              enemy.createEnemy();
              enemy.moveEnemy();
              enemies.push(enemy);
            });
            break;
          case "restart":
            location.reload();
            break;
          case "resume":
            enemies.forEach((enemy) => {
              enemy.resumeAnimation();
            });
            break;
          case "pause":
            console.log(this.resumebtn)
            this.pausebtn.classList.remove("show");
            this.pausebtn.classList.add("hidden");
            this.restartbtn.classList.add("show")
            this.resumebtn.classList.add("show")
            this.restartbtn.classList.remove("hidden")
            this.resumebtn.classList.remove("hidden")
            enemies.forEach((enemy) => {
              enemy.pauseAnimation();
            });
            break;
          default:
            console.log("Something is not right");
        }
      });
    });

    // document.addEventListener("DOMContentLoaded", this.runGame)
    // document.addEventListener("resize", this.runGame)
  }

  runGame() {
    const screenWidth = window.innerWidth;
    let unitSize = screenWidth * 0.02;
    unitSize = Math.max(20, Math.min(unitSize, 80));
    document.body.innerHTML = "";
    let field = new Field(unitSize, this.stage);
    field.CreateBattleField();
    let hero = new Hero(unitSize);
    hero.createHero();
    hero.moveHero();
    field.handleLeftTime();
  }
}

let controller = new Control(1, 3, 0);
controller.gameController();
