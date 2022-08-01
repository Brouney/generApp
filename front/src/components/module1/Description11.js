import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide11T from "./Slide11T";
import Description12 from "./Description12";

class Description11 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide11T prev={<Description11></Description11>} next={<Description12></Description12>} mainArea={this.mainArea}></Slide11T>
        this.title = 'Marek 1.1'

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
                currentSlideCounter={1}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description11