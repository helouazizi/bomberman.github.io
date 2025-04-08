export { Field }

// Create a field to set the battle field of 
// our game and the track the progress of the game:
class Field {
    constructor(width, height) {
        this.width = width
        this.height = height
    }

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

        let bricksFragments = document.createDocumentFragment()
        let count = 1
        for (let x = 1; x <= 16; x++) {
            for (let y = 1; y <= 13; y++) {
                let brick = document.createElement("div")
                brick.setAttribute("id", count)
                brick.style.width = `${this.width / 16}vw`
                brick.style.height = `${this.height / 13}vh`

                if (count <= 16 || count > 192 || count % 16 == 0 || count % 16 == 1) {
                    brick.setAttribute("class", "brick")
                } else if ( y %2 === 0 && count % 2 !== 0) {
                    brick.setAttribute("class", "brick")
                } else {
                    brick.setAttribute("class", "path")
                }
                count++
                bricksFragments.appendChild(brick)
            }
        }
        battleField.appendChild(bricksFragments)
        container.appendChild(battleField)
        document.body.appendChild(container)
    }
}