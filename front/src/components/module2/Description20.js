import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Description21 from "./Description21";
import Slide20A from "./Slide20A";
var Latex = require('react-latex');

class Description20 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide20A prev={<Description20></Description20>} next={<Description21></Description21>} mainArea={this.mainArea}></Slide20A>
        this.title = 'Wstęp przed slajdem 1.'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h3>
                <Latex>{"Alfabet składający się z k symboli i ciągów l elementowych posiada ${k^l}$ ciągów i ${(k+1)^l}$ schematów"}</Latex>
            </h3>
            <h3>
                Aby wygenerować losową populację oraz schematy naciśnij przycisk wygeneruj populację. 
            </h3>
            <h3>
                Animację można konfigurować: można zmieniać liczebność populacji jak i długość ciągu kodowego oraz alfabet k elementowy.
            </h3>
            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={1}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description20