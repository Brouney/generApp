import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide45A from "./Slide45A";
import Slide43A from "./Slide43A";

class Slide44A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide43A mainArea={this.mainArea}></Slide43A>;
        this.next = <Slide45A prev={<Slide44A></Slide44A>} mainArea={this.mainArea}></Slide45A>
        this.title = 'Krzyżowanie uśredniające (wariant alternatywny) - Marek'

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={4} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide44A;