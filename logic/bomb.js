export { Bomb };
class Bomb {
  constructor(hero, x, y) {
    this.hero = hero;
    this.x = x;
    this.y = y;
  }
  //// jkjk

  // Function to create a bomb (Throw it and run):
  create() {
    let bomb = document.createElement("div");
    bomb.setAttribute("id", "bomb");
    bomb.style.backgroundColor = "blue";
    bomb.style.width = `100%`;
    bomb.style.height = `100%`;
    let location = this.bringbombcontainer();
    console.log(location);

    let element = document.getElementById(location);
    // let elementPosition = this.getPosition(element)
    // let rightDev = element.nextElementSibling
    // let leftDev = element.previousElementSibling
    let wall = element.parentElement;
    let wallId = parseInt(wall.getAttribute("id").split("-")[1]);
    console.log(wallId,"uuu");
    
    let nextWall = document.getElementById(`wall-${wallId+1}`);
    let prevWall = document.getElementById(`wall-${wallId-1}`);

    // console.log("rihdev",rightDev);
    // console.log("curent",element);
    // console.log("leftdev",leftDev);
    console.log(element.parentElement);
    console.log(nextWall);
    console.log(prevWall);

    // console.log("top",topDiv);
    // console.log("bottom",bottomDiv);

    element.append(bomb);
    setTimeout(() => {
      element.removeChild(bomb);
    }, 2000);
  }

  // bring4Divs() {

  // }

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
