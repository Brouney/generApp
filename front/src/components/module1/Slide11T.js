import React, {Component} from "react";
import Slide12A from "./Slide12A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import  PlotlyChart3d from "../common/PlotlyChart3d";
import Description11 from "./Description11";
import Description12 from "./Description12";

class Slide11T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description11 mainArea={this.mainArea}></Description11>;
        this.next = <Description12 prev={<Slide11T></Slide11T>} next={<Slide12A mainArea={this.mainArea}></Slide12A>} mainArea={this.mainArea}></Description12>
        this.timerId = null;
        this.title = 'Tradycyjne metody poszukiwania - metody analityczne'

        this.plotlyChart3d = React.createRef();
        this.navigationButtons = React.createRef();
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            clearInterval(this.timerId)
            this.generateFunction1.disabled = ""
            this.generateFunction2.disabled = ""
        }
        else {
            this.generateFunction1.disabled = "disabled"
            this.generateFunction2.disabled = "disabled"
            this.timerId = setInterval(() => {
                this.plotlyChart3d.current.moveSquareOnChartTowardsExtremum()
            }, 300);
        }
    }

    onClickGenerateSaddle = () => {
        this.plotlyChart3d.current.generateData('saddle')
        this.plotlyChart3d.current.moveSquareOnChartTowardsExtremum()
    }

    onClickGenerateParaboloid = () => {
        this.plotlyChart3d.current.generateData('paraboloid')
        this.plotlyChart3d.current.moveSquareOnChartTowardsExtremum()
    }

    onSimulationEnd = () => {
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
    }
    

    render(){
        return(
        <div>
            <h1>{this.title}</h1>

            <div className="row">
                <div className='col-2' align="center">
                    <button ref={ref => this.generateFunction1 = ref} type="submit" className="btn btn-success m-1" onClick={this.onClickGenerateSaddle}>Siodło</button> <br/>
                    <button ref={ref => this.generateFunction2 = ref} type="submit" className="btn btn-success" onClick={this.onClickGenerateParaboloid}>Paraboloida</button>
                </div>

                <div className='col-10'>
                    <PlotlyChart3d
                        ref={this.plotlyChart3d}
                        title='Poszukiwanie ekstremum globalnego funkcji'
                        onSimulationEnd={this.onSimulationEnd}
                        gridDensity={20}
                    />
                </div>
            </div>


            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={2}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Slide11T