import { Field } from './field.js'
export { Hero }
class Hero {

    createHero() {
        
        let hero = document.createElement("div")
        hero.setAttribute("id", "hero")

        
        let first = document.getElementById("1")
       first.appendChild(hero)

     
    }

    // Get the position of each element within
    getPosition = (element) => element.getBoundingClientRect()
}
