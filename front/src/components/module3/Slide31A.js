import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide32A from "./Slide32A";

class Slide31A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide32A prev={<Slide31A></Slide31A>} mainArea={this.mainArea}></Slide32A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 3 Slajd 1</h1>
            Szablon quizu
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide31A;