import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide21A from "./Slide21A";
import Slide22A from "./Slide22A";
import Description23 from "./Description23";
import Description21 from "./Description21";
var Latex = require('react-latex');

class Description22 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide21A prev={<Description21></Description21>} next={<Description22></Description22>} mainArea={this.mainArea}></Slide21A>;
        this.next = <Slide22A prev={<Description22></Description22>} next={<Description23></Description23>} mainArea={this.mainArea}></Slide22A>
        this.title = 'Schematy jako wycinki przestrzeni rozwiązań - wykres 3D'

        this.navigationButtons = React.createRef();
    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h4>
                Na kolejnym slajdzie przedstawiono graficznie schematy w przestrzeni rozwiązań 3D.<br></br><br></br>
                Przestrzeń rozwiązań (dziedzinę algorytmu) zobrazowano jako <span style={{color: "rgb(180,210,150)"}}>zielony</span> sześcian, dla którego współrzędne wierzchołków <Latex>{"${x, y, z \\geq 0}$"}</Latex>.<br></br><br></br>
                Po prawej stronie wykresu umieszczono wszystkie możliwe schematy dla ciągu kodowego o długości <Latex>{"${l=3}$"}</Latex>.<br></br><br></br>
                Naraz może być wybrany <b>wyłącznie</b> jeden schemat - po kliknięciu w punkt odpowiadający schematowi, następuje przerysowanie wykresu.<br></br><br></br>
                <span style={{color: "red"}}>Czerwonym</span> kolorem zaznaczana jest <b>prosta</b> lub <b>płaszczyzna</b>, w zależności od liczby symboli specjalnych <Latex>{"${*}$"}</Latex>, które wchodzą w skład danego schematu.<br></br><br></br>
                Widok wykresu można dowolnie zmieniać przez przeciągnięcie myszką na jego obszarze.<br></br><br></br>
                Schemat <Latex>{"${H = s_1s_2s_3}$, gdzie ${s_i \\in V_+ = \\{0, 1, *\\}}$"}</Latex><br></br><br></br>
                Dla <Latex>{"${count(*) == 1}$"}</Latex> otrzymujemy linię prostą.<br></br><br></br>
                Dla <Latex>{"${count(*) == 2}$"}</Latex> otrzymujemy płaszczyznę.<br></br><br></br>
                
            </h4>
            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={5}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description22