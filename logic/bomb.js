
export {Bomb}

class Bomb extends Hero {
    constructor(hero){
        this.hero = hero
    }

    // Function to create a bomb (Throw it and run):
    create() {
        let container = document.createElement("div")
        container.setAttribute("id", "bomb")
        this.hero.appendChild(this.container)

    }

    // Create an explosion:
    explode(){
        setTimeout(()=>{

        }, 500)
    }
}