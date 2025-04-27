import { getFourDivs } from "./healpers.js";
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

    bomb.style.width = `100%`;
    bomb.style.height = `100%`;

    // lets get the bomb location to extract the container that can hold the bomb
    let location = this.bringbombcontainer();
    // now we have the id of the container
    let bombContainer = document.getElementById(location);

    // lets append the bomb to it
    bombContainer.append(bomb);
    const bombRange = getFourDivs(bombContainer, "bomb");

    setTimeout(() => {
      bombRange.forEach((div) => {
        if (
          div.classList.contains("gate") ||
          div.classList.contains("path") ||
          div.classList.contains("enemy")
        ) {
          div.classList.add("affected");
          // lets remove the solid classe to let the heroo pass
          if (div.classList.contains("solid")) {
            div.classList.remove("solid");
          }
          if (div.classList.contains("gate")) {
            div.classList.remove("gate");
          }
          if (div.classList.contains("enemy")) {
            div.classList.remove("enemy");
          }
          if (div.classList.contains("door")) {
            div.classList.add("door-img");
          }
          
        }
      });
      
    }, 3000);
    setTimeout(() => {
      bombRange.forEach((div) => {
        div.classList.remove("affected");
      });
      bombContainer.removeChild(bomb);
    }, 4000);
    // lets remove the effect
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

  getPosition = (element) => element.getBoundingClientRect();
}
