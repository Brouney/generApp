import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description24 from "./Description24";
import Description25 from "./Description25";
import Plot from "react-plotly.js";
import { Button } from "antd";
import MySlider from "../common/MySlider";
var Latex = require('react-latex');

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function randomFloatFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min) + min
}

function rastrigin(x, y) {
    return x*x + y*y - 5*(Math.cos(2*3.14*x) + Math.cos(2*3.14*y))
}

const Slide24A_INDIVIDUALS_OFFSET = 0.2
const Slide24A_EVOLUTION_INDIVIDUAL_STEP = 0.2

const Slide24A_X_MIN = -5
const Slide24A_X_MAX = 5
const Slide24A_X_STEP = 0.2
var Slide24A_X_ON_MAP = range(Slide24A_X_MIN, Slide24A_X_MAX, Slide24A_X_STEP)

const Slide24A_Y_MIN = -5
const Slide24A_Y_MAX = 5
const Slide24A_Y_STEP = 0.2
var Slide24A_Y_ON_MAP = range(Slide24A_Y_MIN, Slide24A_Y_MAX, Slide24A_Y_STEP)

var Slide24A_Z_ON_MAP = []

const Slide24A_x_minText = <Latex>{"${X_{min}}$"}</Latex>
const Slide24A_x_maxText = <Latex>{"${X_{max}}$"}</Latex>
const Slide24A_y_minText = <Latex>{"${Y_{min}}$"}</Latex>
const Slide24A_y_maxText = <Latex>{"${Y_{max}}$"}</Latex>
const Slide24A_penaltyRatioText = <Latex>{"Współczynnik kary ${r}$"}</Latex>

const Slide24A_penaltyAreaMinX_DEFAULT = -3
const Slide24A_penaltyAreaMaxX_DEFAULT = 3
const Slide24A_penaltyAreaMinY_DEFAULT = -3
const Slide24A_penaltyAreaMaxY_DEFAULT = 3

const Slide24A_MAX_GENERATIONS_COUNT = 1000

var Slide24A_currentGenerationsCount = 0

