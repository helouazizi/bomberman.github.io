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
function getVerticalBricks(element, direction = "down") {
  let bricks = document.querySelectorAll(".solid");
  let position = getPosition(element);
  let elements = [];
  bricks.forEach((brick) => {
    let hinder = getPosition(brick);
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

export function canMoveVertically(element, direction = "down") {
  let can = true;
  let elements = getVerticalBricks(element, direction);
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

// Create a function  to generate the story of the game:
export function generate_game_story(paragraph_index, img_index) {
  let body = document.body;
  body.innerHTML = "";

  let story = document.createElement("div");
  story.id = "story";

  let text = document.createElement("p")
  text.setAttribute("id", "story_text")

  let img_story = document.createElement("img")
  img_story.setAttribute("id", "story_text")
  

  const paragraphs = [
    ["The year is 3087. Far beyond the Milky Way...",
      "One dark night, space raiders from a rival galaxy steal the Core...",
      "You are Zylo, a young alien tasked with a desperate mission...",
      "Board your hovercraft, navigate the cosmic fields and chase down the raiders!",],
      [
        "After countless battles and narrow escapes, Zylo picks up a distress signal.",
        'It’s a transmission from a captured Zeloran elder, revealing the raiders hideout hidden inside a massive asteroid belt called the "Crimson Thorns."',
        "However, it’s a trap: the path is filled with deadly drones and collapsing meteors!",
        "Zylo must stay sharp, push forward, and reach the Core before the last light of Zelora fades.",
      ],
      [
        "Against all odds, Zylo defeats the raider leader and seizes back the Core of Life.",
        "Returning to Zelora, Zylo restores the Core to its sacred temple.",
        "Slowly, life blooms again, and the skies turn from a dull gray to vibrant colors.",
        "Zylo becomes a hero, and a new age of peace begins — thanks to your bravery!",
      ],
      [
        "The last flicker of Zelora's energy dies out as the Core remains in enemy hands.",
        "The once-lush planet becomes a barren wasteland, its people scattered among the stars.",
        "Zylo's mission ends in silence... but legends say another hero may one day rise to finish what was started.",
      ]
  ];

  const images = [
    "../img/start_story_img.png",
    "../img/mid_story_img.png",
    "../img/win_story_img.png",
    "../img/lose_story_img.png",
  ]

  text.textContent = paragraphs[paragraph_index][0];
  img_story.src = images[img_index]
  story.append(text, img_story);

  body.appendChild(story);

  let index = 1;
  const interval = setInterval(() => {
    if (index < paragraphs.length) {
      text.textContent = paragraphs[paragraph_index][index];
      index++;
    } else {
      clearInterval(interval);
        setTimeout(() => {
          story.remove()
        }, 1000)
    }
  }, 5000);
}

export const getPosition = (element) => element.getBoundingClientRect();
