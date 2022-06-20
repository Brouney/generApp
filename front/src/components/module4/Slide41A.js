import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide42A from "./Slide42A";
import PlotlyChart_sandbox from "./PlotlyChart_sandbox";


class Slide41A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide42A prev={<Slide41A></Slide41A>} mainArea={this.mainArea}></Slide42A>
        this.plotlyChart_sandbox = React.createRef();
        this.quizTemplate = React.createRef()
    }

    onSimulationEnd = () => {
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
    }

    render(){
        
        return(
        <div>
            <h1>Piaskownica</h1>
            
            <div className='col-10'>
                    <PlotlyChart_sandbox
                        ref={this.plotlyChart_sandbox}
                        title='Poszukiwanie ekstremum globalnego funkcji'
                        onSimulationEnd={this.onSimulationEnd}
                        gridDensity={100}
                    />
                </div>

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={1} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide41A;