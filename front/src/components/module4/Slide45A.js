import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide46A from "./Slide46A";
import Slide44A from "./Slide44A";

class Slide45A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide44A mainArea={this.mainArea}></Slide44A>;
        this.next = <Slide46A prev={<Slide45A></Slide45A>} mainArea={this.mainArea}></Slide46A>
        this.title = 'Operacje rekonfiguracji Partially Matched Crossover'

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={5} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide45A;