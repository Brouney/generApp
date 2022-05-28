import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_3_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide33A from "./Slide33A";
import Slide31A from "./Slide31A";
import MySlider from "../common/MySlider";

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
const Slide18A_SLIDER_POPSIZE_MIN_DEFAULT = 10
const Slide18A_SLIDER_POPSIZE_MAX_DEFAULT = 100
const Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT = 4
const Slide18A_SLIDER_CODELENGTH_MAX_DEFAULT = 6

var Slide18A_allPossibleSchemasStrings = [];
var Slide18A_plotData = [];
class Slide32A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide31A mainArea={this.mainArea}></Slide31A>;
        this.next = <Slide33A prev={<Slide31A></Slide31A>} mainArea={this.mainArea}></Slide33A>
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
        this.inputGValue = React.createRef();
        this.state = {
            inputValue:'013',
            inputGValue:'0.0',
            sliderPopSizeValue: Slide18A_SLIDER_POPSIZE_MIN_DEFAULT,
            sliderCodeLengthValue: Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT,
            individuals: [
                { LP: 1, Osobnik: '0000', Przystosowanie: 0.0 },
               
            ],
            schemas: [
                { LP: 1, Osobnik: '0000', Przystosowanie: 0.0 },
            ],
            schemasOnlyWithAsterisks: [
                { LP: 1, Osobnik: '****', Przystosowanie: 0.0 },
            ],
            schemasFinal: [
                { LP: 1, Osobnik: '****', Przystosowanie: 0.0 },
            ],
            filterSchemasChecked: false,
            generation: 0
        }


        this.generateAllPossibleSchemasStrings()
    }
    
    generateAllPossibleSchemasStrings() {
        var schema           = '';
        var alphabet       = this.state.inputValue;

        Slide18A_allPossibleSchemasStrings = [];
        printAllKLength(alphabet,this.state.sliderCodeLengthValue)
        Slide18A_allPossibleSchemasStrings = [...new Set(Slide18A_allPossibleSchemasStrings)]


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

        let newSchemas = []
        let replacement = ''
        console.log(tmpIndividuals.length)
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
        Slide18A_allPossibleSchemasStrings = newSchemas

        let sliderCodeLengthValue = this.state.sliderCodeLengthValue

        let tmpschemasOnlyWithAsterisks = newSchemas.filter(function(schema) {
            return schema.includes('*')  // usuniecie schematu *** samych gwiazdek
        });
        tmpschemasOnlyWithAsterisks = tmpschemasOnlyWithAsterisks.splice(this.state.sliderPopSizeValue)
        // console.log(tmpschemasOnlyWithAsterisks)
        let tmpnewschema = []
        for (let i = 0; i <newSchemas.length; ++i) {
            tmpnewschema.push({ LP: i+1, Schemat: newSchemas[i] })

        }
        // tutaj taki maly algorytm -> jezeli jest gwiazdka, to doliczamy 2x jej wartosc int z chara
        let tmpschemasasterix = []
        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            let przystosowanieSum = 0;
            for (let obj of tmpschemasOnlyWithAsterisks[i].split("")) {
                przystosowanieSum += obj.charCodeAt(0);
                if(obj==='*'){
                    przystosowanieSum += obj.charCodeAt(0);
                }
            }
            if(tmpschemasOnlyWithAsterisks[i] * 1){
                przystosowanieSum += tmpschemasOnlyWithAsterisks[i] * 1
            }
            tmpschemasasterix.push({ LP: i+1, Osobnik: tmpschemasOnlyWithAsterisks[i], Przystosowanie: przystosowanieSum})

        }
        this.setState({
            schemas: tmpnewschema,
            schemasOnlyWithAsterisks: tmpschemasasterix})
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
        
        
        let tmpIndividuals = []
        for (let i = 0; i < this.state.sliderPopSizeValue; ++i) {
            let przystosowanieSum = 0;
            for (let obj of filteredwithoutstar[i].split("")) {
                przystosowanieSum += obj.charCodeAt(0);
            }
            if(filteredwithoutstar[i] * 1){
                przystosowanieSum += filteredwithoutstar[i] * 1
            }
            tmpIndividuals.push({ LP: i+1, Osobnik: filteredwithoutstar[i], Przystosowanie: przystosowanieSum})

        }
        this.setState({individuals:tmpIndividuals})
        

        this.computeSchemas(tmpIndividuals)
    }

    renderCrossoverIDs = () => {
        return this.state.individuals.map((individual, index) => {
            const { LP } = individual //destructuring
            return (
                <option value={LP}>{LP}</option>
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
            
           const { LP, Osobnik, Przystosowanie } = individual //destructuring
           return (
            (LP == this.crossoverIndividualsIDs1.value || LP == this.crossoverIndividualsIDs2.value ?
              (<tr key={LP}>
                  <td style={{backgroundColor: "gray"}}>{index}</td>
                <td><tt>{Osobnik}</tt></td>
                <td><tt>{Przystosowanie}</tt></td>
              </tr>)
              :
                (<tr key={LP}>
                <td>{index}</td>
                <td><tt>{Osobnik}</tt></td>
                <td><tt>{Przystosowanie}</tt></td>
            </tr>))
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
    changeValueInComponentG = (evt) => {
        let value = evt.target.value;
        value = parseFloat(value)
        this.setState({inputGValue:value})
        if (value !=='')
        {
            this.generateAllPossibleSchemasStrings()
        }
    }
    generateFinalPopulationElite = () => {

        let numberToDelete = Math.round(this.state.individuals.length * (1 - this.state.inputGValue))
        
        let sortedPopulation1 = this.state.individuals
        sortedPopulation1.sort( function(a,b) {
            return a.Przystosowanie - b.Przystosowanie
        })
        let sortedPopulation2 = this.state.schemasOnlyWithAsterisks
        sortedPopulation2.sort( function(a,b) {
            return a.Przystosowanie - b.Przystosowanie
        })
        let finalPopulation = []
        if(numberToDelete>0.0){
            for(let i = sortedPopulation2.length-1;i>(sortedPopulation2.length -1 - numberToDelete);--i){
               
                finalPopulation.push(sortedPopulation2[i])
            } 
        }
        for(let i = sortedPopulation1.length-1;i>numberToDelete-1;--i){
            finalPopulation.push(sortedPopulation1[i])
        }
        finalPopulation.sort( function(a,b) {
            return a.Przystosowanie - b.Przystosowanie
        })
        this.setState({
            schemasFinal : finalPopulation
        })


    }

    generateRandomIntegerInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateFinalPopulationRandom = () => {

        let numberToDelete = Math.round(this.state.individuals.length * (1 - this.state.inputGValue))
        
        let sortedPopulation1 = this.state.individuals
       
        let sortedPopulation2 = this.state.schemasOnlyWithAsterisks
       
        let finalPopulation = []
        if(numberToDelete>0.0){
            for(let i = sortedPopulation2.length-1;i>(sortedPopulation2.length -1 - numberToDelete);--i){
               
                finalPopulation.push(sortedPopulation2[i])
            } 
        }

        for(let i = sortedPopulation1.length-1;i>numberToDelete-1;--i){
            finalPopulation.push(sortedPopulation1[i])
        }
       
        this.setState({
            schemasFinal : finalPopulation
        })


    }
    render(){
        
        return(
        <div>
            <h1>Sukcesja z częściowym zastępowaniem</h1>
                <h1>{this.title}</h1>
                <div className="row">
                    <div className="col-8">
                        <MySlider min={Slide18A_SLIDER_POPSIZE_MIN_DEFAULT} max={Slide18A_SLIDER_POPSIZE_MAX_DEFAULT} defaultValue={Slide18A_SLIDER_POPSIZE_MIN_DEFAULT} sliderSize={4} step={1} ref={this.sliderPopSize} text={"Liczebność populacji"} passValueToParent={this.onChangeSliderPopSize}></MySlider>
                        <MySlider min={Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT} max={Slide18A_SLIDER_CODELENGTH_MAX_DEFAULT} defaultValue={Slide18A_SLIDER_CODELENGTH_MIN_DEFAULT} sliderSize={4} step={1} ref={this.sliderCodeLength} text={"Długość ciągu kodowego"} passValueToParent={this.onChangeSliderCodeLengthValue}></MySlider>
                        <h4></h4>
                        <h4>alfabet k elementowy</h4>
                        <input ref = {this.inputString} style={{background:"black",fontSize:"30px" } } type={"text"} size={"50"} className="input_slide17A" value={this.state.inputValue} onChange={evt =>this.changeValueInComponent(evt)} ></input>
                        <h4>Współczynnik G wartosci 0-1</h4>
                        <input ref = {this.inputGValue} style={{background:"black",fontSize:"30px" } } type={"text"} size={"50"} className="input_slide17A" value={this.state.inputGValue} onChange={evt =>this.changeValueInComponentG(evt)} ></input>
                    </div>

                    <div className="col-4">
                        <button ref={ref => this.generateButton = ref} type="submit" className="btn btn-primary" onClick={this.generatePopulationAndSchemas}>Wygeneruj populacje</button>
                        <button ref={ref => this.generateButton = ref} type="submit" className="btn btn-primary" onClick={this.generateFinalPopulationElite}>Wygeneruj populację końcową - sukcesja elitarna</button>
                        <button ref={ref => this.generateButton = ref} type="submit" className="btn btn-primary" onClick={this.generateFinalPopulationRandom}>Wygeneruj populację końcową - losowo</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2"><h3 style={{textAlign: "left"}}>POPULACJA 1 </h3></div>
                    <div className="col-3"><h3 style={{textAlign: "right"}}>POPULACJA 2</h3></div>
                    <div className="col-4"><h3 style={{textAlign: "right"}}>POPULACJA KOŃCOWA</h3></div>
                    
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
                                <tr>{this.renderTableHeader(this.state.individuals)}</tr>
                            </thead>
                            <tbody>
                                {
                                this.renderIndividualTableData(this.state.schemasOnlyWithAsterisks)  
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-5 tableFixHead">
                        <table id='individuals'>
                            <thead>
                                <tr>{this.renderTableHeader(this.state.individuals)}</tr>
                            </thead>
                            <tbody>
                                {
                                this.renderIndividualTableData(this.state.schemasFinal)  
                                }
                            </tbody>
                        </table>
                    </div>            
                    
                </div>
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_3_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide32A;