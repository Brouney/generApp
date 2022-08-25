import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide32A from "./Slide32A";
import Description33 from "./Description33";
import Slide31A from "./Slide31A";
import Description31 from "./Description31";

class Description32 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide31A prev={<Description31></Description31>}  mainArea={this.mainArea}></Slide31A>
        this.next = <Slide32A prev={<Description32></Description32>} next={<Description33></Description33>} mainArea={this.mainArea}></Slide32A>
        this.title = 'Sukcesja z częściowym zastępowaniem - animacja'

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
                Z częściowym zastępowaniem polega na stworzeniu nowej populacji biorąc pod uwagę populację potomną i bazową.<br></br><br></br>
            </h3>

            <h3>
                Animacja daje możliwość wyboru liczebności populacji, długości ciągu kodowego, wybrania alfabetu k-elementowego oraz wybrania współczynnika G, który
                oznacza stosunek elementów z populacji bazowej do potomnej w populacji końcowej.<br></br><br></br><br></br>
            </h3>
            <h3>
                Chcąc wygenerować populację wystaczy nacisnąć przycisk: Wygeneruj populacje, wygenerować populację końcową na podstawie sukcesji elitarnej: 
                Wygeneruj populację końcową - sukcesja elitarna, 
                wygenerować populację końcową losowo:  Wygeneruj populację końcową - losowo.
            </h3>

            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={3}
                slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description32