import React, {Component} from "react";
import Slide111A from "./Slide111A";
import Slide113A from "./Slide113A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'

class Slide112A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide111A mainArea={this.mainArea}></Slide111A>
        this.next = <Slide113A prev={<Slide112A></Slide112A>} mainArea={this.mainArea}></Slide113A>
        this.title = 'tytul'
        this.state = {
            backpackCurrentWeight: 0
        }
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>

                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={12} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide112A;