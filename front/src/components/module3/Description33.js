import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide33A from "./Slide33A";
import Description34 from "./Description34";
import Slide32A from "./Slide32A";
import Description32 from "./Description32";

class Description33 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide32A prev={<Description32></Description32>}  mainArea={this.mainArea}></Slide32A>
        this.next = <Slide33A prev={<Description33></Description33>} next={<Description34></Description34>} mainArea={this.mainArea}></Slide33A>
        this.title = 'Sukcesja elitarna - animacja'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h3>
                Sukcesja jest to tworzenie nowej populacji bazowej (POPULACJA KOŃCOWA) z populacji potomnej (POPULACJA 2) oraz starej populacji bazowej (POPULACJA 1).<br></br><br></br>
            </h3>
            <h3>
                Elitarna polega na stworzeniu nowej populacji biorąc pod uwagę populację potomną i bazową.<br></br><br></br>
            </h3>

            <h3>
                Animacja daje możliwość wyboru liczebności populacji, długości ciągu kodowego, wybrania alfabetu k-elementowego oraz wybrania ilości najleoszych osobników ze starej populacji.<br></br><br></br><br></br>
            </h3>
            <h3>
                Chcąc wygenerować populację wystaczy nacisnąć przycisk: Wygeneruj populacje, wygenerować populację końcową na podstawie sukcesji elitarnej: 
                Wygeneruj populację końcową - sukcesja elitarna. Różnica między slajdem 5 jest taka, że tam wybiera się współczynnik, natomiast tutaj wybierana jest ilość.
            </h3>

            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={5}
                slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description33