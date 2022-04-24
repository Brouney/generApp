import React, {Component} from "react";
import Slide112A from "./Slide112A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'

class Slide113A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide112A mainArea={this.mainArea}></Slide112A>
        this.next = null
        this.title = 'tytul'
        this.state = {
            backpackCurrentWeight: 0
        }
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>

                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={13} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide113A;