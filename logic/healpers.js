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

  let bombRange = [element,topDiv, rightDiv, bottomDiv,leftDiv ];
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
