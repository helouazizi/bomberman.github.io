export class Maps {
  constructor(rows, columns, stage = 1) {
    this.rows = rows;
    this.columns = columns;
    this.stage = stage; // 1 = easy, 2 = medium, 3 = hard
    this.map = this.generateMap();
  }

  generateMap() {
    const map = [];

    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.columns; c++) {
        // Border walls
        if (r === 0 || c === 0 || r === this.rows - 1 || c === this.columns - 1) {
          row.push(1); // Wall
        }
        // Inner blocks
        else if (r % 2 === 0 && c % 2 === 0) {
          row.push(1); // Wall block
        } else {
          row.push(0); // Empty path
        }
      }
      map.push(row);
    }

    this.placeGates(map);
    this.placeEnemies(map);
    this.placeHero(map)

    return map;
  }

  placeHero(map) {
    map[1][1] = -1;
  }

  placeGates(map) {
    const gatesCount = {
      1: 20,
      2: 25,
      3: 33,
    };
  
    const count = gatesCount[this.stage] || 1;
    let placed = 0;
  
    while (placed < count) {
      const r = this.getRandomInt(1, this.rows - 2);
      const c = this.getRandomInt(1, this.columns - 2);
  
      // Skip reserved hero spawn area: (1,1), (1,2), (2,1), (2,2)
      if ((r === 1 || r === 2) && (c === 1 || c === 2)) continue;
  
      if (map[r][c] === 0) {
        map[r][c] = 2; // Gate
        placed++;
      }
    }
  }
  
  placeEnemies(map) {
    const enemiesCount = {
      1: 3,
      2: 6,
      3: 10,
    };
  
    const count = enemiesCount[this.stage] || 1;
    let placed = 0;
  
    while (placed < count) {
      const r = this.getRandomInt(1, this.rows - 2);
      const c = this.getRandomInt(1, this.columns - 2);
  
      // Skip reserved hero spawn area: (1,1), (1,2), (2,1), (2,2)
      if ((r === 1 || r === 2) && (c === 1 || c === 2)) continue;
  
      if (map[r][c] === 0) {
        map[r][c] = 3; // Enemy
        placed++;
      }
    }
  }
  

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getMap() {
    return this.map;
  }
}
