import { Field } from './field.js'
export { Hero }
class Hero extends Field {
    constructor() {
        super(battleField)
        this.x = 0
        this.y = 0
        this.battleField = battleField
    }
    createHero() {
        let hero = document.createElement("div")
        hero.setAttribute("id", "hero")
        hero.style.width = `${parseInt(this.battleField.style.width) / 15}vw`
        hero.style.height = `${parseInt(this.battleField.style.height) / 13}vh`
        this.battleField.appendChild(hero)
    }

    // Get the position of each element within
    getPosition = (element) => element.getBoundingClientRect()
}
