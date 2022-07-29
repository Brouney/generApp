import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide44A from "./Slide44A";
import Slide42A from "./Slide42A";

class Slide43A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide42A mainArea={this.mainArea}></Slide42A>;
        this.next = <Slide44A prev={<Slide43A></Slide43A>} mainArea={this.mainArea}></Slide44A>
        this.title = 'Krzyżowanie uśredniające (wariant podstawowy) - Marek'

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide43A;