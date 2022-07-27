import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide11T from "./Slide11T";
import Slide12A from "./Slide12A";
import Description11 from "./Description11";
import Slide15A from "./Slide15A";
import Slide16A from "./Slide16A";
import Description15 from "./Description15";
import Description17 from "./Description17";

class Description16 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide15A prev={<Description15></Description15>} next={<Description16></Description16>} mainArea={this.mainArea}></Slide15A>;
        this.next = <Slide16A prev={<Description16></Description16>} next={<Description17></Description17>} mainArea={this.mainArea}></Slide16A>
        this.title = 'desc6'

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
                currentSlideCounter={11}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description16