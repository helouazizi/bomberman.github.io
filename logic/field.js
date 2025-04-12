export { Field }

// Create a field to set the battle field of 
// our game and the track the progress of the game:
class Field {
    #count = 1
    constructor(width, height) {
        this.width = width
        this.height = height
        this.container = null
        this.battleField = null
        this.stage = 1
    }
    // Create the battlefield:
    Create() {
        this.container = document.createElement("div")
        this.container.setAttribute("id", "container")
        document.body.appendChild(this.container)
    }

    // Create the battle field:
    CreateBattleField() {
        this.Create()
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
        this.container.appendChild(board)

        this.battleField = document.createElement("div")
        this.battleField.setAttribute("id", "battleField")
        this.battleField.style.width = `${this.width}vw`
        this.battleField.style.height = `${this.height}vh`

        for (let y = 1; y <= 13; y++) {
            let wall = document.createElement("div")
            wall.setAttribute("class", "wall")
            wall.setAttribute("id", `wall-${y}`)
            wall.style.width = `100%`
            wall.style.height = `${this.height / 13}vh`
            for (let x = 1; x <= 15; x++) {
                let brick = document.createElement("div")
                brick.setAttribute("class", "brick")

                brick.style.width = `${this.width / 15}vw`
                brick.style.height = `100%`
                wall.appendChild(brick)

                if (y === 1 || y === 13 || x == 1 || x == 15 || (y % 2 !== 0 && x % 2 !== 0)) {
                    brick.classList.add("solid")
                } else {

                    brick.classList.add("path")
                    brick.setAttribute("id", `${this.#count}`)
                    this.#count++

                }
            }
            this.battleField.appendChild(wall)
        }
        this.container.appendChild(this.battleField)
        this.createGates()
    }

    // Genrate the breakable walls randomly:
    generateRandomIds() {
        let count = 0
        switch (this.stage) {

            case 2:
                count = 20
                break
            case 3:
                count = 22
                break
            case 4:
                count = 25
                break
            case 5:
                count = 30
                break
            default:
                count = 16
        }
        let random = new Set()
        do {
            let num = Math.floor(Math.random() * 112) + 2
            random.add(num)
        } while (random.size < count)
        return Array.from(random)
    }

    // create the breakable walls
    createGates() {
        let Ids = this.generateRandomIds()
        document.getElementById(`${Ids[Ids.length / 2]}`).classList.add('door')


        Ids.forEach(id => {
            let brick = document.getElementById(`${id}`) 
            brick.classList.add("solid",'gate')
        })


    }

    // Get the position of each element within
    getPosition = (element) => element.getBoundingClientRect()
}