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
    // let elementPosition = this.getPosition(element);

    let wall = element.parentElement;
    let nextWall = wall.nextElementSibling;
    let prevWall = wall.previousElementSibling;


    element.append(bomb);
    let nextWallNodeList = Array.from(nextWall.querySelectorAll("div"))
    let prevWallNodeList =  Array.from(prevWall.querySelectorAll("div"))

    let index = this.getDivIndex(wall)
    console.log(index);
    
    let rightDiv = element.nextElementSibling;
    let leftDiv = element.previousElementSibling;
    let topDiv = prevWallNodeList[index]
    let bottomDiv = nextWallNodeList[index]


    let bombRange = [element, rightDiv, leftDiv, bottomDiv, topDiv]
    console.log(bombRange);


    setTimeout(() => {
      bombRange.forEach(div => {
        if (div.classList.contains("gate") || div.classList.contains("path")) {
          div.classList.add("affected")
        }
      })
      element.removeChild(bomb);
    }, 3000);
  }git 

  // lets get the boomb locations:
  bringbombcontainer() {
    let elements = document.querySelectorAll(".path");
    var location;
    elements.forEach((elment) => {
      let elmentPositions = this.getPosition(elment);
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
  // get the bomb index
  getDivIndex(wall) {
    const nodeList = wall.querySelectorAll('div')
    let index
    let bomb = document.getElementById("bomb")
    let parent = bomb.parentElement

    console.log(parent);
    console.log(bomb);

    // Convert NodeList to Array
    const nodeArray = Array.from(nodeList);

    // Now you can access each element by index
    nodeArray.forEach((element, ind) => {
      if (element === parent) {
        // console.log(`Element at index ${ind}:`, element);
        index = ind

      }
    });
    return index
  }

  getPosition = (element) => element.getBoundingClientRect();
}
