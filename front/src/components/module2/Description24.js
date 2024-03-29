import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Description23 from "./Description23";
import Slide23A from "./Slide23A";
import Slide24A from "./Slide24A";
var Latex = require('react-latex');

class Description24 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide23A prev={<Description23></Description23>} next={<Description24></Description24>} mainArea={this.mainArea}></Slide23A>;
        this.next = <Slide24A prev={<Description24></Description24>} next={<Description24></Description24>} mainArea={this.mainArea}></Slide24A>
        this.title = 'Metoda kar - interaktywna mapa funkcji i szukanie optimum'

        this.navigationButtons = React.createRef();
    }

    
    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>

            <h6>
            Niektóre zagadnienia narzucają na rozwiązania więzy; mogą one być w postaci:
            <ul>
                <li>równości (włączamy do kodowania)</li>
                <li>nierówności (sprawdzamy czy dane rozwiązanie narusza więzy - jeśli tak, odrzucamy je)</li>
            </ul>
            <span style={{color: "red"}}>Problem: można w ogóle nie znaleźć rozwiązania!</span><br></br><br></br>
            Stosując <span style={{color: "cyan"}}><b>metodę kar</b></span> nie odrzucamy rozwiązań niedopuszczalnych, ale obniżamy im dostosowanie w stopniu zależnym od naruszenia więzów. Czyli karę włączamy do funkcji dostosowania.<br></br><br></br>
            </h6>

            <h6>
                Przykładowo zakładając funkcję dostosowania <span style={{color: "yellow"}}><Latex>{"${g(x)}$"}</Latex></span> przy warunku <span style={{color: "yellow"}}><Latex>{"${h_i(x) \\geq 0, i = 1, 2, \\dots, n}$"}</Latex></span><br></br><br></br>
                minimalizujemy <span style={{color: "yellow"}}><Latex>{"${g(x) + r\\sum_{i=1}^{n}\\Phi(h_i(x))}$"}</Latex></span> gdzie:<br></br><br></br>
                <ul>
                    <li><span style={{color: "yellow"}}><Latex>{"${\\Phi(h_i(x))}$"}</Latex></span> - funkcja kary, np. <span style={{color: "yellow"}}><Latex>{"${\\Phi[h_i(x)] = h_i^2(x)}$"}</Latex></span></li>
                    <li><span style={{color: "yellow"}}><Latex>{"${r}$"}</Latex></span> - współczynnik kary</li>
                </ul>
            </h6>

            <h5>
                Na kolejnym slajdzie obrazowo przedstawiono problem więzów.<br></br><br></br>
                Za pomocą suwaków można zmienić rozmiar populacji, liczbę pokoleń symulacji, a także dopasować obszar kary, który jest zaznaczony na wykresie jako przezroczysty prostokąt.<br></br><br></br>
                Jeżeli <input type="checkbox" name="penaltyOff"/><label for="penaltyOff"><span style={{color: "red"}}> Metoda kar WYŁĄCZONA</span></label>, osobniki znajdujące się poza obszarem giną i rozwiązanie może nie zostać znalezione.<br></br><br></br>
                Jeżeli <input type="checkbox" name="penaltyOn" checked readOnly/> <label for="penaltyOn"><span style={{color: "lime"}}> Metoda kar WŁĄCZONA</span></label>, wartość funkcji dostosowania jest korygowana o określony <Latex>{"współczynnik kary ${r}$"}</Latex>.<br></br><br></br>
                Symulacja kończy się, gdy liczba pokoleń osiągnie zadaną przez użytkownika wartość lub gdy wszystkie osobniki wyginą.
            </h5>


            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={9}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description24