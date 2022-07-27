import React, { Component } from "react";
import { MODULE_1_SLIDES_COUNT, MODULE_2_SLIDES_COUNT } from "../templates/ListExercisePanel";
import NavigationButtons from "../templates/NavigationButtons";
import Slide18A from "./Slide21A";
import Slide110A from "./Slide22A";
import MySlider from "../common/MySlider";
import Plot from "react-plotly.js";
import '../../css/Slide21A.css';
import Description20 from "./Description20";
import Description21 from "./Description21";
import Slide21A from "./Slide21A";


// TODO: jak liczyc dostosowanie
// TODO: update wykresu po mutacji i krzyzowaniu
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


function printAllKLength(set,k)
{
    let n = set.length;
    printAllKLengthRec(set, "", n, k);
}
     
    // The main recursive method
    // to print all possible
    // strings of length k
function printAllKLengthRec(set,prefix,n,k)
{
    // Base case: k is 0,
    // print prefix
    if (k == 0)
    {
        Slide18A_allPossibleSchemasStrings.push(prefix)
        return;
    }
    
    // One by one add all characters
    // from set and recursively
    // call for k equals to k-1
    for (let i = 0; i < n; ++i)
    {
    
        // Next character of input added
        let newPrefix = prefix + set[i];
            
        // k is decreased, because
        // we have added a new character
        printAllKLengthRec(set, newPrefix,
                                n, k - 1);
    }
}
class Slide20A extends Component {

    constructor(props) {
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description20 mainArea={this.mainArea}></Description20>;
        this.next = <Description21 prev={<Slide20A></Slide20A>} next={<Slide21A mainArea={this.mainArea}></Slide21A>} mainArea={this.mainArea}></Description21>
        this.title = 'Konwencja zapisu i terminologia'
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

        this.inputString = React.createRef();

        this.state = {
            inputValue:'01',
            sliderPopSizeValue: Slide18A_SLIDER_POPSIZE_MIN_DEFAULT,
            sliderCodeLengthValue: Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT,
            individuals: [
                { LP: 1, Osobnik: '000' },
                { LP: 2, Osobnik: '001'},
                { LP: 3, Osobnik: '011' },
                { LP: 4, Osobnik: '010' },
                { LP: 5, Osobnik: '011'},
                { LP: 6, Osobnik: '100' },
                { LP: 7, Osobnik: '101'},
                { LP: 8, Osobnik: '110' },
                { LP: 9, Osobnik: '111'},
                { LP: 10, Osobnik: '000' },
            ],
            schemas: [
                { Schemat: '111'},
            ],
            schemasOnlyWithAsterisks: [
                { Schemat: '1*1'},
            ],
            filterSchemasChecked: false,
            generation: 0
        }


        this.generateAllPossibleSchemasStrings()
    }


    generateAllPossibleSchemasStrings() {
        var schema           = '';
        var alphabet       = this.state.inputValue + '*';

        Slide18A_allPossibleSchemasStrings = [];
        printAllKLength(alphabet,this.state.sliderCodeLengthValue)
        Slide18A_allPossibleSchemasStrings = [...new Set(Slide18A_allPossibleSchemasStrings)]

        // let maxcodelen = (this.state.inputValue.length + 1)**this.state.sliderCodeLengthValue
        // while (Slide18A_allPossibleSchemasStrings.length != maxcodelen) {
        //     for ( var i = 0; i < this.state.sliderCodeLengthValue; i++ ) {
        //         schema += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        //     }
        //     if (!Slide18A_allPossibleSchemasStrings.includes(schema)) {
        //         Slide18A_allPossibleSchemasStrings.push(schema)
        //     }
            
        //     schema = ''
        // }
    }
        
    filterSchemas = () => {
        this.setState({
            filterSchemasChecked: !this.state.filterSchemasChecked,
        });
    }

    disableOperatorsButtons() {
        
    }

    enableOperatorsButtons() {
        
    }

    onChangeSliderPopSize = (v) => {
        this.disableOperatorsButtons()

        this.setState({
            sliderPopSizeValue: v,
        });
        this.generateAllPossibleSchemasStrings()
    }

    onChangeSliderCodeLengthValue = (v) => {
        this.disableOperatorsButtons()

        this.setState({
            sliderCodeLengthValue: v,
        });
        this.generateAllPossibleSchemasStrings()
    }

    highlightIndividuals = (e) =>  {
        this.setState({
            individuals: this.state.individuals,
        });
    }


