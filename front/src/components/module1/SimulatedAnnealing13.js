import React from 'react'
import Sketch from 'react-p5'

const SimulatedAnnealing13_STEP_MAX = 3
const SimulatedAnnealing13_STEP_CHANGE = 3
const SimulatedAnnealing13_WIDTH = 800
const SimulatedAnnealing13_HEIGHT = 273
const SimulatedAnnealing13_CANVAS_OFFSET = 150


class BallTemperature {

    constructor(points) {
        this.x = this.lowestPoint(points)
        this.y = points[this.x]

        this.points = points
        this.prevMax = SimulatedAnnealing13_HEIGHT
        this.maxFound = true

        this.counterToEndSimulation = 0
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
        p5.ellipse(this.x + SimulatedAnnealing13_CANVAS_OFFSET / 2, this.y-5 + SimulatedAnnealing13_CANVAS_OFFSET / 2, 20, 20)

        p5.textSize(30)
        p5.text('Poprzednie maksimum: ' + Math.round(- this.prevMax * 100) / 100,
                 SimulatedAnnealing13_WIDTH / 2,
                 SimulatedAnnealing13_HEIGHT + SimulatedAnnealing13_CANVAS_OFFSET - 10)

        p5.text(Math.round(- this.y * 100) / 100, this.x + SimulatedAnnealing13_CANVAS_OFFSET / 4, this.y + SimulatedAnnealing13_CANVAS_OFFSET / 4) // this.y - aktualna wartosc temperatury kropki na wykresie
    }
    
