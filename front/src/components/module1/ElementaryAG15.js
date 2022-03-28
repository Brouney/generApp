import React from 'react'
import Sketch from 'react-p5'

// slajd 2/11

const ElementaryAG15_WIDTH = 900
const ElementaryAG15_HEIGHT = 600


const ElementaryAG15_ALGO_RECTANGLE_WIDTH = 200
const ElementaryAG15_ALGO_RECTANGLE_HEIGHT = 80
const ElementaryAG15_ALGO_RECTANGLE_START_POINT = 30
const ElementaryAG15_ALGO_RECTANGLE_SPACING = 30

const ElementaryAG15_ALGO_ROUND_CORNER = 20
const ElementaryAG15_ALGO_STEPS_COUNT = 5

const ElementaryAG15_ANIMATION_RECT_X = 300
const ElementaryAG15_ANIMATION_RECT_Y = 30
const ElementaryAG15_ANIMATION_RECT_WIDTH = 500
const ElementaryAG15_ANIMATION_RECT_HEIGHT = 500

const ElementaryAG15_INDIVIDUALS_COUNT = 6
const ElementaryAG15_INDIVIDUALS_START_X = ElementaryAG15_ANIMATION_RECT_X + 50
const ElementaryAG15_INDIVIDUALS_START_Y = ElementaryAG15_ANIMATION_RECT_Y + 120
const ElementaryAG15_INDIVIDUALS_START_SPACING = 50
const ElementaryAG15_INDIVIDUALS_WIDTH = 100
const ElementaryAG15_INDIVIDUALS_HEIGHT = ElementaryAG15_INDIVIDUALS_WIDTH

const ElementaryAG15_TEXT_OFFSET_X = ElementaryAG15_ALGO_RECTANGLE_WIDTH / 10
const ElementaryAG15_TEXT_OFFSET_Y = ElementaryAG15_ALGO_RECTANGLE_HEIGHT / 2.5
const ElementaryAG15_TEXT_ON_ALGO_STEPS = [
    `Wygenerowanie początkowej
populacji bazowej B0`,
    `Reprodukcja osobników
z populacji bazowej Bi
do populacji tymczasowej Ti`,
    `Krzyżowanie osobników w Ti
z prawdopodobieństwem pc`,
    `Mutacja osobników w Ti
z prawdopodobieństwem pm`,
    `Sukcesja Bi+1 := Ti, i := i++`,
]

class Individual {
    constructor(x, y, label) {
        this.x = x
        this.y = y
        this.label = label
    }
}

class ElementaryAG15 extends React.Component {

    constructor(props) {
        super(props)
        this.rectanglesYCoords = []

        this.isWindowCurrentStepMoving = false
        this.animationStepInPopulationEnded = false
        
        for (let i = 0; i < ElementaryAG15_ALGO_STEPS_COUNT; ++i) {
            this.rectanglesYCoords[i] = ElementaryAG15_ALGO_RECTANGLE_START_POINT + ElementaryAG15_ALGO_RECTANGLE_HEIGHT * i + ElementaryAG15_ALGO_RECTANGLE_SPACING * i
        }

        this.windowCurrentStepY = this.rectanglesYCoords[0]

        this.individuals = []

        for (let i = 0; i < ElementaryAG15_INDIVIDUALS_COUNT / 3; ++i) {     // 2 wiersze, 3 kolumny, 6 osobnikow
            for (let j = 0; j < ElementaryAG15_INDIVIDUALS_COUNT / 2; ++j) {
                let individual = new Individual(ElementaryAG15_INDIVIDUALS_START_X + ElementaryAG15_INDIVIDUALS_WIDTH * j + ElementaryAG15_INDIVIDUALS_START_SPACING * j,
                                                ElementaryAG15_INDIVIDUALS_START_Y + ElementaryAG15_INDIVIDUALS_HEIGHT * i + ElementaryAG15_INDIVIDUALS_START_SPACING * i,)
                this.individuals.push(individual)
            }
        }
    }

