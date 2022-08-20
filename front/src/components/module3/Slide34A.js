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

const delay = ms => new Promise(res => setTimeout(res, ms));


// ALGO FUNCTIONS
function calculate_p_r_A(f_A, sum_f_i) {
    return (f_A / sum_f_i)
}

function calculate_n_A(p_r_A) {
    return (Slide34A_POPULATION_SIZE * p_r_A)
}

function calculate_int_n_A(n_A) {
    return Math.floor(n_A)
}

function calculate_frac_n_A(n_A) {
    return (n_A - parseInt(n_A))
}
// END ALGO FUNCTIONS



class ReproductionType {
    constructor(algoText, algoStepsCount, step_1, step_2, step_3, step_4, step_5, step_6) {
        this.algoText = algoText
        this.algoStepsCount = algoStepsCount
        this.algoStepsList = [step_1, step_2, step_3, step_4, step_5, step_6]
    }
}

class Individual {
    constructor(LP, Genotyp, Fenotyp, Dostosowanie) {
        this.LP = LP
        this.Genotyp = Genotyp
        this.Fenotyp = Fenotyp
        this.Dostosowanie = Dostosowanie

        this.p_r_A = 0
        this.n_A = 0
        this.int_n_A = 0
        this.frac_n_A = 0
    }
}

const Slide34A_DETERMINISTIC_ALGO_TEXT = 
<ol>
    <li id="0">Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li id="1">Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li id="2">Tworzymy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="3">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li><br></br>
    <li id="4">Sortujemy osobniki wg malejącej <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li><br></br>
    <li id="5">Uzupełniamy braki w populacji od góry listy z punktu 5</li>
</ol>

const Slide34A_RANDOM_WITH_REPETITIONS_ALGO_TEXT = 
<ol>
    <li id="0">Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li id="1">Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li id="2">Tworzymy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="3">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li><br></br>
    <li id="4">Wartości <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span> używamy do wykalibrowania koła ruletki</li><br></br>
    <li id="5">Brakujące osobniki losujemy metodą ruletki</li>
</ol>

const Slide34A_RANDOM_WITHOUT_REPETITIONS_ALGO_TEXT = 
<ol>
    <li id="0">Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li id="1">Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li id="2">Tworzymy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="3">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li><br></br>
    <li id="4">Wartości <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span> są prawdopodobieństwami sukcesu w próbach Bernoulliego</li><br></br>
    <li id="5">Losujemy poszczególne osobniki aż do zapełnienia populacji</li>
</ol>

const Slide34A_RANK_ALGO_TEXT = 'Rankingowa TODO'
const Slide34A_TOURNAMENT_ALGO_TEXT = 'Turniejowa TODO'
const Slide34A_DUEL_ALGO_TEXT = 'Pojedynkowa TODO'
const Slide34A_THRESHOLD_ALGO_TEXT = 'Progowa TODO'

var Slide34A_DETERMINISTIC = new ReproductionType(Slide34A_DETERMINISTIC_ALGO_TEXT, 6,
    calculate_p_r_A,
    calculate_n_A,
    calculate_int_n_A,
    calculate_frac_n_A)
var Slide34A_RANDOM_WITH_REPETITIONS = new ReproductionType(Slide34A_RANDOM_WITH_REPETITIONS_ALGO_TEXT, 6,
    calculate_p_r_A,
    calculate_n_A,
    calculate_int_n_A,
    calculate_frac_n_A)
var Slide34A_RANDOM_WITHOUT_REPETITIONS = new ReproductionType(Slide34A_RANDOM_WITHOUT_REPETITIONS_ALGO_TEXT, 6,
    calculate_p_r_A,
    calculate_n_A,
    calculate_int_n_A,
    calculate_frac_n_A)

var Slide34A_RANK = new ReproductionType(Slide34A_RANK_ALGO_TEXT)
var Slide34A_TOURNAMENT = new ReproductionType(Slide34A_TOURNAMENT_ALGO_TEXT)
var Slide34A_DUEL = new ReproductionType(Slide34A_DUEL_ALGO_TEXT)
var Slide34A_THRESHOLD = new ReproductionType(Slide34A_THRESHOLD_ALGO_TEXT)

