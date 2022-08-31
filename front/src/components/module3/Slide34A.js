import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Description34 from "./Description34";
import { InputNumber } from 'antd';
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


// ALGO FUNCTIONS
function calculate_p_r_A(individual) {
    var p_r_A = (individual.Dostosowanie / Slide34A_sum_f_i_onLoad).toFixed(3)
    individual.p_r_A = p_r_A
    return p_r_A
}

function calculate_n_A(individual) {
    var n_A = (Slide34A_POPULATION_SIZE * individual.p_r_A).toFixed(2)
    individual.n_A = n_A
    return n_A
}

function calculate_int_n_A(individual) {
    var int_n_A = Math.floor(individual.n_A)
    individual.int_n_A = int_n_A
    return int_n_A
}

function calculate_frac_n_A(individual) {
    var frac_n_A = Math.floor((individual.n_A - parseInt(individual.n_A)).toFixed(3) * 100)
    individual.frac_n_A = frac_n_A
    return frac_n_A
}

function create_int_n_A(oldIndividual) {
    if (Slide34A_create_int_n_A.length < Slide34A_POPULATION_SIZE) {
        for (let k = 0; k < oldIndividual.int_n_A; ++k) {
            var tmpIndividual = Object.assign({}, oldIndividual);
            tmpIndividual.LP = Slide34A_create_int_n_A.length + 1
            Slide34A_create_int_n_A.push(tmpIndividual)
        }
    }
}

function sort_descending_frac_n_A(oldIndividual) {
    Slide34A_create_int_n_A.sort((a,b) => (a.frac_n_A < b.frac_n_A) ? 1 : ((b.frac_n_A < a.frac_n_A) ? -1 : 0))
}

function last_step_deterministic(oldIndividual) {
    if (Slide34A_create_int_n_A.length < Slide34A_POPULATION_SIZE) {
        var tmpIndividual = Object.assign({}, oldIndividual);
        tmpIndividual.LP = Slide34A_create_int_n_A.length + 1
        Slide34A_create_int_n_A.push(tmpIndividual)
    }
}

function calibrate_frac_n_A_roulette(oldIndividual) {
    var tmpIndividual = Object.assign({}, oldIndividual)

    if (tmpIndividual.Genotyp !== undefined && !Slide34A_calibrate_frac_n_A_roulette.hasOwnProperty(tmpIndividual.Genotyp)) {
        Slide34A_calibrate_frac_n_A_roulette[tmpIndividual.Genotyp] = tmpIndividual.frac_n_A 
    }
}

function generate_new_individuals_using_roulette(oldIndividual) {
    let sumFrac_n_A = 0;
    for (let frac_n_A of Object.values(Slide34A_calibrate_frac_n_A_roulette)) {
        sumFrac_n_A += frac_n_A;
    }

    var probabilities = []
    var genotypesToDraw = []
    var chosenGenotype = null

    Object.entries(Slide34A_calibrate_frac_n_A_roulette).forEach(([genotype, frac_n_A]) => {
        probabilities.push(frac_n_A / sumFrac_n_A)
        genotypesToDraw.push(genotype)
    })

    
    var randomRouletteDraw = Math.random()
    var sumProb = 0
    var lastIndex = probabilities.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        sumProb += probabilities[i];
        if (randomRouletteDraw < sumProb) {
            chosenGenotype = genotypesToDraw[i]
        }
    }
    
    if (chosenGenotype == null) {
        chosenGenotype = genotypesToDraw[lastIndex]
    }
    
    var currentSumFitness = Slide34A_create_int_n_A.reduce((total, obj) => obj.Dostosowanie + total, 0)
    
    if (Slide34A_create_int_n_A.length < Slide34A_POPULATION_SIZE) {
        var fenotype = bin2dec(chosenGenotype)
        var fitness = Slide34A_FITNESS_FUNCTION(fenotype)
        var tmpIndividual = new Individual(Slide34A_create_int_n_A.length + 1, chosenGenotype, fenotype, fitness)


        tmpIndividual.p_r_A = calculate_p_r_A(tmpIndividual)
        tmpIndividual.n_A = calculate_n_A(tmpIndividual)
        tmpIndividual.int_n_A = calculate_int_n_A(tmpIndividual)
        tmpIndividual.frac_n_A = calculate_frac_n_A(tmpIndividual)

        tmpIndividual.indicators = [
            tmpIndividual.p_r_A,
            tmpIndividual.n_A,
            tmpIndividual.int_n_A,
            tmpIndividual.frac_n_A
        ]

        Slide34A_create_int_n_A.push(tmpIndividual)
    }

    if (Slide34A_create_int_n_A.length == Slide34A_POPULATION_SIZE) {
        calculateAllIndicatorsForPopulation(currentSumFitness)
    }
}

