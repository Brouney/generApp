import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import QuizTemplate from "../templates/QuizTemplate";
import Slide27A from "./Slide27A";
import Slide29A from "./Slide29A";


class Slide28A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide27A mainArea={this.mainArea}></Slide27A>;
        this.next = <Slide29A prev={<Slide28A></Slide28A>} mainArea={this.mainArea}></Slide29A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 2 Slajd 1</h1>
            Szablon quizu
            <QuizTemplate ref={this.quizTemplate} slide={this}></QuizTemplate>

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={8} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide28A;