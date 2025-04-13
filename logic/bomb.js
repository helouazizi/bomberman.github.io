export { Bomb };

class Bomb extends Hero {
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

  // Create an explosion:
  explode() {
    setTimeout(() => {}, 500);
  }

  getPosition = (element) => element.getBoundingClientRect();
}