const Slide34A_POPULATION_SIZE = 10
const Slide34A_INDIVIDUAL_GENOTYPE_LENGTH = 6
const Slide34A_INDIVIDUAL_MAX_FITNESS = 2**Slide34A_INDIVIDUAL_GENOTYPE_LENGTH - 1

const Slide34A_FITNESS_FUNCTION = (x) => x*x

var Slide34A_counter = 0

class Slide34A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description34 mainArea={this.mainArea}></Description34>;
        this.next = null
        this.timerId = null;

        this.generateButton = React.createRef()
        this.navigationButtons = React.createRef();

        let tmpIndividuals = []
        for (let i = 0; i < Slide34A_POPULATION_SIZE; ++i) {
            var genotype = randomBinary(0, Slide34A_INDIVIDUAL_MAX_FITNESS)
            var fenotype = bin2dec(genotype)
            var fitness = Slide34A_FITNESS_FUNCTION(fenotype)

            var newIndividual = new Individual(i+1, genotype, fenotype, fitness)
            tmpIndividuals.push(newIndividual)

            while(tmpIndividuals[i].Genotyp.length < Slide34A_INDIVIDUAL_GENOTYPE_LENGTH) {
                tmpIndividuals[i].Genotyp = "0" + tmpIndividuals[i].Genotyp // dodanie leading zeros
            }
        }

        this.state = {
            chosenReproductionType: Slide34A_DETERMINISTIC,
            individuals: tmpIndividuals,
            currentAlgoStepIndex: 0,
            stepEnded: false
        }
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            clearInterval(this.timerId)

            this.generateButton.current.disabled = false
            var inputs = document.querySelectorAll("input");
            for (var input of inputs) {
                input.disabled = false;
            }
        }
        else {
            var inputs = document.querySelectorAll("input");
            this.generateButton.current.disabled = true
            for (var input of inputs) {
                input.disabled = true;
            }

            this.timerId = setInterval(() => {
                this.algoStep()
            }, 1000);
        }
    }

    algoStep = () => {
        // TODO Slide34A_counter zastapic obliczeniami
        // TODO wyliczanie krok po kroku i update tabeli po jednej komorce

        console.log(this.state.chosenReproductionType.algoStepsList[this.state.currentAlgoStepIndex])

        if (this.state.currentAlgoStepIndex == this.state.chosenReproductionType.algoStepsCount) {
            this.onSimulationEnd()
            return
        }

        document.getElementById(this.state.currentAlgoStepIndex).style = "color: cyan; font-weight: 800"
        var tmpIndividuals = []

        if (Slide34A_counter == 2) {
            Slide34A_counter = 0
            this.setState({
                stepEnded: true
            });
        }

        Slide34A_counter++
        // for (let i = 0; i < Slide34A_POPULATION_SIZE; ++i) {
        //     var genotype = randomBinary(0, Slide34A_INDIVIDUAL_MAX_FITNESS)
        //     var fenotype = bin2dec(genotype)
        //     var fitness = Slide34A_FITNESS_FUNCTION(fenotype)

        //     var newIndividual = new Individual(i+1, genotype, fenotype, fitness)
        //     tmpIndividuals.push(newIndividual)

        //     while(tmpIndividuals[i].Genotyp.length < Slide34A_INDIVIDUAL_GENOTYPE_LENGTH) {
        //         tmpIndividuals[i].Genotyp = "0" + tmpIndividuals[i].Genotyp // dodanie leading zeros
        //     }
        // }

        if (this.state.stepEnded) {
            document.getElementById(this.state.currentAlgoStepIndex).style = ""
    
            this.setState(prevState => {
                return {
                    currentAlgoStepIndex: prevState.currentAlgoStepIndex+1,
                    stepEnded: false
                }
            });
        }
    }

    onSimulationEnd = () => {
        this.setState({
            currentAlgoStepIndex: 0
        });
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
    }

    generatePopulation = () => {
        //resetting whole slide
        for (let i = 0; i < this.state.chosenReproductionType.algoStepsCount; ++i) {
            document.getElementById(i).style = ""
        }

        Slide34A_counter = 0
        this.setState({
            currentAlgoStepIndex: 0,
        });

        // generate population
        let tmpIndividuals = []
        for (let i = 0; i < Slide34A_POPULATION_SIZE; ++i) {
            var genotype = randomBinary(0, Slide34A_INDIVIDUAL_MAX_FITNESS)
            var fenotype = bin2dec(genotype)
            var fitness = Slide34A_FITNESS_FUNCTION(fenotype)

            var newIndividual = new Individual(i+1, genotype, fenotype, fitness)
            tmpIndividuals.push(newIndividual)

            while(tmpIndividuals[i].Genotyp.length < Slide34A_INDIVIDUAL_GENOTYPE_LENGTH) {
                tmpIndividuals[i].Genotyp = "0" + tmpIndividuals[i].Genotyp // dodanie leading zeros
            }
        }

        this.setState({individuals: tmpIndividuals})
    }

    renderTableHeader(array) {
        let header = Object.keys(array[0])
        return header.map((key, index) => {
           return key == 'LP' ? 
           <th>{key}</th> : // look at Slide34A_FITNESS_FUNCTION
           key == 'Genotyp' ? <th>{key}</th> : 
           key == 'Fenotyp' ? <th>{key}<Latex>{"${x}$"}</Latex></th> : 
           key == 'Dostosowanie' ? <th>{key} <Latex>{"${f(x) = x^2}$"}</Latex></th> : 
           key == 'p_r_A' ? <th><Latex>{"${p_r(A)}$"}</Latex></th> : 
           key == 'n_A' ? <th><Latex>{"${n(A)}$"}</Latex></th> : 
           key == 'int_n_A' ? <th><Latex>{"int${(n(A))}$"}</Latex></th> : <th><Latex>{"frac${(n(A))}$"}</Latex></th>
        })
     }

    renderIndividualTableData(array) {
        return array.map((individual, index) => {
           const { LP, Genotyp, Fenotyp, Dostosowanie, p_r_A, n_A, int_n_A, frac_n_A } = individual //destructuring
           return (
                <tr>
                    <td>{LP}</td>
                    <td><tt>{Genotyp}</tt></td>
                    <td><tt>{Fenotyp}</tt></td>
                    <td><tt>{Dostosowanie}</tt></td>
                    <td><tt>{p_r_A}</tt></td>
                    <td><tt>{n_A}</tt></td>
                    <td><tt>{int_n_A}</tt></td>
                    <td><tt>{frac_n_A}</tt></td>
                </tr>
           )
        })
     }


    onReproductionTypeChange = (event) => {
        for (let i = 0; i < this.state.chosenReproductionType.algoStepsCount; ++i) {
            document.getElementById(i).style = ""
        }

        Slide34A_counter = 0
        this.setState({
            currentAlgoStepIndex: 0,
        });


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
                
                <div className="col-4 tableFixHead">
                    <h5><div style={{borderStyle: "double", display: "inline-block", padding:8}}>Osobniki</div> <button ref={this.generateButton} type="submit" className="btn btn-primary" onClick={this.generatePopulation}>Wygeneruj populację</button><br></br></h5>
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

                <div className="col-3" onChange={this.onReproductionTypeChange}>
                    <h4><div style={{marginLeft: 30, borderStyle: "double", display: "inline-block", padding:8}}>Wybór reprodukcji</div><br></br>
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
                <h1>symulacjo animacja TODO</h1>
            </div>
           
           
# W metodzie deterministycznej wynik reprodukcji na danej populacji zawsze jest taki sam -
# nie ma tutaj czynnika losowego (inaczej niż np, w ruletce). Stąd nie ma sensu uruchamiać reprodukcji 100 razy.

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={8} slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                               onStartStop={this.handleStartStop} ref={this.navigationButtons} current={this}
            ></NavigationButtons>
        </div>
        )
    }
}

export default Slide34A;