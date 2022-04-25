import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide22A from "./Slide22A";
import Slide24A from "./Slide24A";


class Slide23A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide22A mainArea={this.mainArea}></Slide22A>;
        this.next = <Slide24A prev={<Slide23A></Slide23A>} mainArea={this.mainArea}></Slide24A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 2 Slajd 2</h1>
            Szablon quizu
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide23A;