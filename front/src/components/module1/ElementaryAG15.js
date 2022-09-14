import React from 'react'
import Sketch from 'react-p5'

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
let ElementaryAG15_INDIVIDUALS_TEXT_SIZE = 0

const ElementaryAG15_TEXT_OFFSET_X = ElementaryAG15_ALGO_RECTANGLE_WIDTH / 10
const ElementaryAG15_TEXT_OFFSET_Y = ElementaryAG15_ALGO_RECTANGLE_HEIGHT / 2.5
const ElementaryAG15_TEXT_ON_ALGO_STEPS = [
    `Wygenerowanie początkowej
populacji bazowej B\u2070`,
    `Reprodukcja osobników
z populacji bazowej B\u2071
do populacji tymczasowej T\u2071`,
    `Krzyżowanie osobników w T\u2071
z prawdopodobieństwem p\u2097`,
    `Mutacja osobników w T\u2071
z prawdopodobieństwem p\u2099`,
    `            Sukcesja
     B\u2071\u207A\u00B9 := T\u2071, i := i++`,

    // test\u00B9\u2071\u00B3'
]

const ElementaryAG15_POSSIBLE_CROSSOVERS = [
    [0,1],
    [0,1,4,5],
    [0,1,3,4],
    [0,1,2,5,3,4],
    [1,2],
    [1,2,3,4],
    [0,3,4,5],
    [1,4],
    [2,5],
    [2,5,3,4],
]

const ElementaryAG15_MUTATION_PROBABILITY = 0.03

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function probability(n) {
    return !!n && Math.random() <= n
}

function sleep(time) {
    return new Promise( (resolve) => setTimeout(resolve, time) )
}

class Individual {
    constructor(x, y, label) {
        this.defaultX = x
        this.defaultY = y
        this.x = x
        this.y = y
        this.label = label
        this.labelColour = [0,0,0]
    }
}

class ElementaryAG15 extends React.Component {

    constructor(props) {
        super(props)
        this.rectanglesYCoords = []

        this.isWindowCurrentStepMoving = false
        this.animationStepInPopulationEnded = false
        this.simulationRunning = false // do komunikacji z guzikami na Slide15A
        
        for (let i = 0; i < ElementaryAG15_ALGO_STEPS_COUNT; ++i) {
            this.rectanglesYCoords[i] = ElementaryAG15_ALGO_RECTANGLE_START_POINT + ElementaryAG15_ALGO_RECTANGLE_HEIGHT * i + ElementaryAG15_ALGO_RECTANGLE_SPACING * i
        }

        this.windowCurrentStepY = this.rectanglesYCoords[0]

        this.individuals = []

        let individualNumber = 1
        for (let i = 0; i < ElementaryAG15_INDIVIDUALS_COUNT / 3; ++i) {     // 2 wiersze, 3 kolumny, 6 osobnikow
            for (let j = 0; j < ElementaryAG15_INDIVIDUALS_COUNT / 2; ++j) {
                let individual = new Individual(ElementaryAG15_INDIVIDUALS_START_X + ElementaryAG15_INDIVIDUALS_WIDTH * j + ElementaryAG15_INDIVIDUALS_START_SPACING * j,
                                                ElementaryAG15_INDIVIDUALS_START_Y + ElementaryAG15_INDIVIDUALS_HEIGHT * i + ElementaryAG15_INDIVIDUALS_START_SPACING * i,
                                                individualNumber)
                this.individuals.push(individual)
                individualNumber++
            }
        }

        this.step1isTextIncreasing = true
        this.textFlashingRepetitions = 0
        this.step2LabelsReplaced = false

        this.step3moveIndividualsToStartPosition = false
        this.step3crossoverDrawingTookPlace = false
        this.step3crossoverChosenOption = false
    }

    componentWillUnmount() { // ustawienie defaultowych zmiennych globalnych po przejsciu na inny slajd
        ElementaryAG15_INDIVIDUALS_TEXT_SIZE = 0
    }

    changeLabelsColours() {
        for (let i = 0; i < ElementaryAG15_INDIVIDUALS_COUNT; ++i) {
            if (probability(ElementaryAG15_MUTATION_PROBABILITY)) {
                this.individuals[i].labelColour[0] = randomIntFromInterval(0, 254)
                this.individuals[i].labelColour[1] = randomIntFromInterval(0, 254)
                this.individuals[i].labelColour[2] = randomIntFromInterval(0, 254)
            }
        }
        this.animationStepInPopulationEnded = true
        this.windowCurrentStepY += 2 // zwiekszenie zeby switch wpadl do kolejnej etykiety case: this.rectanglesYCoords[x]
        this.textFlashingRepetitions = 0
    }

    collissionDetected = (i1, i2) => {
        if (
                i1.x == i2.x + ElementaryAG15_INDIVIDUALS_WIDTH ||
                i2.x == i1.x + ElementaryAG15_INDIVIDUALS_WIDTH ||
                i1.y == i2.y + ElementaryAG15_INDIVIDUALS_HEIGHT ||
                i2.y == i1.y + ElementaryAG15_INDIVIDUALS_HEIGHT
        
            )
        {
            // console.log('collision detected!')
            return true
        }
    }

