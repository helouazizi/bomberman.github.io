import { Field } from "./field.js";
import { Hero } from "./hero.js";

class Control {
    constructor(stage, lives, score) {
        this.stage = stage
        this.lives = lives
        this.score = score
        this.gameStatus = "initial"
        this.controller = null
    }



    createBoard() {
        let controller = document.createElement("div")
        controller.setAttribute("id", "controller")
        let start = document.createElement("button")
        let restart = document.createElement("button")
        let resume = document.createElement("button")


        // Add value to my buttons:
        start.value = "start"
        restart.value = "restart"
        resume.value = "resume"


        // Add text content to my btns
        start.textContent = "start"
        restart.textContent = "restart"
        resume.textContent = "resume"



        start.setAttribute("class", "controlBtn")
        restart.setAttribute("class", "controlBtn")
        resume.setAttribute("class", "controlBtn")
        controller.append(start, restart, resume)
        controller.classList.add("show")
        document.body.appendChild(controller)

        // hide the buttons that should:
        if (this.gameStatus === "initial") {
            restart.classList.add("hidden")
            resume.classList.add("hidden")
            restart.classList.remove("show")
            resume.classList.remove("show")
        } else {
            start.classList.remove("show")
            start.classList.add("hidden")
            restart.classList.remove("hidden")
            resume.classList.remove("hidden")

            restart.classList.add("show")
            resume.classList.add("show")
        }

        this.controller = controller
    }

    gameController() {
        if (this.gameStatus === "initial") {
            this.createBoard()
            this.gameStatus = "started"
        }

        let controlBtns = document.querySelectorAll(".controlBtn")


        controlBtns.forEach(btn => {

            btn.addEventListener("click", (e) => {
                console.log(">>------>", e.target.value);
                switch (e.target.value) {
                    case "start":
                        this.controller.classList.remove("show")
                        this.controller.classList.add("hidden")
                        this.runGame()
                        this.gameController()
                        break
                    case "restart":

                        break
                    case "resume":

                        break
                    case "pause":
                        this
                        console.log("pause test ====>");
                        e.target.classList.remove("show")
                        e.target.classList.add("hidden")
                       console.log( e.target);
                       
                        this.createBoard()
                        this.gameController()
                        break
                    default:
                        console.log("Something is not right");

                }
            })
        })
        // document.addEventListener("DOMContentLoaded", this.runGame)
        // document.addEventListener("resize", this.runGame)
    }

    runGame() {
        const screenWidth = window.innerWidth;
        // Calculate a responsive unit size based on window width
        let unitSize = screenWidth * 0.02;
        unitSize = Math.max(20, Math.min(unitSize, 80));
        // Optional: Clear previous game content
        document.body.innerHTML = ''

        let field = new Field(unitSize, this.stage);
        field.CreateBattleField();

        let hero = new Hero(unitSize);
        hero.createHero();
        hero.moveHero();
        field.handleLeftTime();
    }

}


let controller = new Control(1, 3, 0)
controller.gameController()