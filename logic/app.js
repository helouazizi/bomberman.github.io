import { Field } from "./field.js";
import { Hero } from "./hero.js";

// let feild = new Field(width);
// feild.CreateBattleField();
// let hero = new Hero();
// hero.createHero();
// hero.moveHero();
// feild.handleLeftTime();
function setupGame() {
  const screenWidth = window.innerWidth;
  // Calculate a responsive unit size based on window width
  let unitSize = screenWidth * 0.02;
  unitSize = Math.max(20, Math.min(unitSize, 80));
    // Optional: Clear previous game content
   document.body.innerHTML = ''
  // Initialize the field and hero with new unit size
  console.log(unitSize,"size");
  
  let field = new Field(unitSize);
  field.CreateBattleField();

  let hero = new Hero(unitSize);
  hero.createHero();
  hero.moveHero();
  field.handleLeftTime();
}
// Run once when DOM is ready
window.addEventListener("DOMContentLoaded", setupGame);

// Re-run on resize to adapt layout
window.addEventListener("resize", setupGame);
