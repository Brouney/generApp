import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide43A from "./Slide43A";
import Slide41A from "./Slide41A";

class Slide42A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide41A mainArea={this.mainArea}></Slide41A>;
        this.next = <Slide43A prev={<Slide42A></Slide42A>} mainArea={this.mainArea}></Slide43A>
        this.title = 'Krzyżowanie proste (dwupunktowe) - Piotr'

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide42A;