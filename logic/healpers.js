export function getFourDivs(element, id) {
  let wall = element.parentElement;
  let nextWall = wall.nextElementSibling;
  let prevWall = wall.previousElementSibling;

  let wallNodeList = wall.querySelectorAll(".brick");
  let nextWallNodeList = nextWall.querySelectorAll(".brick");
  let prevWallNodeList = prevWall.querySelectorAll(".brick");

  //   console.log("wall", wall);
  //   console.log("next wall", nextWall);
  //   console.log("prev wall", prevWall);

  // console.log("wallnode", wallNodeList);
  // console.log("prev node", prevWallNodeList);
  // console.log("nex node", nextWallNodeList);

  let index = getDivIndex(wallNodeList, id);
  //   console.log("index",index);

  let rightDiv = element.nextElementSibling;
  let leftDiv = element.previousElementSibling;
  let topDiv = prevWallNodeList[index];
  let bottomDiv = nextWallNodeList[index];

  // console.log("current",element);
  // console.log("top",topDiv);
  // console.log("right",rightDiv);
  // console.log("bottom",bottomDiv);
  // console.log("left",leftDiv);

  let bombRange = [element, topDiv, rightDiv, bottomDiv, leftDiv];
  return bombRange;
}
// get the bomb index
function getDivIndex(wall, id) {
  let index;
  let element = document.getElementById(id);
  let parent = element.parentElement;
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

// Get all the bricks in the horizontal range:
function getHorizontalBricks(element, direction = "left") {
  let bricks = document.querySelectorAll(".solid");
  let position = getPosition(element);
  let elements = [];
  bricks.forEach((brick) => {
    let hinder = getPosition(brick);
    if (
      position.top > hinder.top - position.height &&
      position.bottom < hinder.bottom + position.height
    ) {
      if (direction === "left" && position.left > hinder.right) {
        elements.push(hinder);
      } else if (direction === "right" && position.right < hinder.left) {
        elements.push(hinder);
      }
    }
  });
  return elements;
}
function getVerticalBricks(element,direction = "down") {
  let bricks = document.querySelectorAll(".solid");
  let position =getPosition(element);
  let elements = [];
  bricks.forEach((brick) => {
    let hinder =getPosition(brick);
    if (
      position.right < hinder.right + position.width &&
      position.left > hinder.left - position.width
    ) {
      if (direction === "down" && position.bottom < hinder.top) {
        elements.push(hinder);
      } else if (direction === "up" && position.top > hinder.bottom) {
        elements.push(hinder);
      }
    }
  });
  return elements;
}

export function canMoveVertically(element,direction = "down") {
  let can = true;
  let elements = getVerticalBricks(element,direction);
  let position = getPosition(element);
  elements.forEach((element) => {
    if (direction === "up") {
      if (position.top - 3 < element.bottom) {
        can = false;
      }
    } else {
      if (position.bottom + 3 > element.top) {
        can = false;
      }
    }
  });
  return can;
}

export function canMoveHorizontally(element, direction = "left") {
  let can = true;
  let elements = getHorizontalBricks(element, direction);
  let position = getPosition(element);
  elements.forEach((element) => {
    if (direction === "right") {
      if (!(position.right + 3 < element.left)) {
        can = false;
      }
    } else {
      if (!(position.left - 3 > element.right)) {
        can = false;
      }
    }
  });
  return can;
}

export const getPosition = (element) => element.getBoundingClientRect();
