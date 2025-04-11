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

        let Positions = this.Positions()


        document.addEventListener("keydown", (e) => {
            console.log(e.key);


            switch (e.key) {
                case "ArrowDown":
                    if (this.moverChecker(Positions, 2)) {
                        this.y++
                    }

                    break
                case "ArrowUp":
                    if (this.moverChecker(Positions, 1)) {
                        this.y--

                    }
                    break

                case "ArrowRight":
                    if (this.moverChecker(Positions, 3)) {
                        this.x++
                        
                    }
                    break
                case "ArrowLeft":
                    if (this.moverChecker(Positions, 4)) {
                        this.x--
                    }
                    break
            }

            this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`
        })
    }

    // another aproch
    Positions() {
        let battleField = document.getElementById("battleField")
        let walls = battleField.querySelectorAll(".solid")

        let Positions = []
        walls.forEach((wall) => {
            let position = this.getPosition(wall)
            Positions.push(position)

        })
        return Positions




    }
    moverChecker(Positions = [], deriction = 0) {
        let heroPosition = this.getPosition(this.hero)
        console.log(heroPosition);
        let bool = true

        Positions.forEach(pos => {

            if (deriction === 1 && (pos.left <= heroPosition.left && pos.right >= heroPosition.right) && heroPosition.top <= pos.bottom && heroPosition.bottom >= pos.top) {
                bool = false
            } else if (deriction == 2 && (pos.left <= heroPosition.left && pos.right >= heroPosition.right) && heroPosition.bottom >= pos.top && heroPosition.top <= pos.bottom) {
                bool = false
            } else if (deriction == 3 && (pos.top <= heroPosition.top && pos.bottom >= heroPosition.bottom) && heroPosition.left <= pos.right && heroPosition.right >= pos.left) {
                bool = false

            } else if (deriction == 4 && (pos.top <= heroPosition.top && pos.bottom >= heroPosition.bottom) && heroPosition.right >= pos.left && heroPosition.left <= pos.right) {
                bool = false
                console.log(2);
                
            }

        })
        return bool




    }
    getPosition = (element) => element.getBoundingClientRect()
}
