export { Field };

class Field {
  #tileCount = 0;

  constructor(tileSize, stage, map) {
    this.tileSize = tileSize;
    this.map = map;
    this.stage = stage;
    this.container = null;
    this.battleField = null;
    this.enemies = [];
    this.time = 200;
    this.score = 0;
    this.left = 3;
    this.hero = null

    this.rows = map.length;
    this.columns = map[0].length;
  }

  createElement(tag, { id, classNames = [], innerHTML, styles = {} } = {}) {
    const el = document.createElement(tag);
    if (id) el.id = id;
    if (classNames.length) el.classList.add(...classNames);
    if (innerHTML) el.innerHTML = innerHTML;
    Object.assign(el.style, styles);
    return el;
  }

  createContainer() {
    this.container = this.createElement("div", {
      id: "container",
      styles: {
        width: `${this.tileSize * this.columns}px`,
        height: "fit-content",
      },
    });
    document.body.appendChild(this.container);
  }

  createDashboard() {
    const dashboard = this.createElement("div", {
      id: "dashboard",
      classNames: ["dashboard-container"],
      styles: { display: "flex", justifyContent: "space-between", marginBottom: "8px" },
    });

    const time = this.createElement("div", {
      id: "time",
      classNames: ["dashboard"],
      innerHTML: `<strong>Time: <span id="timeCounter">${this.time}</span></strong>`,
    });

    const score = this.createElement("div", {
      classNames: ["dashboard"],
      innerHTML: `<strong id="score">${this.score}</strong>`,
    });

    const attempts = this.createElement("div", {
      id: "attempts",
      classNames: ["dashboard"],
      innerHTML: `<p>Left: <span id="left">${this.left}</span></p>`,
    });

    dashboard.append(time, score, attempts);
    this.container.appendChild(dashboard);
  }

