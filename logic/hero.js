import { Field } from './field.js'
export { Hero }
class Hero {

    createHero() {
        let battleField = document.getElementById("")
        let hero = document.createElement("div")
        hero.setAttribute("id", "hero")
        
        let first = document.getElementById("1")
        console.log(first);

        let position = this.getPosition(first)
        console.log(position);
        console.log(hero.getBoundingClientRect());


        hero.style.left = position.left + "px";
        hero.style.top = position.top + "px";
        hero.style.width = position.width + "px";
        hero.style.height = position.height + "px";
        document.body.appendChild(hero)
    }

    // Get the position of each element within
    getPosition = (element) => element.getBoundingClientRect()
}
