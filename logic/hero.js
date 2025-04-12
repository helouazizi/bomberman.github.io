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
                    if(this.canMoveHorizontally()) {
                        this.y++
                    }
                    
                    

                    break
                case "ArrowUp":
                    if(this.canMoveHorizontally("up")) {
                        this.y--
                    }
                    

                    

                    break
                case "ArrowRight":
                    if(this.canMoveHorizontally("right")) {
                        this.x++
                    }
                    break
                case "ArrowLeft":
                    if(this.canMoveHorizontally()) {
                        this.x--
                    }
            }

            this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`
        })

    }

    // check the horizontal movement:
    canMoveHorizontally(direction = "left") {
        let can = true
        let elements = this.getHorizontalBricks()
        let position = this.getPosition(this.hero)
        elements.forEach(element =>{
            if (direction === "right") {
                if(!(position.right + 2 <=  element.left ) && !(position.left-2 >= element.right )) {
                    can = false 
                }
            } else {
                if(!(position.left -2 >= element.right) && !(position.right+2 <= element.left) ) {
                    can = false
                }  
            }
        })
        return can
    }

    // Get all the bricks in the horizontal range:
    getHorizontalBricks() {
        let bricks = document.querySelectorAll(".solid")
        let position = this.getPosition(this.hero)
        let elements = []
        bricks.forEach(brick => {
            let hinder = this.getPosition(brick)
            if (position.top > hinder.top - position.height && position.bottom < hinder.bottom + position.height) {
                elements.push(hinder)
            }
        })
        console.log(elements, "elements");

        return elements
    }
    // check the vertical movement:
    canMoveVertically(direction = "down") {
        let can = true
        let elements = this.getHorizontalBricks()
        let position = this.getPosition(this.hero)
        elements.forEach(element =>{
            if (direction === "up") {
                if(!(position.top <=  element.bottom ) && !(position.bottom+2>= element.top )) {
                    can = false 
                }
            } else {
                if(!(position.botto>= element.top) && !(position.top-2 <= element.bottom) ) {
                    can = false
                }  
            }
        })
        return can

    }

    // Get all the bricks in the vertical range:
    getVerticalBricks() {
        let bricks = document.querySelectorAll(".solid")
        let position = this.getPosition(this.hero)
        let elements = []
        bricks.forEach(brick => {
            let hinder = this.getPosition(brick)
            if (position.left > hinder.left - position.width && position.right < hinder.right + position.width) {
                elements.push(hinder)
            }
        })
        

        return elements
    }



    getPosition = (element) => element.getBoundingClientRect()
}
