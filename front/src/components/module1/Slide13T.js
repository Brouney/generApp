import React, {Component} from "react";
import Slide12A from "./Slide12A";
import Slide14A from "./Slide14A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import QuizTemplate from "../templates/QuizTemplate";

class Slide13T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide12A mainArea={this.mainArea}></Slide12A>
        this.next = <Slide14A prev={<Slide13T></Slide13T>} mainArea={this.mainArea}></Slide14A>
        this.title = 'Tradycyjne metody poszukiwania - metody losowe'

        this.quizTemplate = React.createRef()
    }
    
    render() {
        return(
        <div>
            <h1>{this.title}</h1>
            Szablon quizu
            <QuizTemplate ref={this.quizTemplate} slide={this}></QuizTemplate>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide13T;