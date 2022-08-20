import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description34 from "./Description34";
import '../../css/Slide21A.css';
var Latex = require('react-latex');

class ReproductionType {
    constructor(algoText) {
        this.algoText = algoText
    }
}

const Slide34A_DETERMINISTIC_ALGO_TEXT = 
<ol>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li>Tworzymy <span style={{color: "yellow"}}><Latex>{"${int(n(A))}$"}</Latex></span></li><br></br>
    <li>Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span></li><br></br>
    <li>Sortujemy osobniki wg malejącej <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span></li><br></br>
    <li>Uzupełniamy braki w populacji od góry listy z punktu 5</li><br></br>
</ol>

const Slide34A_RANDOM_WITH_REPETITIONS_ALGO_TEXT = 
<ol>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li>Tworzymy <span style={{color: "yellow"}}><Latex>{"${int(n(A))}$"}</Latex></span></li><br></br>
    <li>Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span></li><br></br>
    <li>Wartości <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span> używamy do wykalibrowania koła ruletki</li><br></br>
    <li>Brakujące osobniki losujemy metodą ruletki</li><br></br>
</ol>

const Slide34A_RANDOM_WITHOUT_REPETITIONS_ALGO_TEXT = 
<ol>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li>Tworzymy <span style={{color: "yellow"}}><Latex>{"${int(n(A))}$"}</Latex></span></li><br></br>
    <li>Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span></li><br></br>
    <li>Wartości <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span> są prawdopodobieństwami sukcesu w próbach Bernoulliego</li><br></br>
    <li>Losujemy poszczególne osobniki aż do zapełnienia populacji</li><br></br>
</ol>

const Slide34A_RANK_ALGO_TEXT = 'Rankingowa TODO'
const Slide34A_TOURNAMENT_ALGO_TEXT = 'Turniejowa TODO'
const Slide34A_DUEL_ALGO_TEXT = 'Pojedynkowa TODO'
const Slide34A_THRESHOLD_ALGO_TEXT = 'Progowa TODO'

var Slide34A_DETERMINISTIC = new ReproductionType(Slide34A_DETERMINISTIC_ALGO_TEXT)
var Slide34A_RANDOM_WITH_REPETITIONS = new ReproductionType(Slide34A_RANDOM_WITH_REPETITIONS_ALGO_TEXT)
var Slide34A_RANDOM_WITHOUT_REPETITIONS = new ReproductionType(Slide34A_RANDOM_WITHOUT_REPETITIONS_ALGO_TEXT)
var Slide34A_RANK = new ReproductionType(Slide34A_RANK_ALGO_TEXT)
var Slide34A_TOURNAMENT = new ReproductionType(Slide34A_TOURNAMENT_ALGO_TEXT)
var Slide34A_DUEL = new ReproductionType(Slide34A_DUEL_ALGO_TEXT)
var Slide34A_THRESHOLD = new ReproductionType(Slide34A_THRESHOLD_ALGO_TEXT)

class Slide34A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description34 mainArea={this.mainArea}></Description34>;
        this.next = null

        this.state = {
            chosenReproductionType: Slide34A_DETERMINISTIC,
            individuals: [
                { LP: 1, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 2, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 3, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 4, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 5, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 6, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 7, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 8, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 9, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 10, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
            ],
        }
    }

    renderTableHeader(array) {
        let header = Object.keys(array[0])
        return header.map((key, index) => {
           return key == 'Procent' ? 
           <th>%</th> : 
           <th>{key.toUpperCase()}</th>
        })
     }

    renderIndividualTableData(array) {
        return array.map((individual, index) => {
           const { LP, Osobnik, Przystosowanie, Procent } = individual //destructuring
           return (
                <tr>
                    <td>{LP}</td>
                    <td><tt>{Osobnik}</tt></td>
                    <td><tt>{Przystosowanie}</tt></td>
                    <td><tt>{(Procent * 100).toFixed(3)}</tt></td>
                </tr>
           )
        })
     }


    onReproductionTypeChange = (event) => {
        switch (event.target.value) {
            // sciany
            case '1':
                this.setState({chosenReproductionType: Slide34A_DETERMINISTIC})
                break
            case '2':
                this.setState({chosenReproductionType: Slide34A_RANDOM_WITH_REPETITIONS})
                break
            case '3':
                this.setState({chosenReproductionType: Slide34A_RANDOM_WITHOUT_REPETITIONS})
                break
            case '4':
                this.setState({chosenReproductionType: Slide34A_RANK})
                break
            case '5':
                this.setState({chosenReproductionType: Slide34A_TOURNAMENT})
                break
            case '6':
                this.setState({chosenReproductionType: Slide34A_DUEL})
                break
            case '7':
                this.setState({chosenReproductionType: Slide34A_THRESHOLD})
                break
        }
    }
    
    render(){
        
        return(
        <div>
            <h1>Operatory reprodukcji</h1>

            <div className="row">

                <div className="col-3 tableFixHead">
                    <table id='individuals'>
                        <thead>
                            <tr>{this.renderTableHeader(this.state.individuals)}</tr>
                        </thead>
                        <tbody>
                            {this.renderIndividualTableData(this.state.individuals)}
                        </tbody>
                    </table> 
                </div>

                <div className="col-5">
                    <h5>
                        {this.state.chosenReproductionType.algoText}
                    </h5>
                </div>

                <div className="col-4" onChange={this.onReproductionTypeChange}>
                    <h4><div style={{marginLeft: 20, borderStyle: "double", display: "inline-block"}}>Wybór operatora</div><br></br>
                    <span style={{color: "lime"}}>
                        <input type="radio" value="1" name="reproductionType" /> deterministyczna <br></br>
                        <input type="radio" value="2" name="reproductionType" /> losowa według reszt z powtórzeniami <br></br>
                        <input type="radio" value="3" name="reproductionType" /> losowa według reszt bez powtórzeń <br></br>
                        <input type="radio" value="4" name="reproductionType" /> rankingowa <br></br>
                        <input type="radio" value="5" name="reproductionType" /> turniejowa <br></br>
                        <input type="radio" value="6" name="reproductionType" /> pojedynkowa <br></br>
                        <input type="radio" value="7" name="reproductionType" /> progowa <br></br>
                    </span></h4>
                </div>
            </div>

            <div className="row">
                <h1>symulacjo animacja</h1>
            </div>
           
           
# W metodzie deterministycznej wynik reprodukcji na danej populacji zawsze jest taki sam -
# nie ma tutaj czynnika losowego (inaczej niż np, w ruletce). Stąd nie ma sensu uruchamiać reprodukcji 100 razy.



            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={8} slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide34A;