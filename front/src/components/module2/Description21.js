import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Description22 from "./Description22";
import Slide21A from "./Slide21A";
import Slide20A from "./Slide20A";
import Description20 from "./Description20";

class Description21 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide20A prev={<Description20></Description20>} next={<Description21></Description21>} mainArea={this.mainArea}></Slide20A>;
        this.next = <Slide21A prev={<Description21></Description21>} next={<Description22></Description22>} mainArea={this.mainArea}></Slide21A>
        this.title = 'Desc1'

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
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description21