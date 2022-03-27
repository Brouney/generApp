import React, {Component} from "react";
import Slide14A from "./Slide14A";
import SimulatedAnnealing13 from "./SimulatedAnnealing13";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide16A from "./Slide16A";

class Slide15A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide14A mainArea={this.mainArea}></Slide14A>
        this.next = <Slide16A mainArea={this.mainArea}></Slide16A>
        this.title = 'Elementarny algorytm genetyczny'

        this.navigationButtons = React.createRef()
    }


    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.navigationButtons.current.enableNavigationButtons()
        }
        else {
        }
        
    }
    
    render() {
        return(
        <div>
            <h1>{this.title}</h1>
            TODO

            <NavigationButtons 
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={5}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide15A;