    updateBallPosition() {
        let xPrev = this.x

        this.temperature = SimulatedAnnealing13_HEIGHT - this.y
        if (this.targetX > this.x) {
            if (this.targetX == this.x + 1) {
                this.x++
            }
            else {
                this.x += 2  
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

        if (this.x == xPrev) {
            this.counterToEndSimulation++
        }
    }
    
    findHighestPoint() {
        this.targetX = this.x
        for (let i = -SimulatedAnnealing13_WIDTH; i < SimulatedAnnealing13_WIDTH; i++) {
            let neighbourX = this.targetX + i
            let newTemperature = SimulatedAnnealing13_HEIGHT - this.points[neighbourX]

            if (newTemperature > this.temperature) {
                this.targetX = neighbourX
            }
            else {
                const prob = Math.exp(this.temperature - newTemperature)
                if (Math.random(1) >= prob) {
                    this.targetX = neighbourX
                }
            }
        }

        if (this.targetX != this.x) {
            this.prevMax = this.points[this.targetX]
        }
    }
    
    moveLeft() {
        this.x -= 5
        if (this.x < 0) {
            this.x = 0
        }
        this.y = this.points[this.x]
    } 
    
    moveRight() {
        this.x += 5
        if (this.x > SimulatedAnnealing13_WIDTH) {
            this.x = SimulatedAnnealing13_WIDTH-1
        }
        this.y = this.points[this.x]
    } 
}

class TemperatureChart {

    constructor(props) {
        this.points = []
        this.create()
    }

    create = () => {
        const HEIGHT_MAX = SimulatedAnnealing13_HEIGHT
        const HEIGHT_MIN = 0

        let chartValue = Math.random() * HEIGHT_MAX
        let slope = Math.random() * SimulatedAnnealing13_STEP_MAX * 2 - SimulatedAnnealing13_STEP_MAX

        // creating the landscape
        for (let x = 0; x < SimulatedAnnealing13_WIDTH; x++) {

            chartValue += slope
            slope += Math.random() * SimulatedAnnealing13_STEP_CHANGE * 2 - SimulatedAnnealing13_STEP_CHANGE

            if (slope > SimulatedAnnealing13_STEP_MAX) {
                slope = SimulatedAnnealing13_STEP_MAX
            }
            if (slope < -SimulatedAnnealing13_STEP_MAX) {
                slope = -SimulatedAnnealing13_STEP_MAX
            }

            if (chartValue > HEIGHT_MAX) {
                chartValue = HEIGHT_MAX
                slope *= -1
            }
            if (chartValue < HEIGHT_MIN) {
                chartValue = HEIGHT_MIN
                slope *= -1
            }

            this.points.push(chartValue)
        }
    }

    draw = (p5) => {
        for (let i = 0; i < this.points.length; i++) {
            p5.stroke('cyan')
            p5.line(i + SimulatedAnnealing13_CANVAS_OFFSET / 2,
                    SimulatedAnnealing13_HEIGHT + SimulatedAnnealing13_CANVAS_OFFSET / 2,
                    i + SimulatedAnnealing13_CANVAS_OFFSET / 2,
                    this.points[i]  + SimulatedAnnealing13_CANVAS_OFFSET / 2)
        }

        //strzalki wykresu
        p5.stroke('white')
        p5.line(SimulatedAnnealing13_CANVAS_OFFSET / 4,
        SimulatedAnnealing13_HEIGHT - SimulatedAnnealing13_CANVAS_OFFSET / 0.6,
        SimulatedAnnealing13_CANVAS_OFFSET / 4,
        SimulatedAnnealing13_HEIGHT + SimulatedAnnealing13_CANVAS_OFFSET / 1.5) // pionowa

        p5.line(SimulatedAnnealing13_CANVAS_OFFSET / 4,
        SimulatedAnnealing13_CANVAS_OFFSET * 2.5,
        SimulatedAnnealing13_WIDTH + SimulatedAnnealing13_CANVAS_OFFSET / 1.5,
        SimulatedAnnealing13_CANVAS_OFFSET * 2.5) // pozioma

        //grot strzalki pionowej
        p5.line(SimulatedAnnealing13_CANVAS_OFFSET / 4, SimulatedAnnealing13_HEIGHT - SimulatedAnnealing13_CANVAS_OFFSET / 0.6, SimulatedAnnealing13_CANVAS_OFFSET/6, SimulatedAnnealing13_CANVAS_OFFSET/3)
        p5.line(SimulatedAnnealing13_CANVAS_OFFSET / 4, SimulatedAnnealing13_HEIGHT - SimulatedAnnealing13_CANVAS_OFFSET / 0.6, SimulatedAnnealing13_CANVAS_OFFSET/3, SimulatedAnnealing13_CANVAS_OFFSET/3)

        //grot strzalki poziomej
        p5.line(SimulatedAnnealing13_WIDTH + SimulatedAnnealing13_CANVAS_OFFSET / 1.5, SimulatedAnnealing13_CANVAS_OFFSET * 2.5, SimulatedAnnealing13_WIDTH + SimulatedAnnealing13_CANVAS_OFFSET / 2, SimulatedAnnealing13_HEIGHT + SimulatedAnnealing13_CANVAS_OFFSET / 1.2)
        p5.line(SimulatedAnnealing13_WIDTH + SimulatedAnnealing13_CANVAS_OFFSET / 1.5,
        SimulatedAnnealing13_CANVAS_OFFSET * 2.5,
        SimulatedAnnealing13_WIDTH + SimulatedAnnealing13_CANVAS_OFFSET / 2,
        SimulatedAnnealing13_HEIGHT + SimulatedAnnealing13_CANVAS_OFFSET / 1.8)

        // podpis osi wykresu
        p5.fill(255, 255, 255)
        p5.text('f(x)', SimulatedAnnealing13_CANVAS_OFFSET / 3.4, SimulatedAnnealing13_HEIGHT - SimulatedAnnealing13_CANVAS_OFFSET / 0.6 + 5) 
        p5.text('x', SimulatedAnnealing13_WIDTH + SimulatedAnnealing13_CANVAS_OFFSET / 1.4, SimulatedAnnealing13_CANVAS_OFFSET * 2.5)
    }
}
  

class SimulatedAnnealing13 extends React.Component {

    constructor(props) {
        super(props)

        this.temperatureChart = new TemperatureChart()
        this.ballTemperature = new BallTemperature(this.temperatureChart.points)
    }

    setup = (p5, parentRef) => {
		p5.createCanvas(SimulatedAnnealing13_WIDTH + SimulatedAnnealing13_CANVAS_OFFSET, SimulatedAnnealing13_HEIGHT + SimulatedAnnealing13_CANVAS_OFFSET).parent(parentRef)
        p5.frameRate(30)
	}

    draw = (p5) => {
        p5.background('#454b51')

        this.temperatureChart.draw(p5)

        if (this.ballTemperature.counterToEndSimulation > 50) { // TODO: workaround na stop symulacji
            this.props.onStartStop(true)
        }

        if (!this.ballTemperature.maxFound) {
            this.ballTemperature.updateBallPosition(p5)
        } else {
            this.props.onStartStop(true)
        }

        this.ballTemperature.draw(p5)
    }

    keyPressed = (p5) => {
        if (p5.keyCode === 32) { // space
            this.ballTemperature.maxFound = !this.ballTemperature.maxFound
        } else if (p5.keyCode === 37) { // <-
            this.ballTemperature.moveLeft()
        } else if (p5.keyCode === 39) { // ->
            this.ballTemperature.moveRight()
        } else if (p5.keyCode === 78) { // N
            this.temperatureChart = new TemperatureChart()
            this.ballTemperature = new BallTemperature(this.temperatureChart.points)
        }
    }

        
    render() {
        return(
        <div>
            Symulowane wyżarzanie
            <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed}/><br></br>

            <h3>
                <ul>
                    <li><b>N</b> - wygeneruj nowy wykres</li><br></br>
                    <li><b>Space</b> - wznów/przerwij animację</li><br></br>
                    <li><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
    <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
    </svg> - przesuń punkt poszukiwania w lewo</li><br></br>
                    <li><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
</svg> - przesuń punkt poszukiwania w prawo</li><br></br>
                </ul>
            </h3>
        </div>
        )
    }
}

export default SimulatedAnnealing13