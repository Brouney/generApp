import React, {Component} from "react";
import Slide12A from "./Slide12A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import QuizTemplate from "../templates/QuizTemplate";

class Slide13T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide12A mainArea={this.mainArea}></Slide12A>;
        this.next = null   
        this.quizTemplate = React.createRef()
    }
    render(){
        return(
        <div>
            <h1>Moduł 1 Slajd 3</h1>
            <QuizTemplate ref={this.quizTemplate} slide={this}></QuizTemplate>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide13T;