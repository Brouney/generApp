import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide22A from "./Slide22A";
import Slide23A from "./Slide23A";
import Description22 from "./Description22";
var Latex = require('react-latex');

class Description23 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide22A prev={<Description22></Description22>} next={<Description23></Description23>} mainArea={this.mainArea}></Slide22A>;
        this.next = <Slide23A prev={<Description23></Description23>} next={<Description23></Description23>} mainArea={this.mainArea}></Slide23A>
        this.title = 'Standardowe kodowanie dowolnej liczby na N bitach - instrukcja'

        this.navigationButtons = React.createRef();
    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h4>
                Interakcja na kolejnym slajdzie może okazać się przydatna w sytuacji, gdy istnieje potrzeba zakodować cechy osobnika.<br></br><br></br>
                Cechy można dodawać za pomocą przycisku <button type="submit" className="btn btn-success col-2 m-1">Dodaj parametr</button> oraz usuwać je, klikając przycisk <button type="submit" className="btn btn-warning col-2 m-1">Usuń parametr</button>.<br></br><br></br>
                Każda cecha składa się z pięciu pól.<br></br><br></br>
                <ol>
                    <li><span style={{color: "yellow"}}><Latex>{"${U_{min}}$"}</Latex></span> - dolny zakres wartości parametru</li>
                    <li><span style={{color: "yellow"}}><Latex>{"${U_{max}}$"}</Latex></span> - górny zakres wartości parametru</li>
                    <li><span style={{color: "yellow"}}><Latex>{"${l}$"}</Latex></span> - długość ciągu kodowego</li>
                    <li><span style={{color: "yellow"}}><Latex>{"${u}$"}</Latex></span> - kodowana wartość</li>
                    <li><span style={{color: "yellow"}}><Latex>{"${x_{dec}}$"}</Latex></span> - zakodowana postać rozwiązania (część genotypu)</li>
                </ol>
                
                Każda zmiana wartości dynamicznie aktualizuje genotyp osobnika <span style={{color: "lightgreen"}}><Latex>{"${g_1g_2g_3\\dots g_n, \\hspace{1em} g_i \\in \\{0, 1\\}}$"}</Latex></span>.<br></br> 
            <br></br>
            Wzory:
            </h4>
            <div className="row">
                <div className="col-3">
                    <h4>
                        {/* <Latex>{"${\\left\\{\\begin{matrix}  \\end{matrix}\\right.}$"}</Latex> */}
                        <div style={{margin: "20px"}}><Latex>{"$${x = \\frac{u - U_{min}}{U_{max} - U_{min}}(2^l - 1)}$$"}</Latex><br></br></div>
                        <div style={{margin: "20px"}}><Latex>{"${u = U_{min} + \\frac{U_{max} - U_{min}}{2^l - 1}x}$"}</Latex></div>
                        <div style={{margin: "20px"}}><Latex>{"${U_{min} \\le u \\le U_{max}}$"}</Latex></div>
                        </h4>
                </div>
                <div className="col-1">
                    <h4>
                        <div style={{margin: "20px"}}>gdzie: <br></br></div>
                    </h4>
                </div>
                <div className="col-3">
                    <h4>
                        <div style={{margin: "2px"}}><Latex>{"${x}$"}</Latex> - zakodowana postać liczby,</div>
                        <div style={{margin: "2px"}}><Latex>{"${u}$"}</Latex> - kodowana liczba,</div>
                        <div style={{margin: "2px"}}><Latex>{"${l}$"}</Latex> - liczba bitów ciągu kodowego</div>
                    </h4>
                </div>
            </div>

            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={7}
                slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description23