    makeCrossover = (idx1, idx2) => {
        if (this.individuals[idx1].y == this.individuals[idx2].y) { // kolizja w poziomie
            if (this.collissionDetected(this.individuals[idx1], this.individuals[idx2])) {
                this.individuals[idx1].label += 1
                this.individuals[idx1].labelColour = this.individuals[idx2].labelColour
                this.individuals[idx2].label += 1
                this.step3moveIndividualsToStartPosition = true;
            }

            if (this.step3moveIndividualsToStartPosition) {
                this.individuals[idx1].x--
                this.individuals[idx2].x++
            }
            else {
                this.individuals[idx1].x++
                this.individuals[idx2].x--
            }

            if (this.individuals[idx1].x == this.individuals[idx1].defaultX) { // WARUNEK PRZEJSCIA DO KOLEJNEGO KROKU
                this.animationStepInPopulationEnded = true
                this.windowCurrentStepY += 2 // zwiekszenie zeby switch wpadl do kolejnej etykiety case: this.rectanglesYCoords[x]
                this.textFlashingRepetitions = 0
                this.step3moveIndividualsToStartPosition = false
                this.step3crossoverDrawingTookPlace = false
            }
        }
        else if (this.individuals[idx1].x == this.individuals[idx2].x) {// kolizja w pionie
            if (this.collissionDetected(this.individuals[idx1], this.individuals[idx2])) {
                this.individuals[idx1].label += 1
                this.individuals[idx2].labelColour = this.individuals[idx1].labelColour
                this.individuals[idx2].label += 1
                this.step3moveIndividualsToStartPosition = true;
            }

            if (this.step3moveIndividualsToStartPosition) {
                this.individuals[idx1].y--
                this.individuals[idx2].y++
            }
            else {
                this.individuals[idx1].y++
                this.individuals[idx2].y--
            }

            if (this.individuals[idx1].y == this.individuals[idx1].defaultY) { // WARUNEK PRZEJSCIA DO KOLEJNEGO KROKU
                this.animationStepInPopulationEnded = true
                this.windowCurrentStepY += 2 // zwiekszenie zeby switch wpadl do kolejnej etykiety case: this.rectanglesYCoords[x]
                this.textFlashingRepetitions = 0
                this.step3moveIndividualsToStartPosition = false
                this.step3crossoverDrawingTookPlace = false
            }
        }
        else { // w przypadku zawieszenia sie algorytmu przechodzimy do kolejnego kroku
            this.animationStepInPopulationEnded = true
            this.windowCurrentStepY += 2 // zwiekszenie zeby switch wpadl do kolejnej etykiety case: this.rectanglesYCoords[x]
            this.textFlashingRepetitions = 0
            this.step3moveIndividualsToStartPosition = false
            this.step3crossoverDrawingTookPlace = false

            //przywrocenie defaultowych pozycji osobnikow
            for (let i = 0; i < ElementaryAG15_INDIVIDUALS_COUNT; ++i) {
                this.individuals[i].x = this.individuals[i].defaultX
                this.individuals[i].y = this.individuals[i].defaultY
            }
        }
    }

    flashIndividualsLabels = () => {
        if (30 <= ElementaryAG15_INDIVIDUALS_TEXT_SIZE && ElementaryAG15_INDIVIDUALS_TEXT_SIZE <= 40) {
            if (ElementaryAG15_INDIVIDUALS_TEXT_SIZE == 40) {
                this.step1isTextIncreasing = false
                this.textFlashingRepetitions++ 
            } else if (ElementaryAG15_INDIVIDUALS_TEXT_SIZE == 30) {
                this.step1isTextIncreasing = true
            }

            if (this.step1isTextIncreasing) ElementaryAG15_INDIVIDUALS_TEXT_SIZE++
            else ElementaryAG15_INDIVIDUALS_TEXT_SIZE--
        }
        else if (0 <= ElementaryAG15_INDIVIDUALS_TEXT_SIZE && ElementaryAG15_INDIVIDUALS_TEXT_SIZE < 40) {
            ElementaryAG15_INDIVIDUALS_TEXT_SIZE++
        }

        if (this.textFlashingRepetitions == 1) { // WARUNEK PRZEJSCIA DO KOLEJNEGO KROKU
            this.animationStepInPopulationEnded = true
            this.windowCurrentStepY += 2 // zwiekszenie zeby switch wpadl do kolejnej etykiety case: this.rectanglesYCoords[x]
            this.textFlashingRepetitions = 0
        }
    } 

    replaceIndividualsLabels = () => {
        while (ElementaryAG15_INDIVIDUALS_TEXT_SIZE != 0 && !this.step2LabelsReplaced) {
            ElementaryAG15_INDIVIDUALS_TEXT_SIZE--
            return
        }

        if (ElementaryAG15_INDIVIDUALS_TEXT_SIZE == 0) {
            this.individuals.map(ind => ind.label = randomIntFromInterval(1, ElementaryAG15_INDIVIDUALS_COUNT))
            this.step2LabelsReplaced = true
            ElementaryAG15_INDIVIDUALS_TEXT_SIZE++
        }

        if (this.step2LabelsReplaced)
            this.flashIndividualsLabels()
    }

