import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide11T from "./Slide11T";
import Slide12A from "./Slide12A";
import Description11 from "./Description11";
import Description13 from "./Description13";

class Description12 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide11T prev={<Description11></Description11>} next={<Description12></Description12>} mainArea={this.mainArea}></Slide11T>;
        this.next = <Slide12A prev={<Description12></Description12>} next={<Description13></Description13>} mainArea={this.mainArea}></Slide12A>
        this.title = 'Piotr 1.3'

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
                currentSlideCounter={3}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description12