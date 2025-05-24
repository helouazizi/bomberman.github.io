// js/control.js
import { Maps } from "./maps.js";
import { Field } from "./field.js";

export default class Control {
  constructor() {
    this.rows = 13;
    this.columns = 15;
    this.map = new Maps(this.rows, this.columns,1).getMap();

    this.startButton = document.getElementById("start-btn");
    this.startButton.addEventListener("click", () => this.startGame());

  }

  startGame() {
    console.log("Game starting...");
    console.table(this.map); // Debug
    const maxWidth = window.innerWidth * 0.9; // 90% width
    const maxHeight = window.innerHeight * 0.7; // 70% height

    const tileWidth = Math.floor(maxWidth / this.columns);
    const tileHeight = Math.floor(maxHeight / this.rows);

    const tileSize = Math.min(tileWidth, tileHeight); // square tiles, fit both directions
    // Default stage for now
    const stage = 1;
    const field = new Field(tileSize, stage, this.map)
    field.CreateBattleField();

  }
}

window.addEventListener("DOMContentLoaded", () => {
  const game = new Control();
});


