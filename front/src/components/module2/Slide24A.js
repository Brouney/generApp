import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description24 from "./Description24";
import Description25 from "./Description25";
import Plot from "react-plotly.js";

class Slide24A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description24 mainArea={this.mainArea}></Description24>
        this.next = <Description25 prev={<Slide24A></Slide24A>} mainArea={this.mainArea}></Description25>
        this.timerId = null;
        this.title = 'Metoda kar'
        this.state = {
            percent: 0,
            Slide_24A_plotData: [
                { // TODO wyliczyc z jako funkcja 2 zmiennych
                    z: [[10, 10.625, 12.5, 15.625, 20],
                        [5.625, 6.25, 8.125, 11.25, 15.625],
                        [2.5, 3.125, 5., 8.125, 12.5],
                        [0.625, 1.25, 3.125, 6.25, 10.625],
                        [0, 0.625, 2.5, 5.625, 10]],
                    x: [-9, -6, -5 , -3, 3],
                    y: [0, 1, 4, 5, 8],
                    type: 'contour',
                    name: 'Mapa',
                },
                {
                    type: "scatter",
                    name: 'Osobniki',
                    x: [0, 1, 2],
                    y: [4, 5, 6],
                    mode: 'markers',
                    colorscale: 'hsv',
                    marker: {
                        color: 'rgb(0, 255, 0)',
                        size: 20,
                        line: {
                          color: 'black',
                          width: 2
                        }
                      },
                }
                ]
        }

        this.navigationButtons = React.createRef();
        this.evolution = this.evolution.bind(this);
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            clearInterval(this.timerId)
        }
        else {
            this.timerId = setInterval(() => {
                this.evolution()
            }, 1000);
        }
    }

    onSimulationEnd = () => {
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
    }

    evolution = () => {
        var aaa = [...this.state.Slide_24A_plotData]
        aaa[1]['x'][0] += 1
        aaa[1]['y'][0] += 1
        aaa[1]['x'].push(0)
        aaa[1]['y'].push(0)

        this.setState(prevState => ({
            percent: prevState.percent+0.001,
            Slide_24A_plotData: aaa
        }))


    }

    render(){
        console.log(this.state.Slide_24A_plotData[1]['x'][0])
        console.log(this.state.Slide_24A_plotData)

        return(
            <div>
                <h1>{this.title}</h1>
                
                <div className="row-3">
                    {/* TODO plot sie nie updatuje */}
                    <Plot
                        data={this.state.Slide_24A_plotData}
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
                                tickmode: "linear"
                            },
                            yaxis: {
                                title: "y"
                            },
                            font: {
                                // family: "Courier New, monospace",
                                size: 18,
                                color: "black"
                            }
                        }}
                    />
                </div>

                <NavigationButtons ref={this.navigationButtons} onStartStop={this.handleStartStop} mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={10} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide24A;