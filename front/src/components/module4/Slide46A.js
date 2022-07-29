import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide47A from "./Slide47A";
import Slide45A from "./Slide45A";

class Slide46A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide45A mainArea={this.mainArea}></Slide45A>;
        this.next = <Slide47A prev={<Slide46A></Slide46A>} mainArea={this.mainArea}></Slide47A>
        this.title = 'Operacje rekonfiguracji Order Crossover'

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={6} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide46A;