function bernoulli_frac_n_A() {
    //TODO
}
// END ALGO FUNCTIONS


function calculateAllIndicatorsForPopulation(currentSumFitness) {
    for (let i = 0; i < Slide34A_create_int_n_A.length; ++i) {
        Slide34A_create_int_n_A[i].p_r_A = (Slide34A_create_int_n_A[i].Dostosowanie / currentSumFitness).toFixed(3)
        Slide34A_create_int_n_A[i].n_A = calculate_n_A(Slide34A_create_int_n_A[i])
        Slide34A_create_int_n_A[i].int_n_A = calculate_int_n_A(Slide34A_create_int_n_A[i])
        Slide34A_create_int_n_A[i].frac_n_A = calculate_frac_n_A(Slide34A_create_int_n_A[i])

        Slide34A_create_int_n_A[i].indicators = [
            Slide34A_create_int_n_A[i].p_r_A,
            Slide34A_create_int_n_A[i].n_A,
            Slide34A_create_int_n_A[i].int_n_A,
            Slide34A_create_int_n_A[i].frac_n_A
        ]
    }

    Slide34A_sum_f_i = currentSumFitness // w przypadku uruchomienia symulacji drugi raz, po zakonczeniu pierwszego razu bez zmiany operatora
}


class ReproductionType {
    constructor(algoText, algoStepsCount, step_1, step_2, step_3, step_4, step_5, step_6, step_7) {
        this.algoText = algoText
        this.algoStepsCount = algoStepsCount
        this.algoStepsList = [step_1, step_2, step_3, step_4, step_5, step_6, step_7]
    }
}

class Individual {
    constructor(LP, Genotyp, Fenotyp, Dostosowanie) {
        this.LP = LP
        this.Genotyp = Genotyp
        this.Fenotyp = Fenotyp
        this.Dostosowanie = Dostosowanie

        this.indicators = [0,0,0,0] // p_r_A, n_A, int_n_A, frac_n_A

        this.p_r_A = null
        this.n_A = null
        this.int_n_A = null
        this.frac_n_A = null
    }
}

const Slide34A_DETERMINISTIC_ALGO_TEXT = 
<ol>
    <li id="0">Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li id="1">Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li id="2">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="3">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li><br></br>
    <li id="4">Tworzymy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="5">Sortujemy osobniki wg malejącej <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li><br></br>
    <li id="6">Uzupełniamy populację od góry listy malejącego <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li>
</ol>

const Slide34A_RANDOM_WITH_REPETITIONS_ALGO_TEXT = 
<ol>
    <li id="0">Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li id="1">Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li id="2">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="3">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li><br></br>
    <li id="4">Tworzymy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="5">Wartości <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span> używamy do wykalibrowania koła ruletki</li><br></br>
    <li id="6">Brakujące osobniki losujemy metodą ruletki</li>
</ol>