    computeSchemas = (tmpIndividuals) => {

        // let newSchemas = Slide18A_allPossibleSchemasStrings
        // printAllKLength(alphabet,this.state.sliderCodeLengthValue)
        // Slide18A_allPossibleSchemasStrings = [...new Set(Slide18A_allPossibleSchemasStrings)]
        let newSchemas = []
        let replacement = ''
        // console.log(tmpIndividuals)
        // szukanie ustalonych pozycji z lewej i prawej
        for (let i = 0; i < tmpIndividuals.length; ++i) {
            replacement = ''
            if (tmpIndividuals[i] && tmpIndividuals[i]['Osobnik'] && tmpIndividuals[i]['Osobnik'].length){
                for(let lengthofstar = 1; lengthofstar <= tmpIndividuals[i]['Osobnik'].length; ++lengthofstar ){
                    replacement += '*'
                    for(let charatof = 0; charatof < tmpIndividuals[i]['Osobnik'].length; ++charatof ){
                        if(charatof + lengthofstar <= tmpIndividuals[i]['Osobnik'].length){
                            newSchemas.push(tmpIndividuals[i]['Osobnik'].replaceAt(charatof, replacement));
                        }
                        // console.log(newSchemas)
                    }
                    
                }
            }
            
        }
        newSchemas = [...new Set(newSchemas)]
        // console.log(newSchemas)
        Slide18A_allPossibleSchemasStrings = newSchemas
        // console.log(newSchemas)
        // newSchemas.sort((a,b) => (a.Przystosowanie < b.Przystosowanie) ? 1 : ((b.Przystosowanie < a.Przystosowanie) ? -1 : 0))

        let sliderCodeLengthValue = this.state.sliderCodeLengthValue

        let tmpschemasOnlyWithAsterisks = newSchemas.filter(function(schema) {
            return schema.includes('*')  // usuniecie schematu *** samych gwiazdek
        });

        // newSchemas = newSchemas.filter(function(schema) {
        //     return schema !== '*'.repeat(sliderCodeLengthValue)  // usuniecie schematu *** samych gwiazdek
        // });

        let tmpnewschema = []
        for (let i = 0; i <newSchemas.length; ++i) {
            tmpnewschema.push({ LP: i+1, Schemat: newSchemas[i] })

            // while(tmpIndividuals[i]['Osobnik'].length < this.state.sliderCodeLengthValue) {
            //     tmpIndividuals[i]['Osobnik'] = "0" + tmpIndividuals[i]['Osobnik'] // dodanie leading zeros
            // }
        }
        // console.log("tmpnewschema")
        // console.log(tmpnewschema)
        this.setState({
            schemas: tmpnewschema,
            schemasOnlyWithAsterisks: tmpschemasOnlyWithAsterisks})
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
        if (this.state.inputValue ===''){
            return;
        }
        this.generateAllPossibleSchemasStrings()
        this.enableOperatorsButtons()
        let sliderCodeLengthValue = this.state.sliderCodeLengthValue
        let filteredwithoutstar = Slide18A_allPossibleSchemasStrings.filter(function(schema) {
            return !schema.includes('*')  // usuniecie schematu *** samych gwiazdek
        });
        
        // console.log(filteredwithoutstar)
        
        let tmpIndividuals = []
        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            tmpIndividuals.push({ LP: i+1, Osobnik: filteredwithoutstar[i] })

            // while(tmpIndividuals[i]['Osobnik'].length < this.state.sliderCodeLengthValue) {
            //     tmpIndividuals[i]['Osobnik'] = "0" + tmpIndividuals[i]['Osobnik'] // dodanie leading zeros
            // }
        }
        this.setState({individuals:tmpIndividuals})
        

        this.computeSchemas(tmpIndividuals)
        // this.clearRepresentants()

        // workaround na usuniecie smieci po poprzedniej populacji
        // tmpIndividuals = tmpIndividuals.filter(function(individual) {
        //     return individual.Osobnik.length == sliderCodeLengthValue
        // });

        // this.setState({individuals: tmpIndividuals.sort((a,b) => (a.Przystosowanie < b.Przystosowanie) ? 1 : ((b.Przystosowanie < a.Przystosowanie) ? -1 : 0)), generation: 0})
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
           const { LP, Osobnik } = individual //destructuring
           return (
            (LP == this.crossoverIndividualsIDs1.value || LP == this.crossoverIndividualsIDs2.value ?
              (<tr key={LP}>
                  <td style={{backgroundColor: "gray"}}>{LP}</td>
                <td><tt>{Osobnik}</tt></td>
                 {/* <td><tt>{Przystosowanie}</tt></td>
                 <td><tt>{(Procent * 100).toFixed(3)}</tt></td> */}
              </tr>)
              :
                (<tr key={LP}>
                <td>{LP}</td>
                <td><tt>{Osobnik}</tt></td>
                {/* <td><tt>{Przystosowanie}</tt></td>
                <td><tt>{(Procent * 100).toFixed(3)}</tt></td> */}
            </tr>))
           )
        })
     }

     renderSchemasTableData(array) {
        //  console.log(array)
        return array.map((schema, index) => {
           const { Schemat, Reprezentanci, Rozpietosc, Rzad } = schema //destructuring
           return (
              <tr key={Schemat}>
                 <td><tt>{index}</tt></td>
                 <td><tt>{Schemat}</tt></td>
                 {/* <td><tt>{Przystosowanie}</tt></td> */}
                 {/* <td>{Reprezentanci[Reprezentanci.length - 1]}</td>
                 <td>{Rozpietosc}</td>
                 <td>{Rzad}</td> */}
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
    changeValueInComponent = (evt) => {
        // console.log(Slide18A_allPossibleSchemasStrings)
        let value = evt.target.value;
        // value = value==='' || value.length < 2 ? '01*' : value;
        value = [...new Set(value)].join('');
        this.setState({inputValue:value})
        if (value !=='')
        {
            this.generateAllPossibleSchemasStrings()
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
                        <h4></h4>
                        <h4>alfabet k elementowy</h4>
                        <input ref = {this.inputString} style={{background:"black",fontSize:"30px" } } type={"text"} size={"50"} className="input_slide17A" value={this.state.inputValue} onChange={evt =>this.changeValueInComponent(evt)} ></input>
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
                        


                        {/* <div className="row-3">
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
                        </div> */}
                    </div>
                </div>




                <NavigationButtons
                    ref={this.navigationButtons}
                    mainArea={this.mainArea} 
                    prev={this.prev} 
                    next={this.next} 
                    currentSlideCounter={2} 
                    slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                    current={this}
                    onStartStop={this.handleStartStop}
                ></NavigationButtons>
            </div>
        )
    }
}

export default Slide20A

