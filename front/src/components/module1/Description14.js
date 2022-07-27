import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide11T from "./Slide11T";
import Slide12A from "./Slide12A";
import Description11 from "./Description11";
import Slide13T from "./Slide13T";
import Slide14A from "./Slide14A";
import Description13 from "./Description13";

class Description14 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide13T prev={<Description13></Description13>} next={<Description14></Description14>} mainArea={this.mainArea}></Slide13T>;
        this.next = <Slide14A prev={<Description14></Description14>} next={<Description14></Description14>} mainArea={this.mainArea}></Slide14A>
        this.title = 'desc4'

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
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description14