export { Hero }
class Hero {

    constructor() {
        this.hero = null
        this.x = 0
        this.y = 0
    }

    createHero() {
        this.hero = document.createElement("div")
        this.hero.setAttribute("id", "hero")
        let first = document.getElementById("1")
        first.style.position = "relative"
        first.style.overflow = "visible";
        first.appendChild(this.hero)
       
    }
    // create a function  to handle the movement of the hero:
    moveHero() {
        document.addEventListener("keydown", (e) => {
            console.log(e.key);
        

            switch (e.key) {
                case "ArrowDown":
                    this.y++
                    break
                case "ArrowUp":
                    this.y--
                    break
                case "ArrowRight":
                    this.x++
                    break
                case "ArrowLeft":
                    this.x--
            }
          
            console.log(this.x);
            console.log(this.y);
            this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`
        })
    }
    getPosition = (element) => element.getBoundingClientRect()
}
