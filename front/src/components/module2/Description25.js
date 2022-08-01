import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide24A from "./Slide24A";
import Slide25A from "./Slide25A";
import Description26 from "./Description26";
import Description24 from "./Description24";

class Description25 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide24A prev={<Description24></Description24>} next={<Description25></Description25>} mainArea={this.mainArea}></Slide24A>;
        this.next = <Slide25A prev={<Description25></Description25>} next={<Description26></Description26>} mainArea={this.mainArea}></Slide25A>
        this.title = 'Piotr 2.11'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h2>{this.title}</h2>


            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={11}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description25