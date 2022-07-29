import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide25A from "./Slide25A";
import Slide26A from "./Slide26A";
import Description25 from "./Description25";

class Description26 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide25A prev={<Description25></Description25>} next={<Description26></Description26>} mainArea={this.mainArea}></Slide25A>;
        this.next = <Slide26A prev={<Description26></Description26>}  mainArea={this.mainArea}></Slide26A>
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
                currentSlideCounter={13}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description26