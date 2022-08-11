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
        this.title = 'Wstęp przed Slajdem 14'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h2>
                Zbieżność on-line - jest to miara bieżącej efektywności algorytmu, czyli średnia ze wszystkich osobników, które pojawiły się do chwili obecnej.
            </h2>
            <h2>
                <Latex>{"${e_{on} = \\frac{1}{T} \\displaystyle\\sum_{t=1}^{T} \\overline{f}(t) = \\frac{1}{T} \\sum_{t=1}^{T}} \\left(\\frac{1}{N} \\displaystyle\\sum_{t=1}^{N}f_{i}(t)\\right)$"}</Latex>
            </h2>
            <h2>
                Zbieżność off-line - jest to miara poziomu bieżności algorytmu. W każdym pokoleniu wyznaczony jest najlepszy osobnik, który pojawił się dotychczas. Następnie obliczana jest średnia z najlepszych od pierwszego pokolenia do bieżącego
            </h2>
            <h2>
                <Latex>{"${e_{off} = \\frac{1}{T} \\displaystyle\\sum_{t=1}^{T} f^{*}(t) }$"}</Latex>
            </h2>
            <h2>
                <Latex>{"${f^{*}(t) = opt \\{f(1), f(2), ..., f(t)\\}}$"}</Latex>
            </h2>
            <h3>
                W animacji:
            </h3>
            <h3>
                n z liczbą oznacza osobniki z danego pokolenia
            </h3>
            <h3>
            <Latex>{"${f^{*}(t) }$"}</Latex> - najlepszy osobnik
            </h3>
            <h3>
            <Latex>{"${<f>}$"}</Latex> - średnia osobników z pokolenia
            </h3>
            <h3>
                Dodawaj nowe pokolenia, wyznaczaj wartości osobników, zobacz jak wszystko dzieje się na żywo. Powodzenia!
            </h3>

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