import React, {Component} from "react";
import Slide110A from "./Slide110A";
import Slide112A from "./Slide112A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'

class Slide111A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide110A mainArea={this.mainArea}></Slide110A>
        this.next = <Slide112A prev={<Slide111A></Slide111A>} mainArea={this.mainArea}></Slide112A>
        this.title = 'tytul'
        this.state = {
            backpackCurrentWeight: 0
        }
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>

                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={11} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide111A;