import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description24 from "./Description24";
import Description25 from "./Description25";
import Plot from "react-plotly.js";
import { Button } from "antd";
import MySlider from "../common/MySlider";

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloatFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min) + min
}

function rastrigin(x, y) {
    return x*x + y*y - 5*(Math.cos(2*3.14*x) + Math.cos(2*3.14*y))
}

const Slide24A_INDIVIDUALS_OFFSET = 0.2
const Slide24A_EVOLUTION_INDIVIDUAL_STEP = 0.05

const Slide24A_X_MIN = -5
const Slide24A_X_MAX = 5
const Slide24A_X_STEP = 0.2
var Slide24A_X_ON_MAP = range(Slide24A_X_MIN, Slide24A_X_MAX, Slide24A_X_STEP)

const Slide24A_Y_MIN = -5
const Slide24A_Y_MAX = 5
const Slide24A_Y_STEP = 0.2
var Slide24A_Y_ON_MAP = range(Slide24A_Y_MIN, Slide24A_Y_MAX, Slide24A_Y_STEP)

var Slide24A_Z_ON_MAP = []

class Slide24A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description24 mainArea={this.mainArea}></Description24>
        this.next = <Description25 prev={<Slide24A></Slide24A>} mainArea={this.mainArea}></Description25>
        this.timerId = null;
        this.title = 'Metoda kar'
        this.state = {
            populationXcoord: [0,1,2],
            populationYcoord: [0,1,2],
            populationSize: 10
        }

        this.navigationButtons = React.createRef();
        this.sliderPopSize = React.createRef()

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
            }, 50);
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

    evolution = () => {
        var xxx = [...this.state.populationXcoord]
        var yyy = [...this.state.populationYcoord]

        xxx.push(randomFloatFromInterval(Slide24A_Y_MIN+Slide24A_INDIVIDUALS_OFFSET, Slide24A_Y_MAX-Slide24A_INDIVIDUALS_OFFSET))
        yyy.push(randomFloatFromInterval(Slide24A_Y_MIN+Slide24A_INDIVIDUALS_OFFSET, Slide24A_Y_MAX-Slide24A_INDIVIDUALS_OFFSET))

        for (let i = 0; i < 5; i++){
            xxx[randomIntFromInterval(0, xxx.length)] += Slide24A_EVOLUTION_INDIVIDUAL_STEP
            yyy[randomIntFromInterval(0, yyy.length)] += Slide24A_EVOLUTION_INDIVIDUAL_STEP
        }
        xxx[0] += Slide24A_EVOLUTION_INDIVIDUAL_STEP
        yyy[0] += Slide24A_EVOLUTION_INDIVIDUAL_STEP

        this.setState(prevState => ({
            populationXcoord: xxx,
            populationYcoord: yyy,
        }))
    }

    onChangeSliderPopulationSize = (v) => {
        // this.disableOperatorsButtons()

        this.setState({
            populationSize: v,
        });
    }

    generateRandomObjects = () => {
        //generowanie punktów na funkcji (osobnikow)
        let newObjectsX = []
        let newObjectsY = []

        for (let i = 0; i < this.state.populationSize; i++){
            let randomX = randomFloatFromInterval(Slide24A_X_MIN+Slide24A_INDIVIDUALS_OFFSET, Slide24A_X_MAX-Slide24A_INDIVIDUALS_OFFSET)
            let randomY = randomFloatFromInterval(Slide24A_Y_MIN+Slide24A_INDIVIDUALS_OFFSET, Slide24A_Y_MAX-Slide24A_INDIVIDUALS_OFFSET)

            newObjectsX.push(randomX)
            newObjectsY.push(randomY)
        }

        this.setState({
            populationXcoord: [...newObjectsX],
            populationYcoord: [...newObjectsY],
        })
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
                                width: 800,
                                height: 600,
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
                        <MySlider min={5} max={30} defaultValue={10} sliderSize={4} step={1} ref={this.sliderPopSize} text={"Rozmiar populacji"} passValueToParent={this.onChangeSliderPopulationSize}></MySlider>
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