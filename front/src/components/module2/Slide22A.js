import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide21Q from "./Slide21Q";
import Slide23A from "./Slide23A";

class Slide22A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide21Q mainArea={this.mainArea}></Slide21Q>;
        this.next = <Slide23A prev={<Slide22A></Slide22A>} mainArea={this.mainArea}></Slide23A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 2 Slajd 2</h1>
            Szablon quizu
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide22A;