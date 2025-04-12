export { Hero }
class Hero {

    constructor() {
        this.hero = null
        this.x = 2
        this.y = 2
    
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
                    console.log(this.getPosition(this.hero), "hero!");
                
                    if (this.canMoveVertically("down")) {
                        this.y++
                    }
                    break
                case "ArrowUp":
                console.log(this.getPosition(this.hero), "hero!");
                
                    if (this.canMoveVertically("up")) {
                        this.y--
                    }
                    break
                case "ArrowRight":
                    if (this.canMoveHorizontally("right")) {
                        this.x++
                    }
                    break
                case "ArrowLeft":
                    if (this.canMoveHorizontally()) {
                        this.x--
                    }
            }
            this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`
        })

    }

    // check the horizontal movement:
    canMoveHorizontally(direction = "left") {
        let can = true
        let elements = this.getHorizontalBricks(direction)
        let position = this.getPosition(this.hero)
        elements.forEach(element => {
            if (direction === "right") {
                if (!(position.right + 2 < element.left)) {
                    can = false
                }
            } else {
                if( !(position.left - 2 > element.right)) {
                    can = false
                }
            }
        })
        return can
    }

    // Get all the bricks in the horizontal range:
    getHorizontalBricks(direction = "left") {
        let bricks = document.querySelectorAll(".solid")
        let position = this.getPosition(this.hero)
        let elements = []
        bricks.forEach(brick => {
            let hinder = this.getPosition(brick)
            if (position.top > hinder.top - position.height && position.bottom < hinder.bottom + position.height) {
                if (direction === "left" && position.left > hinder.right) {
                    elements.push(hinder)
                } else if (direction === "right" && position.right < hinder.left) {
                    elements.push(hinder)
                }
            }
        })
        

        return elements
    }
    // check the vertical movement:
    canMoveVertically(direction = "down") {
        let can = true
        let elements = this.getVerticalBricks(direction)
        let position = this.getPosition(this.hero)
        elements.forEach(element => {
            if (direction === "up") {
                if (position.top -2 <  element.bottom) {
                    can = false
                }
            } else {
                if (position.bottom + 2 >  element.top) {
                    can = false
                }
            }
        })
        return can
    }

    // Get all the bricks in the vertical range:
    getVerticalBricks(direction = "down") {
        let bricks = document.querySelectorAll(".solid")
        let position = this.getPosition(this.hero)
        let elements = []
        bricks.forEach(brick => {
            let hinder = this.getPosition(brick)
            if (position.right < hinder.right + position.width && position.left > hinder.left - position.width) {
                if (direction=== "down" && position.bottom < hinder.top){
                    elements.push(hinder)
                }else if (direction === "up" && position.top > hinder.bottom ) {
                    elements.push(hinder)

                }
            }

        })
     console.log(elements);
     
     

        return elements
    }



    getPosition = (element) => element.getBoundingClientRect()
}
