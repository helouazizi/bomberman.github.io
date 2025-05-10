export function getFourDivs(element, id) {
  let wall = element.parentElement;
  let nextWall = wall.nextElementSibling;
  let prevWall = wall.previousElementSibling;

  let wallNodeList = wall.querySelectorAll(".brick");
  let nextWallNodeList = nextWall.querySelectorAll(".brick");
  let prevWallNodeList = prevWall.querySelectorAll(".brick");
  let index = getDivIndex(wallNodeList, id);
  //   console.log("index",index);
  let rightDiv = element.nextElementSibling;
  let leftDiv = element.previousElementSibling;
  let topDiv = prevWallNodeList[index];
  let bottomDiv = nextWallNodeList[index];

  let bombRange = [element, topDiv, rightDiv, bottomDiv, leftDiv];
  return bombRange;
}
// get the bomb index
function getDivIndex(wall, id) {
  let index;
  let element = document.getElementById(id);
  let parent = element.parentElement;
  parent.setAttribute("here", "this-one");
  parent.classList.add("solid")

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
      if (position.top -3 < element.bottom) {
        can = false;
      }
    } else {
      if (position.bottom + 3 >element.top) {
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
      if (!(position.left -3 > element.right)) {
        can = false;
      }
    }
  });
  return can;
}

export function bringElementAxis(element) {
  let obj = {};
  let position = getPosition(element);
  obj.x = Math.floor(position.x + position.width / 2);
  obj.y = Math.floor(position.y + position.height / 2);
  return obj;
}
export function isCollistion(target1, targetElement, width) {

  let dead = false;
  let targetCoordinates = getPosition(targetElement);
  let target1Coordinates = getPosition(target1);
  let targetAxis = bringElementAxis(targetElement);
  let target1Axix = bringElementAxis(target1);
  if (
    isCoixial(targetCoordinates, target1Axix, "y") &&
    targetAxis.y < target1Axix.y &&
    targetCoordinates.bottom + width > target1Coordinates.top
  ) {
    // hero.style.display = "none";
    dead = true;
  }

  // top
  if (
    isCoixial(targetCoordinates, target1Axix, "y") &&
    targetAxis.y > target1Axix.y &&
    targetCoordinates.top - width < target1Coordinates.bottom
  ) {
    // hero.style.display = "none";
    dead = true;
  }
  // right
  if (
    isCoixial(targetCoordinates, target1Axix, "x") &&
    targetCoordinates.right + width > target1Coordinates.left &&
    targetAxis.x < target1Axix.x
  ) {
    // hero.style.display = "none";
    dead = true;
  }

  //left
  if (
    isCoixial(targetCoordinates, target1Axix, "x") &&
    targetCoordinates.left - width < target1Coordinates.right &&
    target1Axix.x < targetAxis.x
  ) {
    // hero.style.display = "none";
    dead = true;
  }
  return dead;
}
 function isCoixial(coordes, axis, direction) {
  let coixial = false;
  switch (direction) {
    case "y":
      if (axis.x >= coordes.left && axis.x <= coordes.right) {
        coixial = true;
      }
      break;

    case "x":
      if (axis.y >= coordes.top && axis.y <= coordes.bottom) {
        coixial = true;
      }
      break;
  }

  return coixial;
}

// Function to render scores
function renderScores(scores) {
  const container = document.getElementById('scores-container');
  container.innerHTML = `
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        ${scores.map((player, index) => `
          <tr>
            <td>${getRankLabel(index)}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.time}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Helper function to show 1st/2nd/3rd/4th/etc
function getRankLabel(index) {
  const position = index + 1;
  if (position === 1) return "🥇 1st";
  if (position === 2) return "🥈 2nd";
  if (position === 3) return "🥉 3rd";
  return position + getOrdinalSuffix(position);
}

// Helper to add th/st/nd/rd
function getOrdinalSuffix(n) {
  if (n >= 11 && n <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export const getPosition = (element) => element.getBoundingClientRect();















