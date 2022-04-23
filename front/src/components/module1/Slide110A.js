import React, {Component} from "react";
import Slide19A from "./Slide19A";
import Slide13T from "./Slide13T";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Plot from "react-plotly.js";

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

        this.state = {
            data: this.generateCube()
        };
    }

    onSimulationEnd = () => {
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
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

            <Plot
            data={[
            {
                type: "surface",
                name: '3D',
                z: this.state.data,
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
                    // zeroline: False
                    visible: false
                },
                yaxis: {
                    showgrid: false,
                    // zeroline: False
                    visible: false
                },
                margin: {
                    l: CHART_MARGIN,
                    r: CHART_MARGIN,
                    b: CHART_MARGIN,
                    t: CHART_MARGIN * 8,
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

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={10} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>)
    }
}


export default Slide110A;