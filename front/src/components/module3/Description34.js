import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide34A from "./Slide34A";
import Description33 from "./Description33";
import Slide33A from "./Slide33A";

class Description34 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide33A prev={<Description33></Description33>}  mainArea={this.mainArea}></Slide33A>
        this.next = <Slide34A prev={<Description34></Description34>}  mainArea={this.mainArea}></Slide34A>
        this.title = 'Marek 3.7 operatory reprodukcji'

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
                slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description34