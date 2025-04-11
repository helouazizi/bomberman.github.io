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
                    if(this.moverChecker(Positions,2)){
                        this.y++
                    }
         
                    break
                case "ArrowUp":
                    if(this.moverChecker(Positions,1)){
                        this.y--

                    }
                    
             
                       
                
                    break

                case "ArrowRight":
                    this.x++
                    break
                case "ArrowLeft":
                    this.x--
            }
            
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
    // another aproch
    Positions(){
        let battleField = document.getElementById("battleField")
        let walls = battleField.querySelectorAll(".solid")
   
        let Positions =[]
         walls.forEach((wall)=>{
            let position = this.getPosition(wall)
            Positions.push(position)
          
        })
        return Positions
        
        
        
        
    }
    moverChecker(Positions=[],deriction=0){
        let heroPosition= this.getPosition(this.hero)
        console.log(heroPosition);
        let bool = true
        
        Positions.forEach(pos=>{
           
            if (deriction ===1 &&( pos.left<= heroPosition.left && pos.right>= heroPosition.right)&& heroPosition.top <= pos.bottom&& heroPosition.bottom >= pos.top){
                bool = false
            } else if(deriction == 2 && (pos.left<= heroPosition.left && pos.right>= heroPosition.right)&& heroPosition.bottom >= pos.top&& heroPosition.top <= pos.bottom){
                bool = false
            }

        })
        return bool
        
        


    }
    getPosition = (element) => element.getBoundingClientRect()
}
//bottom
// : 
// 230.015625
// height
// : 
// 41.625
// left
// : 
// 257.5
// right
// : 
// 291.828125
// top
// : 
// 188.390625
// width
// : 
// 34.328125
// x
// : 
// 257.5
// y
// : 
// 188.39062
