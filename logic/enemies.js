
class Enemy {
  constructor(enemiesCount) {
    this.enemiesCount = enemiesCount;
  }
  // create the enemies
  createEnimies() {
    this.enemiesCount.forEach((id) => {
      let Enemy = document.createElement("div");
      Enemy.classList.add("enemy");
      let brick = document.getElementById(`${id}`);
      brick.appendChild(Enemy);
    });
  }

}

export { Enemy };
