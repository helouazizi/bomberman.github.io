class Enemy {
    constructor( enemiesCount) {
        this.enemiesCount = enemiesCount
        
    }
   // create the enemies 
   createEnimies(){
    this.enemiesCount.forEach((id) => {
      let brick = document.getElementById(`${id}`)
      brick.classList.add("enemy")
    })
  }

}
export{ Enemy }