import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'

class Slide21Q extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = null
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 2 Slajd 1</h1>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={1} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide21Q;