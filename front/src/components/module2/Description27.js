import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Description26 from "./Description26";
import Slide26A from "./Slide26A";
import Slide27A from "./Slide27A";

class Description27 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide26A prev={<Description26></Description26>} next={<Description27></Description27>} mainArea={this.mainArea}></Slide26A>;
        this.next = <Slide27A prev={<Description26></Description26>}  mainArea={this.mainArea}></Slide27A>
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
                currentSlideCounter={15}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description27