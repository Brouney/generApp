import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_5_SLIDES_COUNT } from '../templates/ListExercisePanel'
import PlotlyChart_sandbox from "./PlotlyChart_sandbox";


class Slide51A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null
        this.next = null
        this.plotlyChart_sandbox = React.createRef();
        this.quizTemplate = React.createRef()
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.plotlyChart_sandbox.current.handleStartStop(true)
        }
        else {
            this.plotlyChart_sandbox.current.handleStartStop(false)
        }
    }

    render(){
        
        return(
        <div>
            <h1>Badanie wpływu operatorów na działanie algorytmu genetycznego</h1>
            
            <div className='col-10'>
                    <PlotlyChart_sandbox
                        ref={this.plotlyChart_sandbox}
                        title='Poszukiwanie ekstremum globalnego funkcji'
                        onSimulationEnd={this.onSimulationEnd}
                        gridDensity={160}
                    />
                </div>

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={1} slidesInModuleCounter={MODULE_5_SLIDES_COUNT}
                               current={this} onStartStop={this.handleStartStop}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide51A;