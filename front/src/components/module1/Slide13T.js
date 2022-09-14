import React, {Component} from "react";
import SimulatedAnnealing13 from "./SimulatedAnnealing13";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description13 from "./Description13";
import Description14 from "./Description14";

class Slide13T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description13 mainArea={this.mainArea}></Description13>;
        this.next = <Description14 mainArea={this.mainArea}></Description14>;
        this.title = 'Metody losowe - symulowane wyżarzanie'

        this.navigationButtons = React.createRef();
        this.simulatedAnnealing13 = React.createRef();
    }

    handleStartStop = (simulationStopped) => {
        if (simulationStopped) {
            this.simulatedAnnealing13.current.ballTemperature.maxFound = true
            this.navigationButtons.current.enableNavigationButtons()
        }
        else {
            this.simulatedAnnealing13.current.ballTemperature.maxFound = false
        }
    }
    
    render() {
        return(
        <div>
            <h1>{this.title}</h1>

            <SimulatedAnnealing13 ref={this.simulatedAnnealing13} onStartStop={this.handleStartStop}/>

            <NavigationButtons 
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={6}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide13T;