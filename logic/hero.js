import { Field } from './field.js' 
export { Hero }
class Hero extends Field {
    constructor() {
        super(battleField)
        this.x=0
        this.y=0
        this.BattleField=battleField
    }
    createHero(){
        let hero = document.createElement("div")
        hero.setAttribute("id","hero")
        hero.style.width=`${this.width/15}vw`
        hero.style.height=`${this.height/13}vh`
        this.BattleField.appendChild(hero)

    }
    
}
