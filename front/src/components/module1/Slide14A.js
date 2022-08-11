import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import AGvsTraditional14 from "./AGvsTraditonal14";
import Description14 from "./Description14";
import Description15 from "./Description15";

class Slide14A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description14 mainArea={this.mainArea}></Description14>;
        this.next = <Description15 mainArea={this.mainArea}></Description15>;
        this.title = 'Różnice między algorytmami genetycznymi i metodami tradycyjnymi'

    }

    render() {
        return(
            <div>
                <h1>{this.title}</h1>
                <AGvsTraditional14></AGvsTraditional14>
                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={8} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide14A;