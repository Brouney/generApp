import React, {Component} from "react";
import Slide13T from "./Slide13T";
import NavigationButtons from "../templates/NavigationButtons";
import Slide11T from "./Slide11T";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'

class Slide12A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide11T mainArea={this.mainArea}></Slide11T>;
        this.next = <Slide13T prev={<Slide12A></Slide12A>} mainArea={this.mainArea}></Slide13T>        
        
    }
    render(){

        return(
        <div>
            <h1>Moduł 1 Slajd 2</h1>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}></NavigationButtons>
        </div>)
    }

}

export default Slide12A;