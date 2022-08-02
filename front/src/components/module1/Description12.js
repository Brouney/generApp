import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide11T from "./Slide11T";
import Slide12A from "./Slide12A";
import Description11 from "./Description11";
import Description13 from "./Description13";
var Latex = require('react-latex');

class Description12 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide11T prev={<Description11></Description11>} next={<Description12></Description12>} mainArea={this.mainArea}></Slide11T>;
        this.next = <Slide12A prev={<Description12></Description12>} next={<Description13></Description13>} mainArea={this.mainArea}></Slide12A>
        this.title = 'Wstęp do zawartości slajdu 4'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h3>Następna animacja dotyczy problemu plecakowego</h3>
            <h3>W skrócie: jest to maksymalizacyjny problem wyboru przedmiotów, tak, aby ich wartość sumaryczna była jak największa</h3>
            <h3>Zadaniem użytkownika jest dobranie takiej ilości elementów do plecaka, aby waga była jak największa</h3>
            <h3>Obok nazwy  elementu pojawia się jego waga.</h3>
            <h3>Powodzenia!</h3>
            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={3}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description12