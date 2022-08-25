import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide31A from "./Slide31A";
import Description32 from "./Description32";

class Description31 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide31A prev={<Description31></Description31>} next={<Description32></Description32>} mainArea={this.mainArea}></Slide31A>
        this.title = 'Sukcesja trywialna - animacja'

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
                Trywialna polega na stworzeniu nowej populacji biorąc pod uwagę tylko populację potomną.<br></br><br></br>
            </h3>

            <h3>
                Animacja daje możliwość wyboru liczebności populacji, długości ciągu kodowego oraz wybrania alfabetu k-elementowego.<br></br><br></br><br></br>
            </h3>
            <h3>
                Chcąc wygenerować populację wystaczy nacisnąć przycisk: Wygeneruj populacje, a wygenerować populację końcową: Wygeneruj populację końcową.
            </h3>
            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={1}
                slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description31