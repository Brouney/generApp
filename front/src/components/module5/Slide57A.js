import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_5_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide58A from "./Slide58A";
import Slide56A from "./Slide56A";

class Slide57A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide56A mainArea={this.mainArea}></Slide56A>;
        this.next = <Slide58A prev={<Slide57A></Slide57A>} mainArea={this.mainArea}></Slide58A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 5 Slajd 1</h1>
            Szablon quizu
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={7} slidesInModuleCounter={MODULE_5_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide57A;