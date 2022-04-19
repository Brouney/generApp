import React, { Component } from "react";
import { MODULE_1_SLIDES_COUNT } from "../templates/ListExercisePanel";
import NavigationButtons from "../templates/NavigationButtons";
import Slide17A from "./Slide17A";
import Slide19A from "./Slide19A";
import MySlider from "../common/MySlider";
import Plot from "react-plotly.js";
import '../../css/Slide18A.css';


// TODO: jak liczyc dostosowanie
// TODO: poprawny update wykresu po mutacji i krzyzowaniu
// TODO: (niekoniecznie) dodac wzory z twierdzenia schematow pod tabelkami


const Slide18A_SLIDER_POPSIZE_MIN_DEFAULT = 10
const Slide18A_SLIDER_POPSIZE_MAX_DEFAULT = 100
const Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT = 3
const Slide18A_SLIDER_CODELENGTH_MAX_DEFAULT = 6

var Slide18A_allPossibleSchemasStrings = [];
var Slide18A_plotData = [];

function randomBinary(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min)).toString(2);
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

class Slide18A extends Component {

    constructor(props) {
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide17A mainArea={this.mainArea}></Slide17A>
        this.next = <Slide19A mainArea={this.mainArea}></Slide19A>
        this.title = 'Wpływ operatorów genetycznych na schematy'
        this.navigationButtons = React.createRef()

        this.sliderPopSize = React.createRef(); 
        this.sliderCodeLength = React.createRef(); 

        this.generateButton = React.createRef(); 
        this.reproductionButton = React.createRef(); 
        this.crossoverButton = React.createRef(); 
        this.mutationButton = React.createRef();

        this.crossoverIndividualsIDs1 = React.createRef(); 
        this.crossoverIndividualsIDs2 = React.createRef(); 
        this.crosspoint = React.createRef(); 
        this.mutationBit = React.createRef(); 
        this.mutationIndividual = React.createRef(); 



        this.state = {
            sliderPopSizeValue: Slide18A_SLIDER_POPSIZE_MIN_DEFAULT,
            sliderCodeLengthValue: Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT,
            individuals: [
                { LP: 1, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 2, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 3, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 4, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 5, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 6, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 7, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 8, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 9, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
                { LP: 10, Osobnik: '000', Przystosowanie: 0.0, Procent: 0.0 },
            ],
            schemas: [
                { Schemat: '111', Przystosowanie: 0.0, Reprezentanci: [], Rozpietosc: 0, Rzad: 0},
            ],
            schemasOnlyWithAsterisks: [
                { Schemat: '1*1', Przystosowanie: 0.0, Reprezentanci: [], Rozpietosc: 0, Rzad: 0},
            ],
            filterSchemasChecked: false,
            generation: 0
        }


        this.generateAllPossibleSchemasStrings()
    }

    generateAllPossibleSchemasStrings() {
        var schema           = '';
        var alphabet       = '01*';
        Slide18A_allPossibleSchemasStrings = [];
        
        while (Slide18A_allPossibleSchemasStrings.length != 3**this.state.sliderCodeLengthValue) {
            for ( var i = 0; i < this.state.sliderCodeLengthValue; i++ ) {
                schema += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            }
            if (!Slide18A_allPossibleSchemasStrings.includes(schema)) {
                Slide18A_allPossibleSchemasStrings.push(schema)
            }
            
            schema = ''
        }
    }
        
    filterSchemas = () => {
        this.setState({
            filterSchemasChecked: !this.state.filterSchemasChecked,
        });
    }

    disableOperatorsButtons() {
        this.reproductionButton.disabled = "disabled"
        this.crossoverButton.disabled = "disabled"
        this.mutationButton.disabled = "disabled"
    }

    enableOperatorsButtons() {
        this.reproductionButton.disabled = ""
        this.crossoverButton.disabled = ""
        this.mutationButton.disabled = ""
    }

    onChangeSliderPopSize = (v) => {
        this.disableOperatorsButtons()

        this.setState({
            sliderPopSizeValue: v,
        });
    }

    onChangeSliderCodeLengthValue = (v) => {
        this.disableOperatorsButtons()

        this.setState({
            sliderCodeLengthValue: v,
        });
    }

    highlightIndividuals = (e) =>  {
        this.setState({
            individuals: this.state.individuals,
        });
    }

    reproduce = () => {
        let newIndividuals = []
        for (let i = 0; i < this.state.individuals.length; ++i) {
            if (Math.random() < this.state.individuals[i]['Procent'] / 100) {
                newIndividuals.push(this.state.individuals[i])
            }
            else {
                newIndividuals.push({ LP: i+1, Osobnik: randomBinary(0, 2**this.state.sliderCodeLengthValue-1), Przystosowanie: 0.0, Procent: 0.0 })

                while(newIndividuals[i]['Osobnik'].length < this.state.sliderCodeLengthValue) {
                    newIndividuals[i]['Osobnik'] = "0" + newIndividuals[i]['Osobnik'] // dodanie leading zeros
                }
            }
        }

        let sumFitness = 0
        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            newIndividuals[i]['Przystosowanie'] = parseInt(newIndividuals[i]['Osobnik'], 2) / 2**this.state.sliderCodeLengthValue
            sumFitness += newIndividuals[i]['Przystosowanie']
        }

        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            newIndividuals[i]['Procent'] = newIndividuals[i]['Przystosowanie'] / 2**this.state.sliderCodeLengthValue  // TODO: czy dobrze policzony % przystosowania
        }

