import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide12A from "./Slide12A";

import Slide13T from "./Slide13T";
import Description12 from "./Description12";

class Description13 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide12A prev={<Description12></Description12>} next={<Description13></Description13>} mainArea={this.mainArea}></Slide12A>;
        this.next = <Slide13T prev={<Description13></Description13>} next={<Description13></Description13>} mainArea={this.mainArea}></Slide13T>
        this.title = 'desc3'

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
                currentSlideCounter={5}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description13