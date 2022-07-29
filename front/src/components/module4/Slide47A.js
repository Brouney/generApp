import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide46A from "./Slide46A";

class Slide47A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide46A mainArea={this.mainArea}></Slide46A>;
        this.next = null
        this.title = 'Operacje rekonfiguracji Cycle Crossover'

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={7} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide47A;