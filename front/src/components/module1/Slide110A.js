import React, {Component} from "react";
import Slide19A from "./Slide19A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Plot from "react-plotly.js";

//TODO: (opcjonalnie) lepiej zaznaczyc powierzchnie i krawedzie

// x: [0, 0, 1, 1, 0, 0, 1, 1],
// y: [0, 1, 1, 0, 0, 1, 1, 0],
// z: [0, 0, 0, 0, 1, 1, 1, 1],

const Slide110A_BOTTOM = [0.1,0.1,0.1,0.1,1,1,1,1]
const Slide110A_UP     = [1,1,1,1,0.1,0.1,0.1,0.1]
const Slide110A_BOK_0XX = [0.1,0.1,1,1,0.1,0.1,1,1]
const Slide110A_BOK_X1X = [1,0.1,0.1,1,1,0.1,0.1,1]
const Slide110A_BOK_X0X = [0.1,1,1,0.1,0.1,1,1,0.1]
const Slide110A_BOK_1XX = [1,1,0.1,0.1,1,1,0.1,0.1]

const Slide110A_UP_EDGE_0X1 = [1,1,1,1,0,0,1,1]
const Slide110A_UP_EDGE_X01 = [1,1,1,1,0,1,1,0]
const Slide110A_UP_EDGE_X11 = [1,1,1,1,1,0,0,1]
const Slide110A_UP_EDGE_1X1 = [1,1,1,1,1,1,0,0]

const Slide110A_BOK_EDGE_00X = [0,1,1,1,0,1,1,1]
const Slide110A_BOK_EDGE_01X = [1,0,1,1,1,0,1,1]
const Slide110A_BOK_EDGE_11X = [1,1,0,1,1,1,0,1]
const Slide110A_BOK_EDGE_10X = [1,1,1,0,1,1,1,0]

const Slide110A_BOTTOM_EDGE_0X0 = [0,0,1,1,1,1,1,1]
const Slide110A_BOTTOM_EDGE_X00 = [0,1,1,0,1,1,1,1]
const Slide110A_BOTTOM_EDGE_X10 = [1,0,0,1,1,1,1,1]
const Slide110A_BOTTOM_EDGE_1X0 = [1,1,0,0,1,1,1,1]

class Slide110A extends Component {

    constructor(props){
        super(props)
        this.GRID_DENSITY = props.gridDensity ? props.gridDensity : 10

        this.mainArea = props.mainArea
        this.title = 'Schematy jako wycinki przestrzeni rozwiązań'
        this.prev = <Slide19A mainArea={this.mainArea}></Slide19A>
        this.next = null

        this.plotlyChart3d = React.createRef();
        this.generateCube = this.generateCube.bind(this);
        this.onSchemaChange = this.onSchemaChange.bind(this);

        this.state = {
            data: this.generateCube(),
            intensityForPaintedArea: Slide110A_UP
        };
    }

    onSimulationEnd = () => {
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
    }

    onSchemaChange = (event) => {
        switch (event.target.value) {
            // sciany
            case '1':
                this.setState({intensityForPaintedArea: Slide110A_BOK_0XX})
                break
            case '2':
                this.setState({intensityForPaintedArea: Slide110A_BOK_1XX})
                break
            case '3':
                this.setState({intensityForPaintedArea: Slide110A_BOK_X0X})
                break
            case '4':
                this.setState({intensityForPaintedArea: Slide110A_BOK_X1X})
                break
            case '5':
                this.setState({intensityForPaintedArea: Slide110A_BOTTOM})
                break
            case '6':
                this.setState({intensityForPaintedArea: Slide110A_UP})
                break

            // gorne krawedzie
            case '7':
                this.setState({intensityForPaintedArea: Slide110A_UP_EDGE_0X1})
                break
            case '8':
                this.setState({intensityForPaintedArea: Slide110A_UP_EDGE_1X1})
                break
            case '9':
                this.setState({intensityForPaintedArea: Slide110A_UP_EDGE_X01})
                break
            case '10':
                this.setState({intensityForPaintedArea: Slide110A_UP_EDGE_X11})
                break

            // krawedzie bocznych scian
            case '11':
                this.setState({intensityForPaintedArea: Slide110A_BOK_EDGE_00X})
                break
            case '12':
                this.setState({intensityForPaintedArea: Slide110A_BOK_EDGE_01X})
                break
            case '13':
                this.setState({intensityForPaintedArea: Slide110A_BOK_EDGE_10X})
                break
            case '14':
                this.setState({intensityForPaintedArea: Slide110A_BOK_EDGE_11X})
                break

            // dolne krawedzie
            case '15':
                this.setState({intensityForPaintedArea: Slide110A_BOTTOM_EDGE_1X0})
                break
            case '16':
                this.setState({intensityForPaintedArea: Slide110A_BOTTOM_EDGE_X10})
                break
            case '17':
                this.setState({intensityForPaintedArea: Slide110A_BOTTOM_EDGE_0X0})
                break
            case '18':
                this.setState({intensityForPaintedArea: Slide110A_BOTTOM_EDGE_X00})
                break
        }
    }

