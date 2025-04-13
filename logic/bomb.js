export { Bomb };

class Bomb extends Hero {
<<<<<<< HEAD
    constructor(hero){
        this.hero = hero
    }
    // Function to create a bomb (Throw it and run):
    create() {
        let container = document.createElement("div")
        container.setAttribute("id", "bomb")
        this.hero.appendChild(this.container)
=======
  constructor(hero) {
    this.hero = hero;
  }

  // Function to create a bomb (Throw it and run):
  create() {
    let container = document.createElement("div");
    container.setAttribute("id", "bomb");
    this.hero.appendChild(this.container);
  }
  // lets get the boomb locations
  bringbomblocation() {
    let heropostions = this.getPosition(this.hero);
    let elements = document.querySelectorAll(".path");
    let location 
    elements.forEach((elment) => {
        let elmentPositions = this.getPosition(elment)
        if (elmentPositions.bottom >= heropostions.bottom && elmentPositions.right >= heropostions.right &&  )
    });
  }
>>>>>>> ab9f94a7f9b75c7da99899a85ea98a235ba1acae

  // Create an explosion:
  explode() {
    setTimeout(() => {}, 500);
  }

  getPosition = (element) => element.getBoundingClientRect();
}