const Slide34A_RANDOM_WITHOUT_REPETITIONS_ALGO_TEXT = 
<ol>
    <li id="0">Obliczamy <span style={{color: "yellow"}}><Latex>{"${p_r(A) = \\frac{f(A)}{\\sum_i f_i}}$"}</Latex></span></li><br></br>
    <li id="1">Obliczamy <span style={{color: "yellow"}}><Latex>{"${n(A) = E[n(A)] = N\\cdot p_r(A)}$"}</Latex></span></li><br></br>
    <li id="2">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="3">Dla każdego osobnika zapamiętujemy <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span></li><br></br>
    <li id="4">Tworzymy <span style={{color: "yellow"}}><Latex>{"int${(n(A))}$"}</Latex></span></li><br></br>
    <li id="5">Wartości <span style={{color: "yellow"}}><Latex>{"frac${(n(A))}$"}</Latex></span> są prawdopodobieństwami sukcesu w próbach Bernoulliego</li><br></br>
    <li id="6">Losujemy poszczególne osobniki aż do zapełnienia populacji</li>
</ol>

const Slide34A_RANK_ALGO_TEXT = 'Rankingowa TODO'
const Slide34A_TOURNAMENT_ALGO_TEXT = 'Turniejowa TODO'
const Slide34A_DUEL_ALGO_TEXT = 'Pojedynkowa TODO'
const Slide34A_THRESHOLD_ALGO_TEXT = 'Progowa TODO'

var Slide34A_DETERMINISTIC = new ReproductionType(Slide34A_DETERMINISTIC_ALGO_TEXT, 7,
    calculate_p_r_A,
    calculate_n_A,
    calculate_int_n_A,
    calculate_frac_n_A,
    create_int_n_A,
    sort_descending_frac_n_A,
    last_step_deterministic
)
var Slide34A_RANDOM_WITH_REPETITIONS = new ReproductionType(Slide34A_RANDOM_WITH_REPETITIONS_ALGO_TEXT, 7,
    calculate_p_r_A,
    calculate_n_A,
    calculate_int_n_A,
    calculate_frac_n_A,
    create_int_n_A,
    calibrate_frac_n_A_roulette,
    generate_new_individuals_using_roulette
)
var Slide34A_RANDOM_WITHOUT_REPETITIONS = new ReproductionType(Slide34A_RANDOM_WITHOUT_REPETITIONS_ALGO_TEXT, 7,
    calculate_p_r_A,
    calculate_n_A,
    calculate_int_n_A,
    calculate_frac_n_A,
    create_int_n_A,
    bernoulli_frac_n_A,
    generate_new_individuals_using_roulette // TODO czy na pewno tez ruletka dla losowej bez powtorzen
)

var Slide34A_RANK = new ReproductionType(Slide34A_RANK_ALGO_TEXT)
var Slide34A_TOURNAMENT = new ReproductionType(Slide34A_TOURNAMENT_ALGO_TEXT)
var Slide34A_DUEL = new ReproductionType(Slide34A_DUEL_ALGO_TEXT)
var Slide34A_THRESHOLD = new ReproductionType(Slide34A_THRESHOLD_ALGO_TEXT)

const Slide34A_POPULATION_SIZE = 10
const Slide34A_INDIVIDUAL_GENOTYPE_LENGTH = 6
const Slide34A_INDIVIDUAL_MAX_FITNESS = 2**Slide34A_INDIVIDUAL_GENOTYPE_LENGTH - 1

const Slide34A_ALGO_STEP_TIMEOUT = 200

const Slide34A_FITNESS_FUNCTION = (x) => x*x

var Slide34A_sum_f_i = 0
var Slide34A_sum_f_i_onLoad = 0
var Slide34A_create_int_n_A = []
var Slide34A_calibrate_frac_n_A_roulette = {} // slownik --> genotyp: frac_n_A