    generateCube = () => {
        var randomNumbers = Array.from(Array(this.GRID_DENSITY), () => [])
        for (let x = 0; x < randomNumbers.length; x++) {
            for (let y = 0; y < this.GRID_DENSITY; y++) {
                randomNumbers[x][y] = 0
            }
        }

        return randomNumbers
    }


    render(){
        const CHART_MARGIN = 5
        return(
        <div>
            <h1>{this.title}</h1>

            <div className="row">
                <div className="col-8">
                    <Plot
                    data={[
                    {
                        type: "mesh3d",
                        name: '3D',
                        x: [0, 0, 1, 1, 0, 0, 1, 1],
                        y: [0, 1, 1, 0, 0, 1, 1, 0],
                        z: [0, 0, 0, 0, 1, 1, 1, 1],
                        colorscale: [['0', 'rgb(255, 0, 255)'], ['0.5', 'rgb(0, 255, 0)']],
                        intensity: this.state.intensityForPaintedArea,
                        alphahull: 0,
                        showscale: false,
                    },
                    ]}
                    config={{
                        'displayModeBar': false, // wylaczenie kontrolek Plotly
                        "scrollZoom": false      // wylaczenie zoomowania wykresu rolka myszki
                    }}
                    layout={{
                        width: '100%',
                        height: '100%',
                        title: this.props.title,
                        paper_bgcolor: '#d3d3d3',
                        plot_bgcolor: '#343a40',
                        xaxis: {
                            showgrid: false,
                            visible: false
                        },
                        yaxis: {
                            showgrid: false,
                            visible: false
                        },
                        margin: {
                            l: CHART_MARGIN,
                            r: CHART_MARGIN,
                            b: CHART_MARGIN * 4,
                            t: CHART_MARGIN * 2,
                            pad: 4
                        },
                    //   scene: {
                    //     xaxis: {
                    //       title: graphData.masterGraph.xAxis,
                    //       titlefont: {
                    //         family: "Courier New, monospace",
                    //         size: 12,
                    //         color: "#444444"
                    //       }
                    //     },
                    //     yaxis: {
                    //       title: graphData.masterGraph.yAxis,
                    //       titlefont: {
                    //         family: "Courier New, monospace",
                    //         size: 12,
                    //         color: "#444444"
                    //       }
                    //     },
                    //     zaxis: {
                    //       title: graphData.masterGraph.zAxis,
                    //       titlefont: {
                    //         family: "Courier New, monospace",
                    //         size: 12,
                    //         color: "#444444"
                    //       }
                    //     }
                    //   }
                    }}
                />
                </div>
                <div className="col-4">
                    <div onChange={this.onSchemaChange}>
                        <h4>
                        <input type="radio" value="1" name="schemas" /> 0** <br></br>
                        <input type="radio" value="2" name="schemas" /> 1** <br></br>
                        <input type="radio" value="3" name="schemas" /> *0* <br></br>
                        <input type="radio" value="4" name="schemas" /> *1* <br></br>
                        <input type="radio" value="5" name="schemas" /> **0 <br></br>
                        <input type="radio" value="6" name="schemas" /> **1 <br></br>

                        <input type="radio" value="7" name="schemas" /> 0*1 <br></br>
                        <input type="radio" value="8" name="schemas" /> 1*1 <br></br>
                        <input type="radio" value="9" name="schemas" /> *01 <br></br>
                        <input type="radio" value="10" name="schemas" /> *11 <br></br>

                        <input type="radio" value="11" name="schemas" /> 00* <br></br>
                        <input type="radio" value="12" name="schemas" /> 01* <br></br>
                        <input type="radio" value="13" name="schemas" /> 10* <br></br>
                        <input type="radio" value="14" name="schemas" /> 11* <br></br>

                        <input type="radio" value="15" name="schemas" /> 1*0 <br></br>
                        <input type="radio" value="16" name="schemas" /> *10 <br></br>
                        <input type="radio" value="17" name="schemas" /> 0*0 <br></br>
                        <input type="radio" value="18" name="schemas" /> *00 <br></br>
                        </h4>
                    </div>
                </div>

        </div>

    <h3>
        • Schemat rzędu 0 (***): <b>cała przestrzeń</b><br></br>
        • Schematy rzędu 1: <b>płaszczyzny</b><br></br>
        • Schematy rzędu 2: <b>proste</b><br></br>
        • W >3D schematy to <b>hiperpłaszczyzny</b>
        o różnych wymiarach
    </h3>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={10} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>)
    }
}


export default Slide110A;