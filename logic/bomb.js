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

    // lets get the bomb location to extract the container that can hold the bomb
    let location = this.bringbombcontainer();
    // now we have the id of the container
    let bombContainer = document.getElementById(location);

    // lets append the bomb to it
    bombContainer.append(bomb);
    let wall = bombContainer.parentElement;
    let nextWall = wall.nextElementSibling;
    let prevWall = wall.previousElementSibling;

    let wallNodeList = wall.querySelectorAll(".brick");
    let nextWallNodeList = nextWall.querySelectorAll(".brick");
    let prevWallNodeList = prevWall.querySelectorAll(".brick");

    // console.log("wall", wall);
    // console.log("next wall", nextWall);
    // console.log("prev wall", prevWall);

    // console.log("wallnode", wallNodeList);
    // console.log("prev node", prevWallNodeList);
    // console.log("nex node", nextWallNodeList);

    let index = this.getDivIndex(wallNodeList);
    console.log(index);

    let rightDiv = bombContainer.nextElementSibling;
    let leftDiv = bombContainer.previousElementSibling;
    let topDiv = prevWallNodeList[index];
    let bottomDiv = nextWallNodeList[index];

    // console.log("current",bombContainer);
    // console.log("top",topDiv);
    // console.log("right",rightDiv);
    // console.log("bottom",bottomDiv);
    // console.log("left",leftDiv);

    let bombRange = [bombContainer, rightDiv, leftDiv, bottomDiv, topDiv];
    console.log(bombRange);

    setTimeout(() => {
      bombRange.forEach((div) => {
        if (div.classList.contains("gate") || div.classList.contains("path")) {
          div.classList.add("affected");
          // lets remove the solid classe to let the heroo pass
          if (div.classList.contains("solid")) {
            div.classList.remove("solid");
          }
        }
      });
      bombContainer.removeChild(bomb);
    }, 3000);
  }

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
    let index;
    let bomb = document.getElementById("bomb");
    let parent = bomb.parentElement;
    parent.setAttribute("here", "this-one");

    // Now you can access each element by index
    wall.forEach((element, divIndex) => {
      if (element.hasAttribute("here")) {
        index = divIndex;
        element.removeAttribute("here");
      }
    });
    return index;
  }

  getPosition = (element) => element.getBoundingClientRect();
}
