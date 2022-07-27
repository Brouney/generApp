import React, {Component} from "react";
import Slide14A from "./Slide14A";
import Slide16A from "./Slide16A";
import NavigationButtons from "../templates/NavigationButtons";
import ElementaryAG15 from "./ElementaryAG15";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description15 from "./Description15";
import Description16 from "./Description16";

class Slide15A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description15 mainArea={this.mainArea}></Description15>;
        this.next = <Description16 mainArea={this.mainArea}></Description16>;
        this.title = 'Elementarny algorytm genetyczny'

        this.navigationButtons = React.createRef()
        this.elementaryAG15 = React.createRef()
    }


    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.elementaryAG15.current.simulationRunning = false
        }
        else {
            this.elementaryAG15.current.simulationRunning = true
        }
    }
    
    render() {
        return(
        <div>
            <h1>{this.title}</h1>
            <ElementaryAG15 ref={this.elementaryAG15}/>

            <NavigationButtons 
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={10}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide15A;