    setup = (p5, parentRef) => {
		p5.createCanvas(ElementaryAG15_WIDTH, ElementaryAG15_HEIGHT).parent(parentRef)
        p5.frameRate(30)
	}

    draw = (p5) => {
        p5.background('#454b51')

        for (let i = 0; i < ElementaryAG15_ALGO_STEPS_COUNT; ++i) {
            p5.strokeWeight(0.5)
            p5.stroke(0)
            p5.fill(200)

            p5.rect(ElementaryAG15_ALGO_RECTANGLE_START_POINT,
                    this.rectanglesYCoords[i],
                    ElementaryAG15_ALGO_RECTANGLE_WIDTH,
                    ElementaryAG15_ALGO_RECTANGLE_HEIGHT,
                    ElementaryAG15_ALGO_ROUND_CORNER)
            
            p5.stroke(0)
            p5.fill(0)
            p5.text(ElementaryAG15_TEXT_ON_ALGO_STEPS[i],
                    ElementaryAG15_ALGO_RECTANGLE_START_POINT + ElementaryAG15_TEXT_OFFSET_X,
                    this.rectanglesYCoords[i] + ElementaryAG15_TEXT_OFFSET_Y)
        }

        // prostokat z animacja populacji po prawej stronie
        p5.strokeWeight(0.5)
        p5.stroke(0)
        p5.fill(180)
        p5.rect(ElementaryAG15_ANIMATION_RECT_X,
                ElementaryAG15_ANIMATION_RECT_Y,
                ElementaryAG15_ANIMATION_RECT_WIDTH,
                ElementaryAG15_ANIMATION_RECT_HEIGHT,
                ElementaryAG15_ALGO_ROUND_CORNER)


        if (this.rectanglesYCoords.includes(this.windowCurrentStepY)) { // szukaj od indeksu [1]
            this.isWindowCurrentStepMoving = false
            this.animationStepInPopulationEnded = false
        }


        if (this.isWindowCurrentStepMoving) {
            this.windowCurrentStepY++
        }
        else {
            if (this.animationStepInPopulationEnded) {
                this.isWindowCurrentStepMoving = true
            }
            else { // trwa animacja populacji z prawej strony slajdu 2/11

                switch (this.windowCurrentStepY) {
                    case this.rectanglesYCoords[0]: // 1 krok
                        break
                    case this.rectanglesYCoords[1]: // 2 krok
                        break
                    case this.rectanglesYCoords[2]: // 3 krok
                        break
                    case this.rectanglesYCoords[3]: // 4 krok
                        break
                    case this.rectanglesYCoords[4]: // 5 krok
                        break
                }
                if (false) { // warunek konca animacji kroku
                    this.animationStepInPopulationEnded = true
                }
            }
        }

        // rysowanie osobnikow
        for (let i = 0; i < ElementaryAG15_INDIVIDUALS_COUNT; ++i) {
            p5.strokeWeight(5)
            p5.stroke(0)
            p5.fill(230)
            p5.rect(this.individuals[i].x,
                    this.individuals[i].y,
                    ElementaryAG15_INDIVIDUALS_WIDTH,
                    ElementaryAG15_INDIVIDUALS_HEIGHT)
        }

        p5.strokeWeight(5)
        p5.stroke(0, 255, 0)
        p5.noFill()  // przezroczysty prostokat - zielone okno pokazujace ktory teraz krok algorytmu jest pokazywany
        p5.rect(ElementaryAG15_ALGO_RECTANGLE_START_POINT,
            this.windowCurrentStepY,
            ElementaryAG15_ALGO_RECTANGLE_WIDTH,
            ElementaryAG15_ALGO_RECTANGLE_HEIGHT,
            ElementaryAG15_ALGO_ROUND_CORNER)

    }

    keyPressed = (p5) => {
    }

        
    render() {
        return(
        <div>
            <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed}/>
        </div>
        )
    }
}

export default ElementaryAG15