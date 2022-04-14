import React, { Component } from "react";
import { MODULE_1_SLIDES_COUNT } from "../templates/ListExercisePanel";
import NavigationButtons from "../templates/NavigationButtons";
import Slide17A from "./Slide17A";
import MySlider from "../common/MySlider";
import '../../css/Slide18A.css';


// TODO: jak liczyc dostosowanie
// TODO: handlowanie buttonow operatorow
// TODO: rysowanie wykresu?
// TODO: dodac wzory z twierdzenia schematow pod tabelkami


const Slide18A_SLIDER_POPSIZE_MIN_DEFAULT = 10
const Slide18A_SLIDER_POPSIZE_MAX_DEFAULT = 100
const Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT = 3
const Slide18A_SLIDER_CODELENGTH_MAX_DEFAULT = 6

function randomBinary(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min)).toString(2);
}

class Slide18A extends Component {

    constructor(props) {
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide17A mainArea={this.mainArea}></Slide17A>
        this.next = null
        this.title = 'Wpływ operatorów genetycznych na schematy'
        this.navigationButtons = React.createRef()

        this.sliderPopSize = React.createRef(); 
        this.sliderCodeLength = React.createRef(); 

        this.generateButton = React.createRef(); 
        this.reproductionButton = React.createRef(); 
        this.crossoverButton = React.createRef(); 
        this.mutationButton = React.createRef(); 



        this.state = {
            sliderPopSizeValue: Slide18A_SLIDER_POPSIZE_MIN_DEFAULT,
            sliderCodeLengthValue: Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT,
            individuals: [
                { LP: 1, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
            ],
            schemas: [
                { Schemat: '*****', Przystosowanie: 0.0, Reprezentanci: 0, Rozpietosc: 0, Rzad: 0}
            ],
            schemasOnlyWithAsterisks: [],
            filterSchemasChecked: false
        }
    }

    filterSchemas = () => {
        this.setState({
            filterSchemasChecked: !this.state.filterSchemasChecked,
        });
    }

    onChangeSliderPopSize = (v) => {
        this.setState({
            sliderPopSizeValue: v,
        });
    }

    onChangeSliderCodeLengthValue = (v) => {
        this.setState({
            sliderCodeLengthValue: v,
        });
    }

    reproduce = () => {
    
    }

    crossover = () => {

    }

    mutate = () => {

    }

    generatePopulationAndSchemas = () => {
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
            tmpIndividuals[i]['Procent'] = tmpIndividuals[i]['Przystosowanie'] / sumFitness
        }

        // SCHEMAS
        var schema           = '';
        var allPossibleSchemas = [];
        var alphabet       = '01*';

        while (allPossibleSchemas.length != 3**this.state.sliderCodeLengthValue) {
            for ( var i = 0; i < this.state.sliderCodeLengthValue; i++ ) {
                schema += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            }
            if (!allPossibleSchemas.includes(schema)) {
                allPossibleSchemas.push(schema)
            }
            
            schema = ''
        }


        // szukanie ustalonych pozycji z lewej i prawej
        for (let i = 0; i < allPossibleSchemas.length; ++i) {

            let leftFound = false
            let rightFound = false
            let indexLeft = 0
            let indexRight = allPossibleSchemas[i].length - 1
            while (!leftFound || !rightFound) {
                if (allPossibleSchemas[i][indexLeft] == '*')
                    indexLeft++
                else
                    leftFound=true

                if (allPossibleSchemas[i][indexRight] == '*')
                    indexRight--
                else
                    rightFound=true

                if (indexLeft > allPossibleSchemas[i].length - 1)
                    break
            }

            let representantsOfSchemaCount = 0
            let representantsOfSchemaFitnessSum = 0
            for (let k = 0; k < tmpIndividuals.length; ++k) {
                let j = 0
                let schemaChecked = false

                while (!schemaChecked) {
                    if (tmpIndividuals[k]['Osobnik'][j] == allPossibleSchemas[i][j] || allPossibleSchemas[i][j] == '*') {
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


            allPossibleSchemas[i] = { Schemat: allPossibleSchemas[i],
                Przystosowanie: representantsOfSchemaCount == 0 ? 0 : (representantsOfSchemaFitnessSum / representantsOfSchemaCount).toFixed(3),
                Reprezentanci: representantsOfSchemaCount,
                Rozpietosc: indexRight - indexLeft, // odległość między skrajnymi ustalonymi pozycjami
                Rzad: allPossibleSchemas[i].split("0").length - 1 + allPossibleSchemas[i].split("1").length - 1} // liczba ustalonych pozycji (liczba zer lub jedynek)
        }

        allPossibleSchemas.sort((a,b) => (a.Przystosowanie < b.Przystosowanie) ? 1 : ((b.Przystosowanie < a.Przystosowanie) ? -1 : 0))

        let sliderCodeLengthValue = this.state.sliderCodeLengthValue
        allPossibleSchemas = allPossibleSchemas.filter(function(schema) {
            return schema.Schemat !== '*'.repeat(sliderCodeLengthValue)  // usuniecie schematu *** samych gwiazdek
        });

        let tmpschemasOnlyWithAsterisks = allPossibleSchemas.filter(function(schema) {
            return schema.Schemat.includes('*')  // usuniecie schematu *** samych gwiazdek
        });

        this.setState({individuals: tmpIndividuals, schemas: allPossibleSchemas, schemasOnlyWithAsterisks: tmpschemasOnlyWithAsterisks})
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
              <tr key={LP}>
                 <td>{LP}</td>
                 <td><tt>{Osobnik}</tt></td>
                 <td><tt>{Przystosowanie}</tt></td>
                 <td><tt>{(Procent * 100).toFixed(3)}</tt></td>
              </tr>
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
                 <td>{Reprezentanci}</td>
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

    render() {
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

                    <div className="col-3">
                        <div className="row"><button ref={ref => this.reproductionButton = ref}
                                type="submit"
                                className="btn btn-primary m-2"
                                onClick={this.reproduce}>Reprodukcja</button>
                        </div>
                        
                        <div className="row"><button ref={ref => this.crossoverButton = ref}
                                type="submit"
                                className="btn btn-primary m-2"
                                onClick={this.crossover}>Krzyżowanie</button>
                        </div>

                        <div className="row"><button ref={ref => this.mutationButton = ref}
                                type="submit"
                                className="btn btn-primary m-2"
                                onClick={this.mutate}>Mutacja</button>
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

