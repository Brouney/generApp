import React from 'react'
import Sketch from 'react-p5'

const SimulatedAnnealing13_STEP_MAX = 3
const SimulatedAnnealing13_STEP_CHANGE = 3
const SimulatedAnnealing13_WIDTH = 800
const SimulatedAnnealing13_HEIGHT = 600

class Skier {

    constructor(points) {

        this.x = this.lowestPoint(points)
        this.y = points[this.x]
        this.points = points
        this.find = false

        this.temp = 1
        this.minTemp = 0.0001
        this.alpha = 0.99
    }
    
    lowestPoint(points) {
        let lowest = Infinity
        let x = 0
        for (let i = 0; i < SimulatedAnnealing13_WIDTH; i++) {
            if (SimulatedAnnealing13_HEIGHT - points[i] < lowest) {
                lowest = SimulatedAnnealing13_HEIGHT - points[i]
                x = i
            }
        }
        return x
    }
    
    draw = (p5) => {
        p5.fill('red')
        p5.stroke('red')
        p5.ellipse(this.x, this.y-5, 20, 20)
    }
    
    update() {
        if (!this.find) return

        this.score = SimulatedAnnealing13_HEIGHT - this.y
        if (this.targetX > this.x) {
            if (this.targetX == this.x + 1) {
                this.x++
            }
            else {
                this.x+=2  
            }
        } 
        else if (this.targetX < this.x) {
            if (this.targetX == this.x - 1) {
                this.x -= 1  
            }
            else {
                this.x -= 2  
            }
        }
        else {
            this.findHighestPoint()
        }

        this.y = this.points[this.x]
    }
    
    findHighestPoint() {
        if (!this.find) {
            return
        }
        if (this.temp < this.minTemp) {
            return
        }

        this.targetX = this.x
        for (let i = -SimulatedAnnealing13_WIDTH; i < SimulatedAnnealing13_WIDTH; i++) {
            let neighbourX = this.targetX + i
            let newScore = SimulatedAnnealing13_HEIGHT - this.points[neighbourX]

            if (newScore > this.score) {
                this.targetX = neighbourX
            }
            else {
                const prob = Math.exp((this.score - newScore) / this.temp)
                if (Math.random(1) >= prob) {
                    this.targetX = neighbourX
                }
            }
        }
        this.temp *= this.alpha
    }
    
    simpleAlgorithm() {
        if (this.points[this.x + 1] < this.y) {
            this.x++
        } 

        if (this.points[this.x - 1] < this.y) {
            this.x--
        }
    }
    
    restart() {
        this.x = Math.floor(Math.random(SimulatedAnnealing13_WIDTH))
        this.y = this.points[this.x]
    }
    
    moveLeft() {
        this.x -= 5
        this.y = this.points[this.x]
    } 
    
    moveRight() {
        this.x += 5
        this.y = this.points[this.x]
    } 
}

class Hill {

    constructor(props) {
        this.points = []
        this.createHill()
    }

    createHill = () => {
        // parameters - change to your liking
        const HEIGHT_MAX = SimulatedAnnealing13_HEIGHT
        const HEIGHT_MIN = 200
        
        // starting conditions
        let hillHeight = Math.random() * HEIGHT_MAX
        let slope = Math.random() * SimulatedAnnealing13_STEP_MAX * 2 - SimulatedAnnealing13_STEP_MAX

        // creating the landscape
        for (let x = 0; x < SimulatedAnnealing13_WIDTH; x++) {
            // change SimulatedAnnealing13_HEIGHT and slope
            hillHeight += slope
            slope += Math.random() * SimulatedAnnealing13_STEP_CHANGE * 2 - SimulatedAnnealing13_STEP_CHANGE

            // clip SimulatedAnnealing13_HEIGHT and slope to maximum
            if (slope > SimulatedAnnealing13_STEP_MAX) {
                slope = SimulatedAnnealing13_STEP_MAX
            }
            if (slope < -SimulatedAnnealing13_STEP_MAX) {
                slope = -SimulatedAnnealing13_STEP_MAX
            }

            if (hillHeight > HEIGHT_MAX) {
                hillHeight = HEIGHT_MAX
                slope *= -1
            }
            if (hillHeight < HEIGHT_MIN) {
                hillHeight = HEIGHT_MIN
                slope *= -1
            }

            this.points.push(hillHeight)
        }
    }

    draw = (p5) => {
        for (let i = 0; i < this.points.length; i++) {
            p5.stroke('cyan')
            p5.line(i, SimulatedAnnealing13_HEIGHT, i, this.points[i])
        }
    }
}
  

class SimulatedAnnealing13 extends React.Component {

    constructor(props) {
        super(props)

        this.hill = new Hill()
        this.skier = new Skier(this.hill.points)
    }

    setup = (p5, parentRef) => {
		p5.createCanvas(SimulatedAnnealing13_WIDTH, SimulatedAnnealing13_HEIGHT).parent(parentRef)
        p5.frameRate(30)
	}

    draw = (p5) => {
        p5.background('#454b51')

        this.hill.draw(p5)
        this.skier.update(p5)
        this.skier.draw(p5)
    }

    keyPressed = (p5) => {
        // console.log(p5.keyCode)
        if (p5.keyCode === 32) { //spacja
            this.skier.find = !this.skier.find
        } else if (p5.keyCode === 82) { //r
            this.skier.restart()
        } else if (p5.keyCode === 37) { //<-
            this.skier.moveLeft()
        } else if (p5.keyCode === 39) { //->
            this.skier.moveRight()
        } else if (p5.keyCode === 78) { //n
            this.hill = new Hill()
            this.skier = new Skier(this.hill.points)
        }
    }

        
    render() {
        return(
        <div>
            <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed}/>
        </div>
        )
    }
}

export default SimulatedAnnealing13