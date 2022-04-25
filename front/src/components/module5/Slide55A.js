import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_5_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide56A from "./Slide56A";
import Slide54A from "./Slide54A";

class Slide55A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide54A mainArea={this.mainArea}></Slide54A>;
        this.next = <Slide56A prev={<Slide55A></Slide55A>} mainArea={this.mainArea}></Slide56A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 5 Slajd 1</h1>
            Szablon quizu
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={5} slidesInModuleCounter={MODULE_5_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide55A;