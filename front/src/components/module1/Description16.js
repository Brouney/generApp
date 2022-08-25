import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide15A from "./Slide15A";
import Slide16A from "./Slide16A";
import Description15 from "./Description15";

class Description16 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide15A prev={<Description15></Description15>} next={<Description16></Description16>} mainArea={this.mainArea}></Slide15A>;
        this.next = <Slide16A prev={<Description16></Description16>} next={null} mainArea={this.mainArea}></Slide16A>
        this.title = 'Selekcja ruletkowa - animacja'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>

            <h5>
                Na kolejnym slajdzie przedstawiono animację dotyczącą podstawowych operacji algorytmów.
            </h5>
            <h5>
                Jest to selekcja jednokrotna, losowa. Każdy osobnik z populacji ma przyporządkowany rozkład prawdopodobieństwa - w tym przypadku jest to % przystosowania. 
                W momencie naciśnięcia przycisku PLAY - animacja samoistnie po krótkim czasie wylosuje obiekt oraz wskaże jego właściwości na tabeli.
            </h5>
            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={11}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description16