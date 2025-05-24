// js/hero.js
export class Hero {
  constructor(x, y, tileSize) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;

    this.element = document.createElement("div");
    this.element.id = "hero";
    this.element.classList.add("hero");

    Object.assign(this.element.style, {
      width: `${tileSize}px`,
      height: `${tileSize}px`,
      position: "absolute",
      top: `${y * tileSize}px`,
      left: `${x * tileSize}px`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      zIndex: 20,
    });
  }
}