class Slide34A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description34 mainArea={this.mainArea}></Description34>;
        this.next = null
        this.timerId = null;

        this.generateButton = React.createRef()
        this.navigationButtons = React.createRef();
        this.algoStepIntervalInput = React.createRef();

        let tmpIndividuals = []

        Slide34A_sum_f_i = 0
        Slide34A_sum_f_i_onLoad = 0
        Slide34A_create_int_n_A = []
        Slide34A_calibrate_frac_n_A_roulette = {}

        for (let i = 0; i < Slide34A_POPULATION_SIZE; ++i) {
            var genotype = randomBinary(0, Slide34A_INDIVIDUAL_MAX_FITNESS)
            var fenotype = bin2dec(genotype)
            var fitness = Slide34A_FITNESS_FUNCTION(fenotype)

            var newIndividual = new Individual(i+1, genotype, fenotype, fitness)
            tmpIndividuals.push(newIndividual)

            while(tmpIndividuals[i].Genotyp.length < Slide34A_INDIVIDUAL_GENOTYPE_LENGTH) {
                tmpIndividuals[i].Genotyp = "0" + tmpIndividuals[i].Genotyp // dodanie leading zeros
            }

            Slide34A_sum_f_i += fitness
            Slide34A_sum_f_i_onLoad += fitness
        }

        this.state = {
            chosenReproductionType: Slide34A_DETERMINISTIC,
            individuals: tmpIndividuals,
            currentAlgoStepIndex: 0,
            currentIndividualIndex: 0,
            algoStepInterval: Slide34A_ALGO_STEP_TIMEOUT,
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
            }, this.state.algoStepInterval);
        }
    }

    algoStep = () => {
        console.log(this.state.chosenReproductionType.algoStepsList[this.state.currentAlgoStepIndex])

        if (this.state.currentAlgoStepIndex == this.state.chosenReproductionType.algoStepsCount) {
            this.onSimulationEnd()
            return
        }

        var idx = this.state.currentIndividualIndex
        var currentIndicatorIdx = this.state.currentAlgoStepIndex
        var func = this.state.chosenReproductionType.algoStepsList[currentIndicatorIdx]

        if (document.getElementById(this.state.currentAlgoStepIndex) != null) {
            document.getElementById(this.state.currentAlgoStepIndex).style = "color: cyan; font-weight: 800"  //podswietlenie obecnego kroku algorytmu
        }
        
        if (func !== undefined) {

            if (currentIndicatorIdx == 0 ||
                currentIndicatorIdx == 1 ||
                currentIndicatorIdx == 2 ||
                currentIndicatorIdx == 3) { // pierwszy z czterech krokow dla Slide34A_DETERMINISTIC, Slide34A_RANDOM_WITH_REPETITIONS, Slide34A_RANDOM_WITHOUT_REPETITIONS

                //podswietlanie komorek w tabeli

        
                if (this.state.currentIndividualIndex == 0) {
                    document.getElementById('00').style = "background-color: cyan; font-weight: 800"
                    document.getElementById((this.state.individuals.length-1) + '0').style = "style"
                }
                else {
                    document.getElementById(this.state.currentIndividualIndex + '0').style = "background-color: cyan; font-weight: 800"
                    document.getElementById(this.state.currentIndividualIndex-1 + '0').style = ""
                }
                //koniec podswietlania komorek w tabeli i algorytmu

                var calculatedValue = func(this.state.individuals[idx])
                this.state.individuals[idx].indicators[currentIndicatorIdx] = calculatedValue

                this.setState(prevState => {
                    return {
                        individuals: prevState.individuals,
                        currentIndividualIndex: prevState.currentIndividualIndex+1
                    }
                });
            } else {
                func(this.state.individuals[idx])

                this.setState(prevState => {
                    return {
                        currentIndividualIndex: prevState.currentIndividualIndex+1
                    }
                });

                if (this.state.currentIndividualIndex == Slide34A_POPULATION_SIZE) {
                    this.setState({
                        stepEnded: true,
                        individuals: Slide34A_create_int_n_A,
                    });
                }
            }
        }

        if (this.state.currentIndividualIndex == Slide34A_POPULATION_SIZE) {
            this.setState({
                stepEnded: true
            });
        }

        if (this.state.stepEnded) {
            document.getElementById(this.state.currentAlgoStepIndex).style = "" // wylaczenie podswietlania obecnego kroku algorytmu
    
            this.setState(prevState => {
                return {
                    currentAlgoStepIndex: prevState.currentAlgoStepIndex+1,
                    currentIndividualIndex: 0,
                    stepEnded: false
                }
            });
        }
    }

    onSimulationEnd = () => {
        this.setState({
            currentAlgoStepIndex: 0,
            currentIndividualIndex: 0,
            individuals: Slide34A_create_int_n_A,
            stepEnded: false
        });

        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
        Slide34A_create_int_n_A = []
        Slide34A_calibrate_frac_n_A_roulette = {}
    }

    generatePopulation = () => {
        //resetting whole slide
        Slide34A_sum_f_i = 0
        Slide34A_sum_f_i_onLoad = 0
        Slide34A_create_int_n_A = []

        for (let i = 0; i < this.state.chosenReproductionType.algoStepsCount; ++i) {
            document.getElementById(i).style = "" // wylaczenie podswietlen wszystkich krokow algorytmu
        }

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

            Slide34A_sum_f_i += fitness
            Slide34A_sum_f_i_onLoad += fitness
        }

        this.setState({
            currentAlgoStepIndex: 0,
            currentIndividualIndex: 0,
            stepEnded: false,
            individuals: tmpIndividuals
        })
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
           key == 'int_n_A' ? <th><Latex>{"int${(n(A))}$"}</Latex></th> :
           key == 'frac_n_A' ? <th><Latex>{"frac${(n(A))}$"}</Latex></th> : null
        })
     }

    renderIndividualTableData(array) {
        return array.map((individual, index) => {
           const { LP, Genotyp, Fenotyp, Dostosowanie, indicators } = individual //destructuring

           return (
            // document.getElementById('00').style = "background-color: cyan; font-weight: 800"
                <tr>
                    <td id={index + '0'}>{LP}</td>
                    <td><tt>{Genotyp}</tt></td>
                    <td><tt>{Fenotyp}</tt></td>
                    <td><tt>{Dostosowanie}</tt></td>
                    <td><tt>{indicators[0]}</tt></td>
                    <td><tt>{indicators[1]}</tt></td>
                    <td><tt>{indicators[2]}</tt></td>
                    <td><tt>{indicators[3]}</tt></td>
                </tr>
           )
        })
     }


    onReproductionTypeChange = (event) => {
        for (let i = 0; i < this.state.chosenReproductionType.algoStepsCount; ++i) {
            document.getElementById(i).style = "" // wylaczenie podswietlen wszystkich krokow algorytmu
        }

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

        this.generatePopulation()
    }

    
    onChangeAlgoStepInterval = value => {
        this.setState({
          algoStepInterval: value,
        })
    }

    render(){
        
        return(
        <div>
            <h1>Operatory reprodukcji</h1>

            <div className="row">
                
                <div className="col-4 tableFixHead">
                    <h5><div style={{borderStyle: "double", display: "inline-block", padding:8}}>Osobniki</div>
                    <button ref={this.generateButton} type="submit" className="btn btn-primary" onClick={this.generatePopulation}>Wygeneruj populację / resetuj postęp</button><br></br></h5>
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
                    <h5><div style={{marginLeft: 80, borderStyle: "double", display: "inline-block", padding:8}}>Algorytm</div>
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
                    odstęp czasowy (ms)
                    <br></br>
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
                <h2>Początkowe średnie dostosowanie w populacji: <span style={{color: "yellow"}}>{(Slide34A_sum_f_i_onLoad / Slide34A_POPULATION_SIZE).toFixed(3)}</span></h2>
                <h2>Obecne średnie dostosowanie w populacji: <span style={{color: "lime"}}>{(this.state.individuals.reduce((total, obj) => obj.Dostosowanie + total, 0) / this.state.individuals.length).toFixed(3)}</span></h2>
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