import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide39A from "./Slide39A";
import Slide37A from "./Slide37A";

class Slide38A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide37A mainArea={this.mainArea}></Slide37A>;
        this.next = <Slide39A prev={<Slide38A></Slide38A>} mainArea={this.mainArea}></Slide39A>

        this.quizTemplate = React.createRef()
    }
    
    render(){
        
        return(
        <div>
            <h1>Moduł 8 Slajd 2</h1>
            Szablon quizu
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={8} slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide38A;