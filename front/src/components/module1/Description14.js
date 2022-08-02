import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide13T from "./Slide13T";
import Slide14A from "./Slide14A";
import Description13 from "./Description13";

class Description14 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide13T prev={<Description13></Description13>} next={<Description14></Description14>} mainArea={this.mainArea}></Slide13T>;
        this.next = <Slide14A prev={<Description14></Description14>} next={<Description14></Description14>} mainArea={this.mainArea}></Slide14A>
        this.title = 'Wstęp do zawartości slajdu 8'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h3>Dopasuj cechy do odpowiedniej rubryki - Algorytmy genetyczne lub metody tradycyjne.</h3>
            <h3>W momencie, gdy wszystkie cechy zostaną dobrze przypisane, czerwony przycisk zmieni swój kolor na niebieski.</h3>

            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={7}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description14