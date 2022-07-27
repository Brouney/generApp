import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT, MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide32A from "./Slide32A";
import Description33 from "./Description33";
import Slide31A from "./Slide31A";
import Description31 from "./Description31";

class Description32 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide31A prev={<Description31></Description31>}  mainArea={this.mainArea}></Slide31A>
        this.next = <Slide32A prev={<Description32></Description32>} next={<Description33></Description33>} mainArea={this.mainArea}></Slide32A>
        this.title = 'Desc2'

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
                slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description32