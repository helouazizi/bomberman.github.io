export { Field }

// Create a field to set the battle field of 
// our game and the track the progress of the game:
class Field {
    #count = 1
    constructor(width, height) {
        this.width = width
        this.height = height
    }
    // Create the battlefield:
    Create() {
        let container = document.createElement("div")
        container.setAttribute("id", "container")
        let fragment = document.createDocumentFragment()

        let board = document.createElement("div")
        board.setAttribute("id", "bord")
        board.style.width = `${this.width}vw`
        board.style.height = `${this.height / 3}vh`

        let time = document.createElement("div")
        time.setAttribute("id", "time")
        let score = document.createElement("div")
        score.setAttribute("id", "score")

        let attempts = document.createElement("div")
        attempts.setAttribute("id", "attempts")
        fragment.append(time, score, attempts)
        board.appendChild(fragment)
        container.appendChild(board)

        let battleField = document.createElement("div")
        battleField.setAttribute("id", "battleField")
        battleField.style.width = `${this.width}vw`
        battleField.style.height = `${this.height}vh`
        for (let y = 1; y <= 13; y++) {
            let wall = document.createElement("div")
            wall.setAttribute("class", "wall")
            wall.setAttribute("id", `wall-${y}`)
            wall.style.width = `100%`
            wall.style.height = `${this.height / 13}vh`
            for (let x = 1; x <= 15; x++) {
                let brick = document.createElement("div")
                brick.setAttribute("class", "brick")
                brick.setAttribute("id", `${this.#count}`)
                brick.style.width = `${this.width / 15}vw`
                brick.style.height = `100%`
                wall.appendChild(brick)
                this.#count++
                if (y === 1 || y === 13 || x == 1 || x == 15) {
                    brick.classList.add("solid")
                } else {
                    if (y % 2 !== 0 && x % 2 !== 0) {
                        brick.classList.add("solid")
                    }
                    brick.classList.add("gate")
                }
            }
            battleField.appendChild(wall)
        }
        container.appendChild(battleField)
        document.body.appendChild(container)
    }

    // Genrate the breakable walls randomly:
    GenerateGates(count) {
        let random = new Set()
        do {
            let num = Math.round(Math.random() * 114) + 1
            random.add(num)
        } while (random.size < count)
        return Array.from(random)
    }
}