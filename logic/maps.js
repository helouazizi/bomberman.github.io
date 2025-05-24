class Maps {
  constructor(stage) {
    this.stage = stage;
    this.rows = 13;
    this.colloms = 15;
    this.randomGates = new Set();
    this.randomEnemies = new Set();
  }

  // sunction to create map
  generateTileMap() {
    // Initialize empty map
    this.generateRandomIds(1, 113, "gate");
    this.generateRandomIds(34, 113, "enemies");

    const TILE_TYPES = {
      EMPTY: 0,
      WALL: 1,
      GATE: 2,
      ENEMY: 3,
    };

    const map = [];
    // const totalTiles = this.rows * this.colloms;

    for (let y = 0; y < this.rows; y++) {
      const row = [];
      for (let x = 0; x < this.colloms; x++) {
        const id = y * this.colloms + x + 1;
    
        // Outer boundary walls
        if (
          y === 0 ||
          y === this.rows - 1 ||
          x === 0 ||
          x === this.colloms - 1
        ) {
          row.push(TILE_TYPES.WALL);
        } 
        // Add inner indestructible walls in a checkerboard pattern
        else if (x % 2 === 0 && y % 2 === 0) {
          row.push(TILE_TYPES.WALL);
        } 
        // Place gates and enemies
        else if (this.randomGates.has(id)) {
          row.push(TILE_TYPES.GATE);
        } else if (this.randomEnemies.has(id)) {
          row.push(TILE_TYPES.ENEMY);
        } 
        // Empty spaces
        else {
          row.push(TILE_TYPES.EMPTY);
        }
      }
      map.push(row);
    }
    
    return map;
  }

  // Genrate the breakable walls randomly:
  generateRandomIds(min, max, choice) {
    let enemiesCount;
    let gateCount;
    switch (this.stage) {
      case 2:
        gateCount = 25;
        enemiesCount = 6;
        break;
      case 3:
        gateCount = 30;
        enemiesCount = 8;
        break;
      default:
        gateCount = 20;
        enemiesCount = 4;
    }

    let edge = gateCount;

    if (choice === "enemies") {
      edge = enemiesCount;
    }

    let checker = new Set();
    do {
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (choice === "enemies" && !this.randomGates.has(num)) {
        this.randomEnemies.add(num);
        checker.add(num);
      } else if (choice === "gate" && num != 1 && num != 14 && num != 2) {
        this.randomGates.add(num);
        checker.add(num);
      }
    } while (checker.size < edge);
  }
}


export {Maps}
