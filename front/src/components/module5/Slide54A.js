import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_5_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide55A from "./Slide55A";
import Slide53A from "./Slide53A";

class Slide54A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide53A mainArea={this.mainArea}></Slide53A>;
        this.next = <Slide55A prev={<Slide54A></Slide54A>} mainArea={this.mainArea}></Slide55A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 5 Slajd 1</h1>
            Szablon quizu
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={4} slidesInModuleCounter={MODULE_5_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide54A;