import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT, MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide33A from "./Slide33A";
import Description34 from "./Description34";
import Slide32A from "./Slide32A";
import Description32 from "./Description32";

class Description33 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide32A prev={<Description32></Description32>}  mainArea={this.mainArea}></Slide32A>
        this.next = <Slide33A prev={<Description33></Description33>} next={<Description34></Description34>} mainArea={this.mainArea}></Slide33A>
        this.title = 'Desc3'

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
                slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description33