import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide21A from "./Slide21A";
import Slide22A from "./Slide22A";
import Description23 from "./Description23";
import Description21 from "./Description21";

class Description22 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide21A prev={<Description21></Description21>} next={<Description22></Description22>} mainArea={this.mainArea}></Slide21A>;
        this.next = <Slide22A prev={<Description22></Description22>} next={<Description23></Description23>} mainArea={this.mainArea}></Slide22A>
        this.title = 'desc2'

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
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description22