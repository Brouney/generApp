import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Description22 from "./Description22";
import Slide21A from "./Slide21A";
import Slide20A from "./Slide20A";
import Description20 from "./Description20";

class Description21 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide20A prev={<Description20></Description20>} next={<Description21></Description21>} mainArea={this.mainArea}></Slide20A>;
        this.next = <Slide21A prev={<Description21></Description21>} next={<Description22></Description22>} mainArea={this.mainArea}></Slide21A>
        this.title = 'Wpływ operatorów genetycznych na schematy - instrukcja'

        this.navigationButtons = React.createRef();
    }

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h4>
                Na kolejnym slajdzie przedstawiono interakcję, która pomaga lepiej zrozumieć twierdzenie o schematach.<br></br><br></br>
                <br></br>
                Schemat działania interakcji:<br></br><br></br>
                <ol>
                    <li>ustawienie liczebności populacji oraz długości ciągu kodowego za pomocą suwaków</li><br></br>
                    <li>kliknięcie przycisku <button type="submit" className="btn btn-primary">Wygeneruj populację</button> (tabele POPULACJA oraz SCHEMATY aktualizują się odpowiednio).</li>
                    <li>dowolne stosowanie operatorów genetycznych poprzez klikanie przycisków <button type="submit" className="btn btn-primary m-2">Reprodukcja</button>, <button type="submit" className="btn btn-primary m-2">Krzyżowanie</button>, <button type="submit" className="btn btn-primary m-2">Mutacja</button></li>
                    <ul>
                        <li><button type="submit" className="btn btn-primary m-2">Reprodukcja</button> aktualizuje wykres oraz inkrementuje licznik pokoleń.</li>
                        <li><button type="submit" className="btn btn-primary m-2">Krzyżowanie</button> jest jednopunktowe - za pomocą zielonych okienek należy wybrać numery osobników, których użytkownik chce skrzyżować ze sobą. Punkt cięcia to pozycja w ciągu kodowym.</li>
                        <li><button type="submit" className="btn btn-primary m-2">Mutacja</button> neguje wybrany gen na określonym osobniku.</li>
                    </ul>
                </ol>
            </h4>
            <h5>
            <br></br><br></br>Użytkownik może śledzić liczbę reprezentantów danego schematu na wykresie oraz w tabeli SCHEMATY.<br></br><br></br>
                W przypadku zmiany liczebności populacji lub długości ciągu kodowego, przyciski operatorów zostają <b>wyłączone</b><br></br><br></br>
                Konieczne jest wtedy ponowne wygenerowanie populacji bazowej.<br></br><br></br>
                Tabele oraz wykres są wtedy resetowane do stanu początkowego.<br></br><br></br>
            </h5>

            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={3}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description21