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
        this.title = 'Konwencja zapisu i terminologia'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>

            <h3>
            Na kolejnym slajdzie przedstawiono generowanie populacji i odpowiadających jej schematów. <br></br><br></br>
            Przy zadanych zmiennych <Latex>{"${k}$, ${l}$, ${n}$"}</Latex>:
            <ul>
                <li><Latex>{"długości ciągu kodowego ${l}$"}</Latex></li>
                <li><Latex>{"alfabecie ${k}$-elementowym"}</Latex></li>
                <li><Latex>{"wielkości populacji ${n}$"}</Latex></li>
            </ul>
            </h3>
            <h3>
                <Latex>{"można wygenerować ${n}$ różnych ciągów wybranych z ${k^l}$ kombinacji, a także wytworzyć ${(k+1)^l}$ schematów."}</Latex>
            </h3>
            <h3>
                Aby wygenerować losową populację oraz odpowiadające jej schematy naciśnij przycisk <button type="submit" className="btn btn-primary">Wygeneruj populację</button>. 
            </h3>
            <h3>
                Interakcję można konfigurować poprzez:
                <ul>
                    <li>zmianę liczebności populacji za pomocą suwaka</li>
                    <li>zmianę długości ciągu kodowego za pomocą suwaka</li>
                    <li>wpisanie symboli do pola alfabetu <b>(nie można wpisać symbolu specjalnego <Latex>{"${*}$"}</Latex>)</b></li>
                </ul>
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