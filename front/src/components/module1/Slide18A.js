import React, { Component } from "react";
import { MODULE_1_SLIDES_COUNT } from "../templates/ListExercisePanel";
import NavigationButtons from "../templates/NavigationButtons";
import Slide17A from "./Slide17A";
import MySlider from "../common/MySlider";
import '../../css/Slide18A.css';


// TODO: jak liczyc dostosowanie
// TODO: **** rozpietosc minusowa zla
// TODO: tabela schematow jako scrollowane okno
// TODO: check if osobnik matchuje schemat, jesli tak to licz dostosowanie


const Slide18A_SLIDER_POPSIZE_DEFAULT = 10
const Slide18A_SLIDER_CODELENGTH_DEFAULT = 3

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
        // this.generateButton = React.createRef(); 
        // this.generateButton = React.createRef(); 
        // this.generateButton = React.createRef(); 



        this.state = {
            sliderPopSizeValue: Slide18A_SLIDER_POPSIZE_DEFAULT,
            sliderCodeLengthValue: Slide18A_SLIDER_CODELENGTH_DEFAULT,
            individuals: [
                { LP: 1, Osobnik: '00000', Przystosowanie: 0.0, Procent: 0.0 },
            ],
            schemas: [
                { Schemat: '*****', Przystosowanie: 0.0, Rozpietosc: 0, Rzad: 0}
            ]
        }
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


            allPossibleSchemas[i] = { Schemat: allPossibleSchemas[i],
                Przystosowanie: 0.0,
                Rozpietosc: indexRight - indexLeft, // odległość między skrajnymi ustalonymi pozycjami
                Rzad: allPossibleSchemas[i].split("0").length - 1 + allPossibleSchemas[i].split("1").length - 1} // liczba ustalonych pozycji (liczba zer lub jedynek)
        }

        allPossibleSchemas.sort((a,b) => (a.Schemat > b.Schemat) ? 1 : ((b.Schemat > a.Schemat) ? -1 : 0))

        this.setState({individuals: tmpIndividuals, schemas: allPossibleSchemas})
    }

    renderTableHeader(array) {
        let header = Object.keys(array[0])
        return header.map((key, index) => {
           return key == 'Procent' ? <th key={index}>%</th> : <th key={index}>{key.toUpperCase()}</th>
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
                 <td><tt>{Procent.toFixed(3)}</tt></td>
              </tr>
           )
        })
     }

     renderSchemasTableData(array) {
        return array.map((individual, index) => {
           const { Schemat, Przystosowanie, Rozpietosc, Rzad } = individual //destructuring
           return (
              <tr key={Schemat}>
                 <td><tt>{Schemat}</tt></td>
                 <td><tt>{Przystosowanie}</tt></td>
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
                <MySlider min={Slide18A_SLIDER_POPSIZE_DEFAULT} max={50} defaultValue={Slide18A_SLIDER_POPSIZE_DEFAULT} sliderSize={4} step={1} ref={this.sliderPopSize} text={"Liczebność populacji"} passValueToParent={this.onChangeSliderPopSize}></MySlider>
                <MySlider min={Slide18A_SLIDER_CODELENGTH_DEFAULT} max={5} defaultValue={Slide18A_SLIDER_CODELENGTH_DEFAULT} sliderSize={4} step={1} ref={this.sliderCodeLength} text={"Długość ciągu kodowego"} passValueToParent={this.onChangeSliderCodeLengthValue}></MySlider>

                <button ref={ref => this.generateButton = ref} type="submit" className="btn btn-primary col-2" onClick={this.generatePopulationAndSchemas}>Wygeneruj populację</button>
                <table id='individuals'>
                    <tr>{this.renderTableHeader(this.state.individuals)}</tr>
                    <tbody>
                        {this.renderIndividualTableData(this.state.individuals)}
                    </tbody>
                </table>

                <table id='individuals'>
                    <tr>{this.renderTableHeader(this.state.schemas)}</tr>
                    <tbody>
                        {this.renderSchemasTableData(this.state.schemas)}
                    </tbody>
                </table>

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

