import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import QuizTemplate from "../templates/QuizTemplate";
import Slide26A from "./Slide26A";

class Slide21Q extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide26A mainArea={this.mainArea}></Slide26A>;

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 2 Slajd 1</h1>
            Szablon quizu
            <QuizTemplate ref={this.quizTemplate} slide={this}></QuizTemplate>

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={1} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide21Q;