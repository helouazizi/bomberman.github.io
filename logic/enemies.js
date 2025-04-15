import { Hero  } from "./hero.js";
class Enemy extends Hero {
    constructor( enemiesCount) {
        this.enemiesCount = enemiesCount
        this.enemy = null
        this.x = 0
        this.y =0
        
    }
   // create the enemies 
   createEnimies(){

    this.enemiesCount.forEach((id) => {
      let enemy = document.createElement("div")
      enemy.classList.add("enemy")
      let brick = document.getElementById(`${id}`)

      brick.appendChild(enemy)
    this.enemy=enemy
    })
  }
  // move the enemies
  moveEnimies(){
    setInterval(()=>{
     if (this.canMoveHorizontally(this.enemy, "left")) {
      this.x--

      
     } 
     if(this.canMoveHorizontally(this.enemy, "right")){
      this.x++
     }
     if (this.canMoveVertically(this.enemy, "up")) {
      this.y--
      
     }
     if (this.canMoveVertically(this.enemy, "down")) {
      this.y++
      
     }
    }, 16.67)
  }


}
export{ Enemy }