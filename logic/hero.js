import { Field } from './field.js'
export { Hero }
class Hero {

    constructor() {
        this.hero = null
        this.x=0
        this.y=0
    }

    createHero() {

        this.hero = document.createElement("div")
        this.hero.setAttribute("id", "hero")
        let first = document.getElementById("1")
        first.appendChild(this.hero)
       
    }
    // create a function  to handle the movement of the hero:
    moveHero() {
        document.addEventListener("keydown", (e) => {
            console.log(e.key);
              let position= this.getPosition(this.hero)
              this.x = position.x
              this.y=position
                   
            switch (e.key) {
                case "ArrowDown":
                 this.y--
                case "ArrowUp":
                    this.y++
                case "ArrowRight":
                    this.x++
                case "ArrowLeft":
                    this.x--
            }

             this.hero.style.transform=`translate( ${this.x}px,${this.y}px)`
        })
     

    }
    getPosition = (element) => element.getBoundingClientRect()


}
