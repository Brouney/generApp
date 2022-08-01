import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide14A from "./Slide14A";
import Slide15A from "./Slide15A";
import Description16 from "./Description16";
import Description14 from "./Description14";

class Description15 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide14A prev={<Description14></Description14>} next={<Description15></Description15>} mainArea={this.mainArea}></Slide14A>;
        this.next = <Slide15A prev={<Description15></Description15>} next={<Description16></Description16>} mainArea={this.mainArea}></Slide15A>
        this.title = 'Marek 1.9'

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
                currentSlideCounter={9}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description15