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
    this.leftTime = 500;
    this.intervalId = null;
    this.counter = null;
    this.attemps = 3;
    this.isPaused = false;
    this.enemies = [];
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
    pause.setAttribute("id", "pauseBtn");
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
      startTimer;
    }
    this.controller = controller;
    this.pausebtn = pause;
    this.restartbtn = restart;
    this.startbtn = start;
    this.resumebtn = resume;
  }

  startTimer() {
    if (this.intervalId !== null) return; // Don't start a new timer if one is running

    this.intervalId = setInterval(() => {
      this.counter.textContent = this.leftTime;
      this.leftTime--;
      if (this.leftTime < 0) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.counter.textContent = "0";
        let popup = document.createElement("div");
        popup.setAttribute("id", "popup");
        popup.classList.add("show");
        popup.textContent = "Time is up!!!";
        document.body.appendChild(popup);
        this.pausebtn.classList.add("dead");
        this.pausebtn.click();
        setTimeout(() => {
          popup.style.display = "none";
        }, 3000);
      }
    }, 1000);
  }

  pauseTimer() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isPaused = true;
    }
  }

  resumeTimer() {
    if (this.isPaused && this.intervalId === null) {
      this.isPaused = false;
      this.startTimer();
    }
  }

  postScore() {
    const playerName = document.getElementById("player-name").value.trim();
    const playerScore = document.getElementById("score").innerText;
    console.log(playerName, playerScore, "info");

    if (!playerName) {
      alert("Please enter your name.");
      return;
    }

    fetch("http://localhost:5051/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: playerName, score: parseInt(playerScore) }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to submit player");
          throw new Error("Failed to submit player");
        }
        return response.json();
      })
      .then((updatedScores) => {
        console.log(updatedScores);
      })
      .catch((error) => {
        alert("There was an error. Please try again.");
      });
  }

  gameController() {
    if (this.gameStatus === "initial") {
      this.createBoard();
      this.gameStatus = "started";
    }

    console.log(document.getElementsByClassName("door")[0], "dooooor");
    ////////// resizing ///////////////
    const screenWidth = window.innerWidth;
    let unitSize = screenWidth * 0.02;
    unitSize = Math.max(20, Math.min(unitSize, 80));
    // document.body.innerHTML = "";
    ////////////// classes ////////////////
    let field = new Field(unitSize, this.stage);
    let hero = new Hero(unitSize);
    ////////////////////////////

    //////////////// events //////////////////
    let controlBtns = document.querySelectorAll(".controlBtn");
    controlBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e.target.value === "start") {
          this.pausebtn.classList.remove("hidden");
          this.pausebtn.classList.add("show");
          this.startbtn.classList.remove("show");
          this.startbtn.classList.add("hidden");
          field.CreateBattleField();
          this.counter = document.getElementById("timeCounter");
          hero.createHero();
          hero.moveHero();

          this.gameController();
          let randomIds = field.randomEnemies;
          randomIds.forEach((id) => {
            let enemy = new Enemy(id, field.width);
            enemy.createEnemy();
            enemy.moveEnemy();
            this.enemies.push(enemy);
          });

          this.startTimer();
        } else if (e.target.value === "restart") {
          location.reload();
        } else if (e.target.value === "resume") {
          this.resumeTimer();
          this.pausebtn.classList.remove("hidden");
          this.pausebtn.classList.add("show");
          this.restartbtn.classList.remove("show");
          this.resumebtn.classList.remove("show");
          this.restartbtn.classList.add("hidden");
          this.resumebtn.classList.add("hidden");

          hero.pause = false;
          this.enemies.forEach((enemy) => {
            enemy.resumeAnimation();
          });
        } else if (e.target.value === "pause") {
          this.pauseTimer();
          this.pausebtn.classList.remove("show");
          this.pausebtn.classList.add("hidden");
          this.restartbtn.classList.add("show");
          this.resumebtn.classList.add("show");
          this.restartbtn.classList.remove("hidden");
          this.resumebtn.classList.remove("hidden");
          if (this.pausebtn.classList.contains("dead")) {
            this.attemps--;
            hero.x = 0;
            hero.y = 0;
            this.pausebtn.classList.remove("dead");
            if (this.attemps <= 0) {
              let popup = document.createElement("div");
              popup.setAttribute("id", "popup");
              popup.classList.add("show");
              popup.textContent = "Game over!!";
              document.body.appendChild(popup);
              this.controller.style.display = "none";

              setTimeout(() => {
                location.reload();
              }, 2000);
            }
          }

          hero.pause = true;

          this.enemies.forEach((enemy) => {
            enemy.pauseAnimation();
          });
        } else if (e.target.value === "submit") {
          console.log("hhhhhhhhhhhhhhhhhhh");
          this.controller.classList.add("show");
          this.controller.classList.remove("hidden");
          this.postScore();
          setTimeout(()=>{},5000)
          // return
        }
      });
    });

    /////////////////////  win //////////////
  }
}

let controller = new Control(1, 3, 0);
controller.gameController();
