import React, {Component} from "react";
import Slide13T from "./Slide13T";
import Slide15A from "./Slide15A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import AGvsTraditional14 from "./AGvsTraditonal14";

class Slide14A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide13T mainArea={this.mainArea}></Slide13T>
        this.next = <Slide15A prev={<Slide14A></Slide14A>} mainArea={this.mainArea}></Slide15A>
        this.title = 'Różnice między AG i metodami tradycyjnymi'

    }

    render() {
        return(
            <div>
                <h1>{this.title}</h1>
                <AGvsTraditional14></AGvsTraditional14>
                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={4} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide14A;