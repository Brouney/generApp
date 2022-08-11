import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide11T from "./Slide11T";
import Description12 from "./Description12";

class Description11 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide11T prev={<Description11></Description11>} next={<Description12></Description12>} mainArea={this.mainArea}></Slide11T>
        this.title = 'Metody analityczne poszukiwania rozwiązań'

        this.navigationButtons = React.createRef();


    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>

            Tradycyjne metody poszukiwania dzielimy na:
            <ul>
                <li>Metody pośrednie
                    <ul>
                        <li>Przyrównujemy gradient funkcji celu do zera</li>
                        <li>Rozwiązujemy układ równań (zwykle nieliniowych)</li>
                        <li>Znajdujemy ekstremum</li>
                    </ul>
                </li>
                <li>Metody bezpośrednie
                    <ul>
                        <li>Skaczemy po wykresie funkcji w kierunku lokalnego gradientu</li>
                        <li><b>Metoda wspinaczki górskiej</b></li>
                    </ul>
                </li>
            </ul>

            Metody tradycyjne mają swoje wady:
            <ul>
                <li>Zakres lokalny, nie ma gwarancji znalezienia globalnego ekstremum</li>
                <li>Uzależnione od istnienia pochodnych (dla wielu rzeczywistych problemów niemożliwe do spełnienia)</li>
                <li>Uzależnione od ciągłości funkcji</li>
                <li>Po znalezieniu maksimum nie można już go poprawić</li>
            </ul>
            <br></br>
            <h4>
                Na kolejnym slajdzie zobrazowano stosowanie metody bezpośredniej dla funkcji dwóch zmiennych:
                <ul>
                    <li><b>siodła</b> z dwoma ekstremami lokalnymi</li>
                    <li><b>paraboloidy</b> z jednym ekstremum globalnym.</li>
                </ul>
            </h4>
            <h5>
                Po kliknięciu przycisku startu, obszar oznaczony jako "Szukanie" zaczyna wspinać się w kierunku wyższych wartości funkcji.<br></br>
                Animację można w każdym momencie zatrzymać poprzez kliknięcie przycisku pauzy.<br></br>
                Jeśli animacja jest zatrzymana, można zmienić widok funkcji poprzez przeciąganie jej lewym przyciskiem myszy.<br></br>

                Kliknięcie jednego z przycisków
                <button type="submit" className="btn btn-success m-2" >Siodło</button>
                <button type="submit" className="btn btn-success m-2" >Paraboloida</button>
                powoduje losowe umieszczenie obszaru "Szukanie" na wykresie funkcji.<br></br>

                Animacja kończy się w momencie znalezienia ekstremum lokalnego.
            </h5>


            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={1}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description11