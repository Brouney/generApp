import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide12A from "./Slide12A";
import Slide13T from "./Slide13T";
import Description12 from "./Description12";
var Latex = require('react-latex');

class Description13 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide12A prev={<Description12></Description12>} next={<Description13></Description13>} mainArea={this.mainArea}></Slide12A>;
        this.next = <Slide13T prev={<Description13></Description13>} next={<Description13></Description13>} mainArea={this.mainArea}></Slide13T>
        this.title = 'Metody losowe poszukiwania rozwiązań'

        this.navigationButtons = React.createRef();
    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h5>
                Metody losowe są bliższe algorytmom genetycznym z uwagi na błądzenie przypadkowe w przestrzeni rozwiązań.<br></br>
                Po każdej iteracji zapamiętywana jest wartość funkcji dostosowania, co jest znanym pojęciem z dziedziny algorytmów genetycznych.<br></br><br></br>
                <h4><p>Na kolejnym slajdzie zaprezentowano jedną z metod losowych - <b>symulowane wyżarzanie</b>:<br></br><br></br>
                <ul>
                    <li>nowo wygenerowany punkt jest zaakceptowany, jeśli poprawia wartość funkcji celu <Latex>{"${f}$"}</Latex></li>
                    <li>w przeciwnym wypadku może zostać zaakceptowany z prawdopodobieństwem <Latex>{"${ p_a = e^{-\\frac{\\Delta f}{T}} }$"}</Latex></li>
                    <li>ważny jest sposób podwyższania temperatury <Latex>{"${T}$"}</Latex></li>
                </ul>
                </p>
                
                Animacja jest zrealizowana w odwrotny sposób, tj. poszukiwana jest najwyższa wartość funkcji w przedziale od <Latex>{"${-273}$"}</Latex> do <Latex>{"${0}$"}</Latex>.<br></br><br></br>
                Czerwony punkt  <svg height="60" width="50">
  <circle cx="25" cy="40" r="20" stroke="black" stroke-width="2" fill="red" />
</svg> błądzi po wykresie funkcji, dopóki nie zostanie znalezione ekstremum globalne.<br></br><br></br>
                Taki zakres wartości można przyrównać do temperatury, która obejmuje wszystkie możliwe, ujemne wartości w skali Celsjusza, począwszy od zera bezwzględnego.<br></br><br></br>
                </h4>

                Wady metod losowych:<br></br><br></br>
                <ul>
                    <li>słaba efektywność</li>
                    <li>nie ma gwarancji uzyskania rozwiązania, ale jest pewne prawdopodobieństwo, rosnące z liczbą kroków</li>
                </ul>
            </h5>



            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={5}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description13