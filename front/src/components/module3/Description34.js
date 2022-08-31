import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide34A from "./Slide34A";
import Description33 from "./Description33";
import Slide33A from "./Slide33A";
import { InputNumber } from 'antd';

var Latex = require('react-latex');

class Description34 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide33A prev={<Description33></Description33>}  mainArea={this.mainArea}></Slide33A>
        this.next = <Slide34A prev={<Description34></Description34>}  mainArea={this.mainArea}></Slide34A>
        this.title = 'Wybrane operatory reprodukcji - opis interakcji'

        this.navigationButtons = React.createRef();
        this.algoStepIntervalInput = React.createRef();

        this.state = {
            algoStepInterval: 200
        }
    }

        
    onChangeAlgoStepInterval = value => {
        this.setState({
          algoStepInterval: value,
        })
    }

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h4>
                Selekcja = reprodukcja + sukcesja<br></br><br></br>
                Reprodukcja - wybór rodziców i utworzenie z nich potomstwa<br></br>
                Sukcesja - zastąpienie osobników ze starej populacji osobnikami z nowej <br></br><br></br>

                Właściwie te pojęcia są często używane zamiennie, dlatego na kolejnym slajdzie mowa jest o operatorach reprodukcji.<br></br>
            </h4>
            <h5>
            <span style={{color: "#bdfefb"}}>Slajd podzielony jest na 4 sekcje, z odpowiednią zawartością: </span><br></br><br></br>
                <ol>
                    <li><div style={{borderStyle: "double", display: "inline-block", padding:8}}>Osobniki</div> <span style={{color: "#bdfefb"}}>Dynamicznie uzupełniana tabela z osobnikami i przycisk <button type="submit" className="btn btn-primary">Wygeneruj populację / resetuj postęp</button> resetujący ustawienia </span></li><br></br>
                    <li><div style={{borderStyle: "double", display: "inline-block", padding:8}}>Algorytm</div> <span style={{color: "#bdfefb"}}>Podświetlane kroki algorytmu dla obecnie wybranego operatora z listy rodzaju reprodukcji</span></li><br></br>
                    <li><div style={{borderStyle: "double", display: "inline-block", padding:8}}>Wybór reprodukcji</div> <span style={{color: "#bdfefb"}}>Wybór innego operatora powodujący zresetowanie ustawień i wyświetlenie kroków aktualnie wybranego operatora </span></li><br></br>
                    <li><span style={{color: "#bdfefb"}}>Informację o początkowym i aktualnym średnim przystosowaniu populacji </span></li><br></br>
                </ol>

                Dla 10 osobników, z których każdy ma 6-bitowy genotyp, obliczane jest dostosowanie funkcji <span style={{color: "yellow"}}><Latex>{"${f(x) = x^2}$"}</Latex></span><br></br>
                Użytkownik śledzi kolejne kroki algorytmu operatora, startując i wstrzymując animację za pomocą przycisku PLAY.<br></br>
                Można spowolnić bądź przyspieszyć działanie algorytmu, modyfikując odstęp czasowy w okienku 
                 <InputNumber
                        min={200}
                        max={5000}
                        defaultValue={200}
                        style={{ margin: '6px' }}
                        value={typeof algoStepInterval === 'number' ? this.state.algoStepInterval : this.state.algoStepInterval}
                        onChange={this.onChangeAlgoStepInterval}
                        step={this.step ? this.step : 1}
                        ref={this.algoStepIntervalInput}
                    />
                    między kolejnymi obliczeniami (wartość w milisekundach).
            </h5>



            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={7}
                slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description34