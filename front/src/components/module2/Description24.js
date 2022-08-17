import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Description23 from "./Description23";
import Slide23A from "./Slide23A";
import Slide24A from "./Slide24A";

class Description24 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide23A prev={<Description23></Description23>} next={<Description24></Description24>} mainArea={this.mainArea}></Slide23A>;
        this.next = <Slide24A prev={<Description24></Description24>} next={<Description24></Description24>} mainArea={this.mainArea}></Slide24A>
        this.title = 'Marek 2.9'

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
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description24