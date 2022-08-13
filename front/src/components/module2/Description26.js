import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide25A from "./Slide25A";
import Slide26A from "./Slide26A";
import Description25 from "./Description25";
var Latex = require('react-latex');

class Description26 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide25A prev={<Description25></Description25>} next={<Description26></Description26>} mainArea={this.mainArea}></Slide25A>;
        this.next = <Slide26A prev={<Description26></Description26>}  mainArea={this.mainArea}></Slide26A>
        this.title = 'Kryteria oceny algorytmu genetycznego - pojęcia zbieżności'

        this.navigationButtons = React.createRef();
    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h5>
                <i>Zbieżność on-line</i> - miara bieżącej efektywności algorytmu, czyli średnia ze wszystkich osobników, które pojawiły się do chwili obecnej.
            </h5>
            <h5>
                <Latex>{"${e_{on} = \\frac{1}{T} \\displaystyle\\sum_{t=1}^{T} \\overline{f}(t) = \\frac{1}{T} \\sum_{t=1}^{T}} \\left(\\frac{1}{N} \\displaystyle\\sum_{t=1}^{N}f_{i}(t)\\right)$"}</Latex>
            </h5>
            <br></br>
            <h5>
                <i>Zbieżność off-line</i> - miara poziomu bieżności algorytmu. W każdym pokoleniu wyznaczony jest najlepszy osobnik, który pojawił się dotychczas. Następnie obliczana jest średnia z najlepszych od pierwszego pokolenia do bieżącego
            </h5>
            <h5>
                <Latex>{"${e_{off} = \\frac{1}{T} \\displaystyle\\sum_{t=1}^{T} f^{*}(t) }$"}</Latex>
            </h5>
            <h5>
                <Latex>{"${f^{*}(t) = opt \\{f(1), f(2), \\dots, f(t)\\}}$"}</Latex>
            </h5>
            <br></br>
            <h4>
                Na kolejnym slajdzie zastosowano oznaczenia:
            </h4>
            <ul>
                <li><h4>
                    <Latex>{"${n_x (x \\in [1,5])}$"}</Latex> - osobniki z danego pokolenia
                </h4></li>
                <li><h4>
                    <Latex>{"${f^{*}(t)}$"}</Latex> - wartość funkcji dostosowania najlepszego osobnika z danego pokolenia
                    </h4></li>
                <li><h4>
                    <Latex>{"${\\langle f\\rangle}$"}</Latex> - średnia wartość funkcji dostosowania osobników z danego pokolenia
                </h4></li>
            </ul>
            <br></br>
            <h4>
                Schemat działania interakcji:<br></br><br></br>
                <ol>
                    <li>dodawanie/usuwanie nowych pokoleń</li><br></br>
                    <li>zmiana wartości funkcji celu dla osobników <Latex>{"${n_x}$"}</Latex></li><br></br>
                    <li>śledzenie zbieżności <Latex>{"${e_{off}}$"}</Latex>, <Latex>{"${e_{on}}$"}</Latex> na wykresie</li><br></br>
                </ol>
            </h4>

            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={13}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description26