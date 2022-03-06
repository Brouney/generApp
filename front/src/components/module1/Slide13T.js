import React, {Component} from "react";
import Slide12A from "./Slide12A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'


class Slide13T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide12A mainArea={this.mainArea}></Slide12A>;
        this.next = null   
        
    }
    render(){
        return(
        <div>
            <h1>Moduł 1 Slajd 3</h1>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}></NavigationButtons>
        </div>
        )
    }

}

export default Slide13T;