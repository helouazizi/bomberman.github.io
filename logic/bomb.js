export { Bomb };
class Bomb {
  constructor(hero, x, y) {
    this.hero = hero;
    this.x = x;
    this.y = y;
  }

  // Function to create a bomb (Throw it and run):
  create() {
    let bomb = document.createElement("div");
    bomb.setAttribute("id", "bomb");
    bomb.style.backgroundColor = "blue";
    bomb.style.width = `100%`;
    bomb.style.height = `100%`;
    let location = this.bringbombcontainer();

    let element = document.getElementById(location);
    let elementPosition = this.getPosition(element);

    let rightDev = element.nextElementSibling;
    let leftDev = element.previousElementSibling;
    let topDiv;
    let bottomDiv;
    let wall = element.parentElement;
    let nextWall = wall.nextElementSibling;
    let prevWall = wall.previousElementSibling;
    // let loop throuth the walsss to extract the top and bottum divs
    let allnextWalElements = nextWall.querySelectorAll(".brick");
    let allprevWalElements = prevWall.querySelectorAll(".brick");
    allnextWalElements.forEach((div) => {
      let divPos = this.getPosition(div);

      if (
        parseInt(Math.round(divPos.left)) ===
          parseInt(Math.round(elementPosition.left)) &&
        parseInt(Math.round(divPos.right)) ===
          parseInt(Math.round(elementPosition.right))
      ) {
        bottomDiv = div;
      }
    });

    allprevWalElements.forEach((div) => {
      let divPos = this.getPosition(div);
      if (
        parseInt(Math.round(divPos.left)) ===
          parseInt(Math.round(elementPosition.left)) &&
        parseInt(Math.round(divPos.right)) ===
          parseInt(Math.round(elementPosition.right))
      ) {
        topDiv = div;
      }
    });
    let bombRange = [];
    bombRange.push(element, rightDev, leftDev, bottomDiv, topDiv);
    console.log("curent", bombRange);
    element.append(bomb);
    setTimeout(() => {
     
      bombRange.forEach((div) => {

        if (div.classList.contains("gate") || div.classList.contains("path")) {
          div.classList.add("affected");
          if (div.classList.contains("gate")) {
            div.classList.remove("solid");
          }
        }
      });
      element.removeChild(bomb);
    }, 3000);
  }

  // lets get the boomb locations:
  bringbombcontainer() {
    let elements = document.querySelectorAll(".path");
    var location;
    elements.forEach((elment) => {
      let elmentPositions = this.getPosition(elment);
      //console.log(elment);
      //console.log(elmentPositions);
      if (
        this.x > elmentPositions.left &&
        this.x < elmentPositions.right &&
        this.y > elmentPositions.top &&
        this.y < elmentPositions.bottom
      ) {
        location = elment.getAttribute("id");
      }
    });
    return location;
  }

  getPosition = (element) => element.getBoundingClientRect();
}
