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
            console.log(this.getWallId() ,"wallid");
            
            this.hero.style.transform = `translate( ${this.x}px,${this.y}px)`
        })
    }
    // get the wall id:
    getWallId(){
        let walls=document.querySelectorAll(".wall")
        let heroPosition = this.getPosition(this.hero)
        let id = 0
        walls.forEach(wall => {
            let wallPosition = this.getPosition(wall)
          
        
            
            if (wallPosition.top <= heroPosition.top && wallPosition.bottom >= heroPosition.bottom){
                id = wall.getAttribute("id")
            }

            
            
        });
        return id

    }
    // create a checker  function to move the hero in left and right derictions:
    canMoveRight(id="wall-3"){
        let wall = document.getElementById(id)
        let bricks=wall.getElementsByClassName("solid")
        console.log(bricks);
        

        
    }
    getPosition = (element) => element.getBoundingClientRect()
}
