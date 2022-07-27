import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Description22 from "./Description22";
import Slide21A from "./Slide21A";
import Description21 from "./Description21";
import Slide20A from "./Slide20A";

class Description20 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide20A prev={<Description20></Description20>} next={<Description21></Description21>} mainArea={this.mainArea}></Slide20A>
        this.title = 'Desc0'

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
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description20