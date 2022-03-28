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


const ElementaryAG15_TEXT_ON_ALGO_STEPS = [
    `Wygenerowanie początkowej
populacji bazowej B0`,
    `Reprodukcja osobników z populacji
bazowej Bi do populacji tymczasowej Ti`,
    `Krzyżowanie osobników w Ti
z prawdopodobieństwem pc`,
    `Mutacja osobników w Ti
z prawdopodobieństwem pm`,
    `Sukcesja Bi+1 := Ti, i := i++`,
]

class ElementaryAG15 extends React.Component {

    constructor(props) {
        super(props)
    }

    setup = (p5, parentRef) => {
		p5.createCanvas(ElementaryAG15_WIDTH, ElementaryAG15_HEIGHT).parent(parentRef)
        p5.frameRate(30)
	}

    draw = (p5) => {
        p5.background('#454b51')

        for (let i = 0; i < ElementaryAG15_ALGO_STEPS_COUNT; ++i) {
            p5.rect(ElementaryAG15_ALGO_RECTANGLE_START_POINT,
                    ElementaryAG15_ALGO_RECTANGLE_START_POINT + ElementaryAG15_ALGO_RECTANGLE_HEIGHT * i + ElementaryAG15_ALGO_RECTANGLE_SPACING * i,
                    ElementaryAG15_ALGO_RECTANGLE_WIDTH,
                    ElementaryAG15_ALGO_RECTANGLE_HEIGHT,
                    ElementaryAG15_ALGO_ROUND_CORNER)
            
            p5.text(ElementaryAG15_TEXT_ON_ALGO_STEPS[i],
                    ElementaryAG15_ALGO_RECTANGLE_START_POINT,
                    ElementaryAG15_ALGO_RECTANGLE_START_POINT + ElementaryAG15_ALGO_RECTANGLE_HEIGHT * i + ElementaryAG15_ALGO_RECTANGLE_SPACING * i)
        }
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