  createBattleField() {
    this.battleField = this.createElement("div", {
      id: "battleField",
      styles: {
        position: "relative",
        display: "grid",
        gridTemplateRows: `repeat(${this.rows}, ${this.tileSize}px)`,
        gridTemplateColumns: `repeat(${this.columns}, ${this.tileSize}px)`,
        gap: "0",
        width: `${this.columns * this.tileSize}px`,
        height: `${this.rows * this.tileSize}px`,
        padding: "0", 
        backgroundColor: "var(--color-bg-dark)",
        borderRadius: "10px",
        boxShadow: "0 0 30px 5px rgba(0, 0, 0, 0.4)",
      },
    });

    this.#tileCount = 0;

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        const tileType = this.map[y][x];
        const tileId = `tile-${y * this.columns + x + 1}`;

        if (tileType === 3) {
          // Enemy position will be managed separately, so create a path tile here
          const pathTile = this.createElement("div", {
            id: tileId,
            classNames: ["brick", "path"],
            styles: {
              width: `${this.tileSize}px`,
              height: `${this.tileSize}px`,
            },
          });
          this.battleField.appendChild(pathTile);

          // Create enemy element positioned absolutely
          const enemy = this.createElement("div", {
            classNames: ["enemy"],
            styles: {
              width: `${this.tileSize}px`,
              height: `${this.tileSize}px`,
              top: `${y * this.tileSize}px`,
              left: `${x * this.tileSize}px`,
              position: "absolute",
              backgroundImage: 'url("../img/monster.png")',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              zIndex: 10,
            },
          });

          this.battleField.appendChild(enemy);
          this.enemies.push({ element: enemy, x, y });

          this.#tileCount++;
        } else if (tileType === -1) {
          // Create path tile under hero
          const pathTile = this.createElement("div", {
            id: tileId,
            classNames: ["brick", "path"],
            styles: {
              width: `${this.tileSize}px`,
              height: `${this.tileSize}px`,
            },
          });
          this.battleField.appendChild(pathTile);
    
          // Create hero element
          this.hero = this.createElement("div", {
            id: "hero",
            classNames: ["hero"],
            styles: {
              width: `${this.tileSize}px`,
              height: `${this.tileSize}px`,
              top: `${y * this.tileSize}px`,
              left: `${x * this.tileSize}px`,
              position: "absolute",
              // backgroundImage: 'url("../img/hero.png")',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              zIndex: 20,
            },
          });

          this.battleField.appendChild(this.hero);
          this.heroPosition = { x, y }; // Save position if needed for movement
          this.#tileCount++;
    
        }else {
          // Create tile according to type
          const tile = this.createElement("div", {
            id: tileType === 0 ? tileId : undefined,
            styles: {
              width: `${this.tileSize}px`,
              height: `${this.tileSize}px`,
            },
          });

          switch (tileType) {
            case 0:
              tile.classList.add("brick", "path");
              this.#tileCount++;
              break;
            case 1:
              tile.classList.add("solid", "borders");
              break;
            case 2:
              tile.classList.add("solid", "gate");
              break;
            default:
              tile.classList.add("brick", "path");
              this.#tileCount++;
              break;
          }

          this.battleField.appendChild(tile);
        }
      }
    }

    this.container.appendChild(this.battleField);
  }

  initEnemyMovement() {
    const speed = 1; // pixels per frame
    const tileSize = this.tileSize;
  
    const directions = [
      { dx: 1, dy: 0 },   // right
      { dx: -1, dy: 0 },  // left
      { dx: 0, dy: 1 },   // down
      { dx: 0, dy: -1 },  // up
    ];
  
    this.enemies.forEach(enemy => {
      if (enemy.dirIndex === undefined) enemy.dirIndex = 0;
      
      const size = tileSize / 1.1; // Slightly smaller than tile for better fit
      enemy.size = size;
  
      if (enemy.px === undefined || enemy.py === undefined) {
        // Center the enemy in its starting tile
        enemy.px = enemy.x * tileSize + (tileSize - size) / 2;
        enemy.py = enemy.y * tileSize + (tileSize - size) / 2;
      }
  
      // Set size via CSS if not already
      enemy.element.style.width = `${size}px`;
      enemy.element.style.height = `${size}px`;
      enemy.element.style.position = 'absolute';
    });
  
    const canMoveTo = (px, py, size) => {
      const leftTile = Math.floor(px / tileSize);
      const rightTile = Math.floor((px + size - 1) / tileSize);
      const topTile = Math.floor(py / tileSize);
      const bottomTile = Math.floor((py + size - 1) / tileSize);
  
      for (let ty = topTile; ty <= bottomTile; ty++) {
        for (let tx = leftTile; tx <= rightTile; tx++) {
          if (ty < 0 || ty >= this.rows || tx < 0 || tx >= this.columns) return false;
          const tile = this.map[ty][tx];
          if (tile !== 0 && tile !== 3) return false;
        }
      }
      return true;
    };
  
    const move = () => {
      this.enemies.forEach(enemy => {
        const dir = directions[enemy.dirIndex];
        const nextPx = enemy.px + dir.dx * speed;
        const nextPy = enemy.py + dir.dy * speed;
        const size = enemy.size;
  
        if (canMoveTo(nextPx, nextPy, size)) {
          enemy.px = nextPx;
          enemy.py = nextPy;
  
          // Update grid position for internal logic
          enemy.x = Math.floor((enemy.px + size / 2) / tileSize);
          enemy.y = Math.floor((enemy.py + size / 2) / tileSize);
        } else {
          enemy.dirIndex = (enemy.dirIndex + 1) % directions.length;
        }
  
        // Update DOM position
        enemy.element.style.left = `${enemy.px}px`;
        enemy.element.style.top = `${enemy.py}px`;
      });
  
      requestAnimationFrame(move);
    };
  
    requestAnimationFrame(move);
  }
  CreateBattleField() {
    this.createContainer();
    this.createDashboard();
    this.createBattleField();
    this.initEnemyMovement()
  }
}
