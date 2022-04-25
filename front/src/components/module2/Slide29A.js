import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import QuizTemplate from "../templates/QuizTemplate";
import Slide28A from "./Slide28A";
import Slide210A from "./Slide210A";

class Slide29A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide28A mainArea={this.mainArea}></Slide28A>;
        this.next = <Slide210A prev={<Slide29A></Slide29A>} mainArea={this.mainArea}></Slide210A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 2 Slajd 1</h1>
            Szablon quizu

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={9} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide29A;