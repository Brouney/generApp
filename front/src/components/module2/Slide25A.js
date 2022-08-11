import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Puzzle25A from "./Puzzle25A";
import Description25 from "./Description25";
import Description26 from "./Description26";
class Slide25A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description25 mainArea={this.mainArea}></Description25>
        this.next = <Description26 mainArea={this.mainArea}></Description26>
        this.title = 'Terminologia - puzzle'
        this.state = {
            backpackCurrentWeight: 0
        }
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>
                <Puzzle25A parent={this} ></Puzzle25A>
                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={12} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide25A;