    setup = (p5, parentRef) => {
		p5.createCanvas(ElementaryAG15_WIDTH, ElementaryAG15_HEIGHT).parent(parentRef)   // WEBGL as 3rd param can be
        p5.frameRate(30)
	}

    draw = (p5) => {
        p5.background('#454b51')

        // zaokraglone prostokaty po lewej stronie bedace krokami algorytmu
        for (let i = 0; i < ElementaryAG15_ALGO_STEPS_COUNT; ++i) {
            p5.strokeWeight(0.5)
            p5.stroke(0)
            p5.fill(200)

            p5.rect(ElementaryAG15_ALGO_RECTANGLE_START_POINT,
                    this.rectanglesYCoords[i],
                    ElementaryAG15_ALGO_RECTANGLE_WIDTH,
                    ElementaryAG15_ALGO_RECTANGLE_HEIGHT,
                    ElementaryAG15_ALGO_ROUND_CORNER)
            
            p5.strokeWeight(0)
            p5.stroke(0)
            p5.fill(0)
            p5.textSize(13)
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


        if (this.simulationRunning) { //jezeli SRODKOWY GUZIK NavigationButtons odpalony (czyli czerwony)
            if (this.isWindowCurrentStepMoving) {
                this.windowCurrentStepY += 2
            }
            else {
                if (this.animationStepInPopulationEnded) {
                    this.isWindowCurrentStepMoving = true
                    this.windowCurrentStepY += 2
                }
                else { // trwa animacja populacji z prawej strony slajdu
                    
                    switch (this.windowCurrentStepY) {
                        case this.rectanglesYCoords[0]: // 1 krok
                            this.flashIndividualsLabels()
                            break
                        case this.rectanglesYCoords[1]: // 2 krok
                            this.replaceIndividualsLabels()
                            break
                        case this.rectanglesYCoords[2]: // 3 krok
                            if (!this.step3crossoverDrawingTookPlace) {
                                this.step3crossoverChosenOption = randomIntFromInterval(0, ElementaryAG15_POSSIBLE_CROSSOVERS.length-1)
                                this.step3crossoverDrawingTookPlace = true
                            }
                            switch (ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption].length) {
                                case 2:
                                    this.makeCrossover(ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][0],
                                                       ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][1])
                                    break
                                case 4:
                                    this.makeCrossover(ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][0],
                                                        ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][1])
                                    this.makeCrossover(ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][2],
                                                       ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][3])
                                    break
                                case 6:
                                    this.makeCrossover(ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][0],
                                                        ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][1])
                                    this.makeCrossover(ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][2],
                                        ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][3])
                                    this.makeCrossover(ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][4],
                                            ElementaryAG15_POSSIBLE_CROSSOVERS[this.step3crossoverChosenOption][5])
                                    break
                            }
                            break
                        case this.rectanglesYCoords[3]: // 4 krok mutacja
                            // this.changeLabelsColours()
                            sleep(200).then(()=>{
                                for (let i = 0; i < ElementaryAG15_INDIVIDUALS_COUNT; ++i) {
                                    if (probability(ElementaryAG15_MUTATION_PROBABILITY)) {
                                        this.individuals[i].labelColour[0] = randomIntFromInterval(0, 254)
                                        this.individuals[i].labelColour[1] = randomIntFromInterval(0, 254)
                                        this.individuals[i].labelColour[2] = randomIntFromInterval(0, 254)
                                    }
                                }
                                this.animationStepInPopulationEnded = true
                                this.textFlashingRepetitions = 0
                            })
                            if (this.animationStepInPopulationEnded) {
                                this.windowCurrentStepY += 2 // zwiekszenie zeby switch wpadl do kolejnej etykiety case: this.rectanglesYCoords[x]
                            }
                            break
                        case this.rectanglesYCoords[4]: // 5 krok - powrot do kroku 2
                            this.windowCurrentStepY = this.rectanglesYCoords[1]
                            break
                }

                }
            }
        }
        
        if (this.rectanglesYCoords.includes(this.windowCurrentStepY, 1)) { // szukaj od indeksu [1]
            this.isWindowCurrentStepMoving = false
            this.animationStepInPopulationEnded = false
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

            p5.strokeWeight(0)
            p5.stroke(0)
            p5.fill(this.individuals[i].labelColour[0], this.individuals[i].labelColour[1], this.individuals[i].labelColour[2])
            p5.textSize(ElementaryAG15_INDIVIDUALS_TEXT_SIZE)

            if (ElementaryAG15_INDIVIDUALS_TEXT_SIZE > 0) {
                p5.text(this.individuals[i].label,
                        this.individuals[i].x + ElementaryAG15_INDIVIDUALS_WIDTH / 2.5,
                        this.individuals[i].y + ElementaryAG15_INDIVIDUALS_HEIGHT / 1.5)
            }
        }

        // przezroczysty prostokat - zielone okno pokazujace ktory teraz krok algorytmu jest pokazywany
        p5.strokeWeight(5)
        p5.stroke(0, 255, 0)
        p5.noFill()  
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