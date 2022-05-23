import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide21Q from "./Slide21Q";
import Slide23A from "./Slide23A";
import ParameterComponent22A from "../module1/ParameterComponent22A";
import Plot from "react-plotly.js";
class Slide22A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide21Q mainArea={this.mainArea}></Slide21Q>;
        this.next = <Slide23A prev={<Slide22A></Slide22A>} mainArea={this.mainArea}></Slide23A>
        // this.table = [React.createRef(), React.createRef(), React.createRef(), React.createRef()]
        this.state = {
            level : 0,
            parameters : [
                
            ],
            references : [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()],
            main_eon: [],
            main_eoff: []
        }
       
        
    }
    onClickAddParameter = () => {
        
        let tmp = <ParameterComponent22A ref={this.state.references[this.state.level]}main={this} level={this.state.level + 1}/>
        this.setState(prevState => ({
            parameters: [...prevState.parameters, tmp ],
            level: this.state.level + 1,
            references : [...prevState.references, React.createRef() ],
        }))

    }

    onClickDeleteParameter = () => {
        var parametersAfterDeletion = [...this.state.parameters];
        var lastElement = parametersAfterDeletion.length-1

        parametersAfterDeletion.splice(parametersAfterDeletion[lastElement], 1);
        this.setState({parameters: parametersAfterDeletion,
                       level: this.state.level - 1
        });
    }
    render(){
        let x = Array.from(Array(this.state.parameters.length).keys())
        let plotData = [{
            x : x,
            y : this.state.main_eon,
            type: 'scatter',
            name: 'e online'
        },{
            x : x,
            y : this.state.main_eoff,
            type: 'scatter',
            name: 'e offline'
        }]
        return(
        <div>
            <h1>Kryteria oceny algorytmu genetycznego</h1>
            <div className="col">
                    <button ref={ref => this.addParameter = ref} type="submit" className="btn btn-success col-2 m-1" onClick={this.onClickAddParameter}>Dodaj pokolenie</button>
                    <button ref={ref => this.deleteParameter = ref} type="submit" className="btn btn-warning col-2 m-1" onClick={this.onClickDeleteParameter}>Usuń pokolenie</button>
                    </div>
            <div className="col-8" style={{ marginLeft:"620px"}}><h3>Osobniki | Parametry oceny</h3></div>
                <ol>
                    {this.state.parameters.map(component => component)}
                </ol>
            
                <div className="row-3">
                            <Plot
                                data={plotData}
                                config={{
                                    'displayModeBar': false, // wylaczenie kontrolek Plotly
                                    "scrollZoom": false      // wylaczenie zoomowania wykresu rolka myszki
                                }}
                                layout={{
                                    width: 500,
                                    height: 400,
                                    margin: {
                                        l: 50,
                                        r: 20,
                                        b: 60,
                                        t: 60,
                                        pad: 4
                                      },
                                    title: "Kryterium oceny algorytmu",
                                    // paper_bgcolor: '#d3d3d3',
                                    // plot_bgcolor: '#343a40',
                                    xaxis: {
                                        // showgrid: false,
                                        // visible: false,
                                        title: {
                                            text: 't'
                                        },
                                        tickmode: "linear",
                                        tick0: 1,
                                        dtick: 3
                                    },
                                    yaxis: {
                                        title: "ocena offline i online",
                                        // showgrid: false,
                                        // visible: false
                                    },
                                }}
                            />
                        </div>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide22A;