class Slide24A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description24 mainArea={this.mainArea}></Description24>
        this.next = <Description25 prev={<Slide24A></Slide24A>} mainArea={this.mainArea}></Description25>
        this.timerId = null;
        this.title = 'Metoda kar - poszukiwanie minimum funkcji dwóch zmiennych'
        this.state = {
            populationXcoord: [-2,0.8,1],
            populationYcoord: [-1.5,0.3,1],
            populationZcoord: [1,1,1],
            populationIfKilled: [false, false, false],
            populationSize: 10,

            penaltyAreaMinX: Slide24A_penaltyAreaMinX_DEFAULT,
            penaltyAreaMaxX: Slide24A_penaltyAreaMaxX_DEFAULT,
            penaltyAreaMinY: Slide24A_penaltyAreaMinY_DEFAULT,
            penaltyAreaMaxY: Slide24A_penaltyAreaMaxY_DEFAULT,

            penaltyOn: false,
            penaltyRatio: 0.01,

            generationsCount: 100,
        }

        this.navigationButtons = React.createRef();
        this.sliderPopSize = React.createRef()
        this.sliderGenerationsCount = React.createRef()
        this.sliderPenaltyRatio = React.createRef()
        this.penaltyAreaSliderMinX = React.createRef()
        this.penaltyAreaSliderMaxX = React.createRef()
        this.penaltyAreaSliderMinY = React.createRef()
        this.penaltyAreaSliderMaxY = React.createRef()

        this.evolution = this.evolution.bind(this);
        this.generate2Dmap = this.generate2Dmap.bind(this);

        this.generate2Dmap()
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            clearInterval(this.timerId)
        }
        else {
            this.timerId = setInterval(() => {
                this.evolution()
            }, 100);
        }
    }

    onSimulationEnd = () => {
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
    }

    clearGlobals = () => {
        Slide24A_X_ON_MAP = range(Slide24A_X_MIN, Slide24A_X_MAX, Slide24A_X_STEP)
        Slide24A_Y_ON_MAP = range(Slide24A_Y_MIN, Slide24A_Y_MAX, Slide24A_Y_STEP)
        Slide24A_Z_ON_MAP = []

        Slide24A_currentGenerationsCount = 0
    }

    generate2Dmap = () => {
        this.clearGlobals()

        for (let x = 0; x < Slide24A_X_ON_MAP.length; x++) {
            var rowInZList = []
            for (let y = 0; y < Slide24A_Y_ON_MAP.length; y++) {
                rowInZList.push(rastrigin(Slide24A_X_ON_MAP[x], Slide24A_Y_ON_MAP[y]))
            }
            Slide24A_Z_ON_MAP.push(rowInZList)
        }
    }

    anyIndividualAlive() {
        return this.state.populationXcoord.length > 0  ? true : false
    }

    evolution = () => {
        if (Slide24A_currentGenerationsCount < this.state.generationsCount && this.anyIndividualAlive()) {
            var xxx = [...this.state.populationXcoord]
            var yyy = [...this.state.populationYcoord]
            var newPopulationIfKilled = [...this.state.populationIfKilled]
    
            // individuals are moving in current generation
            for (let i = 0; i < xxx.length; i++) {
                xxx[i] += randomFloatFromInterval(-Slide24A_EVOLUTION_INDIVIDUAL_STEP, Slide24A_EVOLUTION_INDIVIDUAL_STEP)
                yyy[i] += randomFloatFromInterval(-Slide24A_EVOLUTION_INDIVIDUAL_STEP, Slide24A_EVOLUTION_INDIVIDUAL_STEP)
    
                // prevent leaving map
                if (xxx[i] < Slide24A_X_MIN) { xxx[i] = Slide24A_X_MIN }
                if (xxx[i] > Slide24A_X_MAX) { xxx[i] = Slide24A_X_MAX }
                if (yyy[i] < Slide24A_Y_MIN) { yyy[i] = Slide24A_Y_MIN }
                if (yyy[i] > Slide24A_Y_MAX) { yyy[i] = Slide24A_Y_MAX }
    
                if (this.state.penaltyOn == false) { // metoda kar wylaczona, zabijamy osobniki ktore znalazly sie poza obszarem kary
                    if (xxx[i] < this.state.penaltyAreaMinX || 
                        xxx[i] > this.state.penaltyAreaMaxX ||
                        yyy[i] < this.state.penaltyAreaMinY ||
                        yyy[i] > this.state.penaltyAreaMaxY) {
        
                        newPopulationIfKilled[i] = true
                    }
                }
                else { // metoda kar wlaczona
                    if (xxx[i] < this.state.penaltyAreaMinX) { xxx[i] += ((1 - this.state.penaltyRatio) / 5)  }
                    if (xxx[i] > this.state.penaltyAreaMaxX) { xxx[i] -= ((1 - this.state.penaltyRatio) / 5)  }
                    if (yyy[i] < this.state.penaltyAreaMinY) { yyy[i] += ((1 - this.state.penaltyRatio) / 5)  }
                    if (yyy[i] > this.state.penaltyAreaMaxY) { yyy[i] -= ((1 - this.state.penaltyRatio) / 5)  }
                }
            }
    
            // reproduction
            var newX = []
            var newY = []
            var newZ = []
            for (let i = 0; i < newPopulationIfKilled.length; i++) {
                if (newPopulationIfKilled[i] == false) {
                    newX.push(xxx[i])
                    newY.push(yyy[i])
                    newZ.push(rastrigin(xxx[i], yyy[i]))
                }
            }
    
            newPopulationIfKilled = []
            for (let i = 0; i < newX.length; i++) {
                newPopulationIfKilled.push(false)
            }
    
            this.setState(prevState => ({
                populationXcoord: newX,
                populationYcoord: newY,
                populationZcoord: newZ,
                populationIfKilled: newPopulationIfKilled,
            }))

            Slide24A_currentGenerationsCount++
        }
        else {
            this.onSimulationEnd()
        }
    }
    
    onChangeSliderPenaltyRatio = (v) => {
        this.setState({
            penaltyRatio: v,
        });
    }

    onChangeSliderGenerationsCount = (v) => {
        this.setState({
            generationsCount: v,
        });
    }

    onChangeSliderPopulationSize = (v) => {
        this.setState({
            populationSize: v,
        });
    }

    onChangeSliderPenaltyAreaMinX = (v) => {
        this.setState({
            penaltyAreaMinX: v
        });
    }
    onChangeSliderPenaltyAreaMaxX = (v) => {
        this.setState({
            penaltyAreaMaxX: v,
        });
    }
    onChangeSliderPenaltyAreaMinY = (v) => {
        this.setState({
            penaltyAreaMinY: v,
        });
    }
    onChangeSliderPenaltyAreaMaxY = (v) => {
        this.setState({
            penaltyAreaMaxY: v,
        });
    } 

    generateRandomObjects = () => {
        //generowanie punktów na funkcji (osobnikow)
        let newObjectsX = []
        let newObjectsY = []
        let newObjectsZ = []
        let newPopulationIfKilled = []

        for (let i = 0; i < this.state.populationSize; i++) {
            let randomX = randomFloatFromInterval(Slide24A_X_MIN+Slide24A_INDIVIDUALS_OFFSET, Slide24A_X_MAX-Slide24A_INDIVIDUALS_OFFSET)
            let randomY = randomFloatFromInterval(Slide24A_Y_MIN+Slide24A_INDIVIDUALS_OFFSET, Slide24A_Y_MAX-Slide24A_INDIVIDUALS_OFFSET)

            newObjectsX.push(randomX)
            newObjectsY.push(randomY)
            newObjectsZ.push(rastrigin(randomX, randomY))
            newPopulationIfKilled.push(false)
        }

        this.setState({
            populationXcoord: [...newObjectsX],
            populationYcoord: [...newObjectsY],
            populationZcoord: [...newObjectsZ],
            populationIfKilled: [...newPopulationIfKilled],
            generationsCount: 100
        })

        Slide24A_currentGenerationsCount = 0
    }

    penaltyOnOff = () => {
        this.setState({
            penaltyOn: !this.state.penaltyOn,
        });
    }


    render(){
        return(
            <div>
                <h1>{this.title}</h1>

                <div className="row">
                    <div className="col-8">
                        <Plot
                            data={[
                                {
                                    x: Slide24A_X_ON_MAP,
                                    y: Slide24A_Y_ON_MAP,
                                    z: Slide24A_Z_ON_MAP,
                                    type: 'contour',
                                    name: 'Mapa',
                                },
                                {
                                    x: [this.state.penaltyAreaMinX, this.state.penaltyAreaMaxX, this.state.penaltyAreaMinX, this.state.penaltyAreaMaxX],
                                    y: [this.state.penaltyAreaMinY, this.state.penaltyAreaMinY, this.state.penaltyAreaMaxY, this.state.penaltyAreaMaxY],
                                    z: [60,60,60,60],
                                    type: 'contour',
                                    name: 'Granica kary',
                                    opacity: 0.6,
                                    showscale: false,
                                    contours: {
                                        start: 60,
                                        end: 61,
                                        size: 25,
                                        coloring: "heatmap"
                                    }
                                },
                                {
                                    type: "scatter",
                                    name: 'Osobniki',
                                    x: this.state.populationXcoord,
                                    y: this.state.populationYcoord,
                                    mode: 'markers',
                                    colorscale: 'hsv',
                                    marker: {
                                        color: 'rgb(0, 255, 0)',
                                        size: 18,
                                        line: {
                                        color: 'black',
                                        width: 2
                                        }
                                    },
                                }
                                ]}
                            config={{
                                'displayModeBar': false, // wylaczenie kontrolek Plotly
                                "scrollZoom": false      // wylaczenie zoomowania wykresu rolka myszki
                            }}
                            layout={{
                                width: 700,
                                height: 550,
                                margin: {
                                    l: 80,
                                    r: 20,
                                    b: 80,
                                    t: 60,
                                    pad: 4
                                    },
                                title: "Metoda kar",
                                paper_bgcolor: '#d1d1d1',
                                // plot_bgcolor: '#343a40',
                                xaxis: {
                                    title: {
                                        text: 'x',
                                    },
                                    tickmode: "linear",
                                    range: [Slide24A_X_MIN, Slide24A_X_MAX]
                                },
                                yaxis: {
                                    title: "y",
                                    range: [Slide24A_Y_MIN, Slide24A_Y_MAX]
                                },
                                font: {
                                    // family: "Courier New, monospace",
                                    size: 18,
                                    color: "black"
                                }
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <Button type="primary" onClick={this.generateRandomObjects}>Wygeneruj populację</Button>
                        <MySlider min={3} max={50} defaultValue={3} sliderSize={4} step={1} ref={this.sliderPopSize} text={"Rozmiar populacji"} passValueToParent={this.onChangeSliderPopulationSize}></MySlider>
                        <MySlider min={10} max={Slide24A_MAX_GENERATIONS_COUNT} defaultValue={this.state.generationsCount} sliderSize={4} step={1} ref={this.sliderGenerationsCount} text={"Liczba pokoleń"} passValueToParent={this.onChangeSliderGenerationsCount}></MySlider>
                        <MySlider min={0.01} max={1} defaultValue={this.state.penaltyRatio} sliderSize={4} step={0.01} ref={this.sliderPenaltyRatio} text={Slide24A_penaltyRatioText} passValueToParent={this.onChangeSliderPenaltyRatio}></MySlider>
                        
                        <br></br>
                        <h4><label class="switch">
                            <input type="checkbox" onChange={this.penaltyOnOff} name="penaltyOnOff"/> 
                            {this.state.penaltyOn ? <label for="penaltyOnOff"><span style={{color: "lime"}}> Metoda kar WŁĄCZONA</span></label> : <label for="penaltyOnOff"><span style={{color: "red"}}> Metoda kar WYŁĄCZONA</span></label>}
                        </label></h4>
                        <br></br><h3>Obszar kary</h3> 
                        <MySlider min={Slide24A_X_MIN} max={-0.05} defaultValue={Slide24A_penaltyAreaMinX_DEFAULT} sliderSize={4} step={0.05} ref={this.penaltyAreaSliderMinX} text={Slide24A_x_minText} passValueToParent={this.onChangeSliderPenaltyAreaMinX}></MySlider>
                        <MySlider min={0.05} max={Slide24A_X_MAX} defaultValue={Slide24A_penaltyAreaMaxX_DEFAULT} sliderSize={4} step={0.05} ref={this.penaltyAreaSliderMaxX} text={Slide24A_x_maxText} passValueToParent={this.onChangeSliderPenaltyAreaMaxX}></MySlider>
                        <MySlider min={Slide24A_Y_MIN} max={-0.05} defaultValue={Slide24A_penaltyAreaMinY_DEFAULT} sliderSize={4} step={0.05} ref={this.penaltyAreaSliderMinY} text={Slide24A_y_minText} passValueToParent={this.onChangeSliderPenaltyAreaMinY}></MySlider>
                        <MySlider min={0.05} max={Slide24A_Y_MAX} defaultValue={Slide24A_penaltyAreaMaxY_DEFAULT} sliderSize={4} step={0.05} ref={this.penaltyAreaSliderMaxY} text={Slide24A_y_maxText} passValueToParent={this.onChangeSliderPenaltyAreaMaxY}></MySlider>
                        <br></br>
                        <h3>Pokolenie: {Slide24A_currentGenerationsCount+1}<br></br></h3><h3>{this.state.populationXcoord.length ? <span style={{color: "lime"}}>Pozostałe osobniki:  {this.state.populationXcoord.length}</span> : <span style={{color: "red"}}> Wszystkie osobniki wymarły</span>}<br></br><br></br>
                        Najlepszy osobnik: {this.state.populationXcoord.length ? Math.min(...this.state.populationZcoord).toFixed(3) : <span style={{color: "red"}}></span>}
                        </h3>
                    </div>
                </div>

                <NavigationButtons ref={this.navigationButtons} onStartStop={this.handleStartStop} mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={10} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide24A;