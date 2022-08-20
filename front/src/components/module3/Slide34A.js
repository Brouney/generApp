import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description34 from "./Description34";
import '../../css/Slide21A.css';
var Latex = require('react-latex');

function randomBinary(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min)).toString(2);
}

function bin2dec(binStr) {
    const lastIndex = binStr.length - 1;

    return Array.from(binStr).reduceRight((total, currValue, index) => (
        (currValue === '1') ? total + (2 ** (lastIndex - index)) : total
    ), 0);
}


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
    <li>Uzupełniamy braki w populacji od góry listy z punktu 5</li>
</ol>

const Slide34A_RANDOM_WITH_REPETITIONS_ALGO_TEXT = 
<ol>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li>Tworzymy <span style={{color: "yellow"}}><Latex>{"${int(n(A))}$"}</Latex></span></li><br></br>
    <li>Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span></li><br></br>
    <li>Wartości <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span> używamy do wykalibrowania koła ruletki</li><br></br>
    <li>Brakujące osobniki losujemy metodą ruletki</li>
</ol>

const Slide34A_RANDOM_WITHOUT_REPETITIONS_ALGO_TEXT = 
<ol>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li>Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li>Tworzymy <span style={{color: "yellow"}}><Latex>{"${int(n(A))}$"}</Latex></span></li><br></br>
    <li>Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span></li><br></br>
    <li>Wartości <span style={{color: "yellow"}}><Latex>{"${frac(n(A))}$"}</Latex></span> są prawdopodobieństwami sukcesu w próbach Bernoulliego</li><br></br>
    <li>Losujemy poszczególne osobniki aż do zapełnienia populacji</li>
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

const Slide34A_POPULATION_SIZE = 10
const Slide34A_INDIVIDUAL_GENOTYPE_LENGTH = 6
const Slide34A_INDIVIDUAL_MAX_FITNESS = 2**Slide34A_INDIVIDUAL_GENOTYPE_LENGTH - 1

const Slide34A_FITNESS_FUNCTION = (x) => x*x


class Slide34A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description34 mainArea={this.mainArea}></Description34>;
        this.next = null

        this.generateButton = React.createRef()

        let tmpIndividuals = []
        for (let i = 0; i < Slide34A_POPULATION_SIZE; ++i) {
            var genotype = randomBinary(0, Slide34A_INDIVIDUAL_MAX_FITNESS)
            var fenotype = bin2dec(genotype)
            var fitness = Slide34A_FITNESS_FUNCTION(fenotype)

            tmpIndividuals.push({ LP: i+1, Genotyp: genotype, Fenotyp: fenotype, Dostosowanie: fitness })

            while(tmpIndividuals[i]['Genotyp'].length < Slide34A_INDIVIDUAL_GENOTYPE_LENGTH) {
                tmpIndividuals[i]['Genotyp'] = "0" + tmpIndividuals[i]['Genotyp'] // dodanie leading zeros
            }
        }

        this.state = {
            chosenReproductionType: Slide34A_DETERMINISTIC,
            individuals: tmpIndividuals,
        }
    }

    generatePopulation = () => {
        let tmpIndividuals = []
        for (let i = 0; i < Slide34A_POPULATION_SIZE; ++i) {
            var genotype = randomBinary(0, Slide34A_INDIVIDUAL_MAX_FITNESS)
            var fenotype = bin2dec(genotype)
            var fitness = Slide34A_FITNESS_FUNCTION(fenotype)

            tmpIndividuals.push({ LP: i+1, Genotyp: genotype, Fenotyp: fenotype, Dostosowanie: fitness })
            while(tmpIndividuals[i]['Genotyp'].length < Slide34A_INDIVIDUAL_GENOTYPE_LENGTH) {
                tmpIndividuals[i]['Genotyp'] = "0" + tmpIndividuals[i]['Genotyp'] // dodanie leading zeros
            }
        }

        this.setState({individuals: tmpIndividuals})
        
    }

    renderTableHeader(array) {
        let header = Object.keys(array[0])
        return header.map((key, index) => {
           return key == 'Dostosowanie' ? 
           <th><Latex>{"${f(x) = x^2}$"}</Latex></th> : // look at Slide34A_FITNESS_FUNCTION
           key == 'Fenotyp' ? <th>{key} <Latex>{"${x}$"}</Latex></th> : <th>{key}</th>
        })
     }

    renderIndividualTableData(array) {
        return array.map((individual, index) => {
           const { LP, Genotyp, Fenotyp, Dostosowanie } = individual //destructuring
           return (
                <tr>
                    <td>{LP}</td>
                    <td><tt>{Genotyp}</tt></td>
                    <td><tt>{Fenotyp}</tt></td>
                    <td><tt>{Dostosowanie}</tt></td>
                </tr>
           )
        })
     }


    onReproductionTypeChange = (event) => {
        switch (event.target.value) {
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
                    <h5><div style={{borderStyle: "double", display: "inline-block", padding:8}}>Osobniki</div> <button ref={ref => this.generateButton = ref} type="submit" className="btn btn-primary" onClick={this.generatePopulation}>Wygeneruj populację</button><br></br></h5>
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
                    <h5><div style={{marginLeft: 80, borderStyle: "double", display: "inline-block", padding:8}}>Algorytm</div><br></br>
                        {this.state.chosenReproductionType.algoText}
                    </h5>
                </div>

                <div className="col-4" onChange={this.onReproductionTypeChange}>
                    <h4><div style={{marginLeft: 80, borderStyle: "double", display: "inline-block", padding:8}}>Wybór operatora</div><br></br>
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