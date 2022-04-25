import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import QuizTemplate from "../templates/QuizTemplate";
import Slide25A from "./Slide25A";
import Slide27A from "./Slide27A";

class Slide26A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide25A mainArea={this.mainArea}></Slide25A>;
        this.next = <Slide27A prev={<Slide26A></Slide26A>} mainArea={this.mainArea}></Slide27A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 2 Slajd 1</h1>
            Szablon quizu
            <QuizTemplate ref={this.quizTemplate} slide={this}></QuizTemplate>

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={6} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide26A;