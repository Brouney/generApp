import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description24 from "./Description24";
import Description25 from "./Description25";

class Slide24A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description24 mainArea={this.mainArea}></Description24>
        this.next = <Description25 prev={<Slide24A></Slide24A>} mainArea={this.mainArea}></Description25>
        this.title = 'Metoda kar'
        this.state = {
        }
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>

                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={10} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide24A;