import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide22A from "./Slide22A";
import Slide23A from "./Slide23A";
import Description22 from "./Description22";

class Description23 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide22A prev={<Description22></Description22>} next={<Description23></Description23>} mainArea={this.mainArea}></Slide22A>;
        this.next = <Slide23A prev={<Description23></Description23>} next={<Description23></Description23>} mainArea={this.mainArea}></Slide23A>
        this.title = 'Standardowe kodowanie dowolnej liczby na N bitach - instrukcja'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>


            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={7}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description23