        this.computeSchemas(newIndividuals)

        let sliderCodeLengthValue = this.state.sliderCodeLengthValue
        newIndividuals = newIndividuals.filter(function(individual) {
            return individual.Osobnik.length == sliderCodeLengthValue
        });

        this.setState({
            individuals: newIndividuals.sort((a,b) => (a.Przystosowanie < b.Przystosowanie) ? 1 : ((b.Przystosowanie < a.Przystosowanie) ? -1 : 0)),
            generation: ++this.state.generation,
        });
    }

    crossover = () => {
        let LP1 = this.crossoverIndividualsIDs1.value; // LP w tabeli liczone od jeden, indeksy this.state.individuals liczone od zera
        let LP2 = this.crossoverIndividualsIDs2.value;

        if (LP1 == LP2) {
            alert("Nie można skrzyżować osobnika ze samym sobą")
        }

        let individual_1 = null 
        let individual_2 = null 
        let crosspoint = this.crosspoint.value; // TODO check if crosspoint good minus 1
        let copyIndividuals = [...this.state.individuals]

        for (let i = 0; i < copyIndividuals.length; ++i) {
            if (LP1 == copyIndividuals[i]['LP']) {
                individual_1 = copyIndividuals[i]['Osobnik']
            }
            if (LP2 == copyIndividuals[i]['LP']) {
                individual_2 = copyIndividuals[i]['Osobnik']
            }
        }

        // console.log(individual_1, individual_2)

        for (let i = 0; i < this.state.sliderCodeLengthValue; i++) {
			if (i >= crosspoint) {
				let bit = individual_1[i]
                individual_1 = individual_1.replaceAt(i, individual_2[i])
                individual_2 = individual_2.replaceAt(i, bit)
			}
			else {
				// geny takie same jak u rodzicow
			}
		}

        // console.log(individual_1, individual_2)

        for (let i = 0; i < copyIndividuals.length; ++i) {
            if (LP1 == copyIndividuals[i]['LP']) {
                copyIndividuals[i]['Osobnik'] = individual_1 
            }
            if (LP2 == copyIndividuals[i]['LP']) {
                copyIndividuals[i]['Osobnik'] = individual_2
            }
        }

        let sumFitness = 0
        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            copyIndividuals[i]['Przystosowanie'] = parseInt(copyIndividuals[i]['Osobnik'], 2) / 2**this.state.sliderCodeLengthValue
            sumFitness += copyIndividuals[i]['Przystosowanie']
        }

        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            copyIndividuals[i]['Procent'] = copyIndividuals[i]['Przystosowanie'] / 2**this.state.sliderCodeLengthValue  // TODO: czy dobrze policzony % przystosowania
        }

        this.computeSchemas(copyIndividuals)

        // workaround na usuniecie smieci po poprzedniej populacji
        let sliderCodeLengthValue = this.state.sliderCodeLengthValue
        copyIndividuals = copyIndividuals.filter(function(individual) {
            return individual.Osobnik.length == sliderCodeLengthValue
        });

        this.setState({individuals: copyIndividuals.sort((a,b) => (a.Przystosowanie < b.Przystosowanie) ? 1 : ((b.Przystosowanie < a.Przystosowanie) ? -1 : 0))})
    }

    mutate = () => {
        let LP = this.mutationIndividual.value;
        let mutationBitIndex = this.mutationBit.value -1;

        let individual_1 = null
        let copyIndividuals = [...this.state.individuals]

        for (let i = 0; i < copyIndividuals.length; ++i) {
            if (LP == copyIndividuals[i]['LP']) {
                individual_1 = copyIndividuals[i]['Osobnik']
            }
        }

        // mutacja
        let bitValue = individual_1[mutationBitIndex]
        individual_1 = individual_1.replaceAt(mutationBitIndex, bitValue === '0' ? '1' : '0')
        // console.log(individual_1)
        //koniec mutacji


        for (let i = 0; i < copyIndividuals.length; ++i) {
            if (LP == copyIndividuals[i]['LP']) {
                copyIndividuals[i]['Osobnik'] = individual_1 
            }
        }

        let sumFitness = 0
        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            copyIndividuals[i]['Przystosowanie'] = parseInt(copyIndividuals[i]['Osobnik'], 2) / 2**this.state.sliderCodeLengthValue
            sumFitness += copyIndividuals[i]['Przystosowanie']
        }

        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            copyIndividuals[i]['Procent'] = copyIndividuals[i]['Przystosowanie'] / 2**this.state.sliderCodeLengthValue  // TODO: czy dobrze policzony % przystosowania
        }

        this.computeSchemas(copyIndividuals)

        // // workaround na usuniecie smieci po poprzedniej populacji
        let sliderCodeLengthValue = this.state.sliderCodeLengthValue
        copyIndividuals = copyIndividuals.filter(function(individual) {
            return individual.Osobnik.length == sliderCodeLengthValue
        });

        this.setState({individuals: copyIndividuals.sort((a,b) => (a.Przystosowanie < b.Przystosowanie) ? 1 : ((b.Przystosowanie < a.Przystosowanie) ? -1 : 0))})
    }

    computeSchemas = (tmpIndividuals) => {
        let newSchemas = []

        // szukanie ustalonych pozycji z lewej i prawej
        for (let i = 0; i < Slide18A_allPossibleSchemasStrings.length; ++i) {

            let leftFound = false
            let rightFound = false
            let indexLeft = 0
            let indexRight = Slide18A_allPossibleSchemasStrings[i].length - 1
            while (!leftFound || !rightFound) {
                if (Slide18A_allPossibleSchemasStrings[i][indexLeft] == '*')
                    indexLeft++
                else
                    leftFound=true

                if (Slide18A_allPossibleSchemasStrings[i][indexRight] == '*')
                    indexRight--
                else
                    rightFound=true

                if (indexLeft > Slide18A_allPossibleSchemasStrings[i].length - 1)
                    break
            }

            let representantsOfSchemaCount = 0
            let representantsOfSchemaFitnessSum = 0
            for (let k = 0; k < tmpIndividuals.length; ++k) {
                let j = 0
                let schemaChecked = false

                while (!schemaChecked) {
                    if (tmpIndividuals[k]['Osobnik'][j] == Slide18A_allPossibleSchemasStrings[i][j] || Slide18A_allPossibleSchemasStrings[i][j] == '*') {
                        j++
                    }
                    else {
                        schemaChecked = true
                    }
                    
                    if (j == this.state.sliderCodeLengthValue) {
                        representantsOfSchemaCount++
                        representantsOfSchemaFitnessSum += tmpIndividuals[k]['Przystosowanie']
                        schemaChecked = true
                    }
                }
            }

            let representants = null
            if (this.state.schemas[i] != undefined) {
                let tmpListRepresentants = this.state.schemas[i]['Reprezentanci']
                tmpListRepresentants.push(representantsOfSchemaCount)
                representants = tmpListRepresentants
            }
            else {
                representants = [representantsOfSchemaCount]
            }

            newSchemas.push({Schemat: Slide18A_allPossibleSchemasStrings[i],
                Przystosowanie: representantsOfSchemaCount == 0 ? 0 : (representantsOfSchemaFitnessSum / representantsOfSchemaCount).toFixed(3),
                Reprezentanci: representants,
                Rozpietosc: indexRight - indexLeft, // odległość między skrajnymi ustalonymi pozycjami
                Rzad: Slide18A_allPossibleSchemasStrings[i].split("0").length - 1 + Slide18A_allPossibleSchemasStrings[i].split("1").length - 1}) // liczba ustalonych pozycji (liczba zer lub jedynek)
        }

        // console.log(newSchemas)
        // newSchemas.sort((a,b) => (a.Przystosowanie < b.Przystosowanie) ? 1 : ((b.Przystosowanie < a.Przystosowanie) ? -1 : 0))

        let sliderCodeLengthValue = this.state.sliderCodeLengthValue
        newSchemas = newSchemas.filter(function(schema) {
            return schema.Schemat !== '*'.repeat(sliderCodeLengthValue)  // usuniecie schematu *** samych gwiazdek
        });

        let tmpschemasOnlyWithAsterisks = newSchemas.filter(function(schema) {
            return schema.Schemat.includes('*')  // usuniecie schematu *** samych gwiazdek
        });

        // console.log(tmpschemasOnlyWithAsterisks)

        this.setState({
            schemas: newSchemas,
            schemasOnlyWithAsterisks: tmpschemasOnlyWithAsterisks},
            () => {
                this.computePlotData();
              })
    }

    clearRepresentants = () => {
        let schemasWithOneElementInRepresentantsList = [...this.state.schemas]

        for (let i = 0; i < schemasWithOneElementInRepresentantsList.length; ++i) { 
            schemasWithOneElementInRepresentantsList[i]['Reprezentanci'] = []
        }

        this.setState({
            schemas: schemasWithOneElementInRepresentantsList,})
    }

    generatePopulationAndSchemas = () => {
        this.generateAllPossibleSchemasStrings()
        this.enableOperatorsButtons()

        let tmpIndividuals = []
        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            tmpIndividuals.push({ LP: i+1, Osobnik: randomBinary(0, 2**this.state.sliderCodeLengthValue-1), Przystosowanie: 0.0, Procent: 0.0 })

            while(tmpIndividuals[i]['Osobnik'].length < this.state.sliderCodeLengthValue) {
                tmpIndividuals[i]['Osobnik'] = "0" + tmpIndividuals[i]['Osobnik'] // dodanie leading zeros
            }
        }

        let sumFitness = 0
        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            tmpIndividuals[i]['Przystosowanie'] = parseInt(tmpIndividuals[i]['Osobnik'], 2) / 2**this.state.sliderCodeLengthValue
            sumFitness += tmpIndividuals[i]['Przystosowanie']
        }

        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            tmpIndividuals[i]['Procent'] = tmpIndividuals[i]['Przystosowanie'] / 2**this.state.sliderCodeLengthValue  // TODO: czy dobrze policzony % przystosowania
        }

        this.computeSchemas(tmpIndividuals)
        this.clearRepresentants()

        // workaround na usuniecie smieci po poprzedniej populacji
        let sliderCodeLengthValue = this.state.sliderCodeLengthValue
        tmpIndividuals = tmpIndividuals.filter(function(individual) {
            return individual.Osobnik.length == sliderCodeLengthValue
        });

        this.setState({individuals: tmpIndividuals.sort((a,b) => (a.Przystosowanie < b.Przystosowanie) ? 1 : ((b.Przystosowanie < a.Przystosowanie) ? -1 : 0)), generation: 0})
    }

    renderCrossoverIDs = () => {
        return this.state.individuals.map((individual, index) => {
            const { LP } = individual //destructuring
            return (
                <option value={LP}>{LP}</option>
            )
        })
    }

    renderMutationBits = () => {
        let mutationBits = [...Array(this.state.sliderCodeLengthValue+1).keys()]
        return mutationBits.slice(1).map((index) => {
            return (
                <option value={index}>{index}</option>
            )
        })
    }

    renderCrossoverPoint = () => {
        let crossoverPoints = [...Array(this.state.sliderCodeLengthValue).keys()]
        return crossoverPoints.slice(1).map((index) => {
            return (
                <option value={index}>{index}</option>
            )
        })
    }

    renderTableHeader(array) {
        let header = Object.keys(array[0])
        return header.map((key, index) => {
           return key == 'Procent' ? 
           <th key={index}>%</th> : 
           <th key={index}>{key.toUpperCase()}</th>
        })
     }

    renderIndividualTableData(array) {
        return array.map((individual, index) => {
           const { LP, Osobnik, Przystosowanie, Procent } = individual //destructuring
           return (
            (LP == this.crossoverIndividualsIDs1.value || LP == this.crossoverIndividualsIDs2.value ?
              (<tr key={LP}>
                  <td style={{backgroundColor: "gray"}}>{LP}</td>
                <td><tt>{Osobnik}</tt></td>
                 <td><tt>{Przystosowanie}</tt></td>
                 <td><tt>{(Procent * 100).toFixed(3)}</tt></td>
              </tr>)
              :
                (<tr key={LP}>
                <td>{LP}</td>
                <td><tt>{Osobnik}</tt></td>
                <td><tt>{Przystosowanie}</tt></td>
                <td><tt>{(Procent * 100).toFixed(3)}</tt></td>
            </tr>))
           )
        })
     }

     renderSchemasTableData(array) {
        return array.map((schema, index) => {
           const { Schemat, Przystosowanie, Reprezentanci, Rozpietosc, Rzad } = schema //destructuring
           return (
              <tr key={Schemat}>
                 <td><tt>{Schemat}</tt></td>
                 <td><tt>{Przystosowanie}</tt></td>
                 <td>{Reprezentanci[Reprezentanci.length - 1]}</td>
                 <td>{Rozpietosc}</td>
                 <td>{Rzad}</td>
              </tr>
           )
        })
     }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.navigationButtons.current.enableAllButtons()

        }
        else {

        }
        
    }

    computePlotData = () => {
        Slide18A_plotData = []

        for (let i = 0; i < this.state.schemasOnlyWithAsterisks.length; ++i) {
            Slide18A_plotData.push({
                type: "scatter",
                name: this.state.schemasOnlyWithAsterisks[i]['Schemat'],
                x: [...Array(this.state.generation).keys()],
                y: this.state.schemasOnlyWithAsterisks[i]['Reprezentanci'],
                colorscale: 'hsv',
            },)
        }
    }

    render() {
        this.computePlotData()

        
        return(
            <div>
                <h1>{this.title}</h1>
                <div className="row">
                    <div className="col-8">
                        <MySlider min={Slide18A_SLIDER_POPSIZE_MIN_DEFAULT} max={Slide18A_SLIDER_POPSIZE_MAX_DEFAULT} defaultValue={Slide18A_SLIDER_POPSIZE_MIN_DEFAULT} sliderSize={4} step={1} ref={this.sliderPopSize} text={"Liczebność populacji"} passValueToParent={this.onChangeSliderPopSize}></MySlider>
                        <MySlider min={Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT} max={Slide18A_SLIDER_CODELENGTH_MAX_DEFAULT} defaultValue={Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT} sliderSize={4} step={1} ref={this.sliderCodeLength} text={"Długość ciągu kodowego"} passValueToParent={this.onChangeSliderCodeLengthValue}></MySlider>
                    </div>

                    <div className="col-4">
                        <button ref={ref => this.generateButton = ref} type="submit" className="btn btn-primary" onClick={this.generatePopulationAndSchemas}>Wygeneruj populację</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2"><h3 style={{textAlign: "left"}}>POPULACJA</h3></div>
                    <div className="col-3"><h3 style={{textAlign: "right"}}>SCHEMATY</h3></div>
                    <input type="checkbox" onChange={this.filterSchemas} name="filterSchemas"/>
                    <label for="filterSchemas">Pokaż tylko schematy z gwiazdkami</label>
                </div>
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

                    <div className="col-4 tableFixHead">
                        <table id='individuals'>
                            <thead>
                                <tr>{this.renderTableHeader(this.state.schemas)}</tr>
                            </thead>
                            <tbody>
                                {this.state.filterSchemasChecked ? 
                                this.renderSchemasTableData(this.state.schemasOnlyWithAsterisks) : 
                                this.renderSchemasTableData(this.state.schemas)}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-5">
                        <div className="row"><button ref={ref => this.reproductionButton = ref}
                                type="submit"
                                className="btn btn-primary m-2"
                                onClick={this.reproduce}>Reprodukcja</button>
                                Pokolenie: {this.state.generation}
                        </div>
                        
                        <div className="row"><button ref={ref => this.crossoverButton = ref}
                                type="submit"
                                className="btn btn-primary m-2"
                                onClick={this.crossover}>Krzyżowanie</button>

                                <label for="crossoverIndividualsIDs1">Osobnik 1</label>
                                <select name="crossoverIndividualsIDs1"
                                id="crossoverIndividualsIDs1"
                                ref = {(ref)=> this.crossoverIndividualsIDs1 = ref}
                                onChange={this.highlightIndividuals}>
                                    {this.renderCrossoverIDs()}
                                </select>

                                <label for="crossoverIndividualsIDs2">Osobnik 2</label>
                                <select name="crossoverIndividualsIDs2"
                                id="crossoverIndividualsIDs2"
                                ref = {(ref)=> this.crossoverIndividualsIDs2 = ref}
                                onChange={this.highlightIndividuals}>
                                    {this.renderCrossoverIDs()}
                                </select>

                                <label for="crossoverPoint">Punkt cięcia</label>
                                <select name="crossoverPoint" id="crossoverPoint" ref = {(ref)=> this.crosspoint = ref}>
                                    {this.renderCrossoverPoint()}
                                </select>
                        </div>

                        <div className="row"><button ref={ref => this.mutationButton = ref}
                                type="submit"
                                className="btn btn-primary m-2"
                                onClick={this.mutate}>Mutacja</button>

                                <label for="mutationIndividual">Osobnik</label>
                                <select name="mutationIndividual"
                                id="mutationIndividual"
                                ref = {(ref)=> this.mutationIndividual = ref}
                                onChange={this.highlightIndividuals}>
                                    {this.renderCrossoverIDs()}
                                </select>

                                <label for="mutationBit">Gen mutujący</label>
                                <select name="mutationBit"
                                id="mutationBit"
                                ref = {(ref)=> this.mutationBit = ref}
                                onChange={this.highlightIndividuals}>
                                    {this.renderMutationBits()}
                                </select>
                        </div>


                        <div className="row-3">
                            <Plot
                                data={Slide18A_plotData}
                                config={{
                                    'displayModeBar': false, // wylaczenie kontrolek Plotly
                                    "scrollZoom": false      // wylaczenie zoomowania wykresu rolka myszki
                                }}
                                layout={{
                                    width: 500,
                                    height: 400,
                                    margin: {
                                        l: 50,
                                        r: 20,
                                        b: 60,
                                        t: 60,
                                        pad: 4
                                      },
                                    title: "Liczba reprezentantów schematu",
                                    // paper_bgcolor: '#d3d3d3',
                                    // plot_bgcolor: '#343a40',
                                    xaxis: {
                                        // showgrid: false,
                                        // visible: false,
                                        title: {
                                            text: 't'
                                        },
                                        tickmode: "linear",
                                        tick0: 1,
                                        dtick: 3
                                    },
                                    yaxis: {
                                        title: "m(H, t)",
                                        // showgrid: false,
                                        // visible: false
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>




                <NavigationButtons
                    ref={this.navigationButtons}
                    mainArea={this.mainArea} 
                    prev={this.prev} 
                    next={this.next} 
                    currentSlideCounter={8} 
                    slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                    current={this}
                    onStartStop={this.handleStartStop}
                ></NavigationButtons>
            </div>
        )
    }
}

export default Slide18A

