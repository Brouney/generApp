import { Button, Checkbox, Select } from "antd";
import React from "react";
import Plot from "react-plotly.js";
import MySlider from "../common/MySlider";
var nj = require('numjs');

const { Option } = Select;

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const graphData = {
  masterGraph: {
    xAxis: "X-Axis",
    yAxis: "Y-Axis",
    zAxis: "Z-Axis"
  }
};

var currentGenerationsCount = 0
const GRID_DISTANCE_BETWEEN_POINTS = 0.5
const SQUARE_CENTER_POSITION_DEFAULT = [5.5, 5.5] // chcac miec obszar najpierw na srodku, trzeba to ustawic (props.gridDensity / 2)
const AREA_POINTS_DEFAULT = [[5,5],[5,6],[6,5],[6,6]]

export let squareCenterPosition = SQUARE_CENTER_POSITION_DEFAULT      // punkt X,Y - srodek obszaru, ktory bladzi po wykresie szukajac ekstremum
export let areaPoints = AREA_POINTS_DEFAULT // obszar, ktory bladzi po wykresie szukajac ekstremum
export let maximum = -9999

var genfunctions = {
    rastrigin: true,
    bukin: false,
    goldstein_price: false
}
class PlotlyChart_sandbox extends React.Component {

    constructor(props) {
        super(props)
        this.GRID_DENSITY = 128
        this.simulationRunning = false
        this.state = {
            data: this.generateData(),
            squareArea: areaPoints,
            numOfObjects : 15,// aktualna wielkosc populacji
            objectsPoints: {
                x:[],
                y:[],
                z:[],
            },
            
            sliderPopSizeValuePMutation: 0.5,//prawd mutacji 
            sliderPopSizeValuePKrzyzowanie: 0.5,// prawdopodobienstwo krzyzowania 
            gen_num: 0,  // numeruje kolejne pokolenia                                                           
            sum_fitness: 0, // suma funkcji dostosowania wszystkich osobnikow, potrzebna przy selekcji do nowej populacji

            // Dwie zmienne ponizej, nie sa potrzebne do pracy programu. Moga sie jednak przydac podczas debugowania.
            n_mutation: 0,  // liczba mutacji w ostatnim pokoleniu                    
            n_cross: 0,    // liczba krzyz
            eliteSuccession: true, //checkbox rodzaju selekcji
            rouletteSuccession: false,
            GEliteSuccession: 0.5, //współczynnik selekcji
            timerID: null,
        }
        this.sliderPopSize = React.createRef()
        this.sliderPopSizeObj = React.createRef()
        this.generateData = this.generateData.bind(this);
        // this.evolution = this.evolution.bind(this);
        // this.moveSquareOnChartTowardsExtremum = this.moveSquareOnChartTowardsExtremum.bind(this);
    }



    //zwraca wartość binarna z liczby
    dec2bin = (dec) => {
        let binaryValue = (dec >>> 0).toString(2);
        while(binaryValue.length <= 7){
            binaryValue = '0' + binaryValue
        }
        return binaryValue
    }
    //zwaraca wartosc decymalną z binarnej
    bin2dec = (bin) => {
       return parseInt(bin, 2);
    }

    mutateDec = (dec, punkt) => {
        let bin = this.dec2bin(dec)
        let pojedynczyChar = bin.charAt(punkt)
        bin = bin.replaceAt(punkt, pojedynczyChar == '1'?  '0': '1')
        return this.bin2dec(bin)
    }
    mutateBin = (bin, punkt) => {
        let pojedynczyChar = bin.charAt(punkt)
        bin = bin.replaceAt(punkt, pojedynczyChar == '1'?  '0': '1')
        return this.bin2dec(bin)
    }

    krzyzowanieJednopunktBin = (ob1, ob2, punkt) => {
        let newOb1 = ob1.slice(0, punkt) + ob2.slice(punkt, ob1.length)
        let newOb2 = ob2.slice(0, punkt) + ob1.slice(punkt, ob1.length)
        return [this.bin2dec(newOb1), this.bin2dec(newOb2)]
    }

    onChangeProbabilityMutation = (v) => {
        // this.disableOperatorsButtons()

        this.setState({
            sliderPopSizeValuePMutation: v,
        });
    }

    //x y dec
    mutation = (x, y) => {
        let random_mutation = Math.random()
        if(random_mutation < this.state.sliderPopSizeValuePMutation ){
            let min = 1
            let max = 8
            // [min, max)
            let random_point = Math.floor(Math.random() * (max - min)) + min;
            x = this.mutateDec(x, random_point)
        }
        random_mutation = Math.random()
        if(random_mutation < this.state.sliderPopSizeValuePMutation ){
            let min = 1
            let max = 8
            // [min, max)
            let random_point = Math.floor(Math.random() * (max - min)) + min;
            y = this.mutateDec(y, random_point)
        }
        
        return [x, y]
    }

    cross_over = (ob1X, ob1Y, ob2X, ob2Y) => {
        let random_cross = Math.random()
        let ob12_listX = [ob1X, ob2X]
        let ob12_listY = [ob1Y, ob2Y]
        if(random_cross < this.state.sliderPopSizeValuePKrzyzowanie ){
            let min = 1
            let max = 8
            // [min, max)
            let random_point = Math.floor(Math.random() * (max - min)) + min;
            ob12_listX = this.krzyzowanieJednopunktBin(this.dec2bin(ob1X), this.dec2bin(ob2X), random_point)
        }
        random_cross = Math.random()
        if(random_cross < this.state.sliderPopSizeValuePKrzyzowanie ){
            let min = 1
            let max = 8
            // [min, max)
            let random_point = Math.floor(Math.random() * (max - min)) + min;
            ob12_listY = this.krzyzowanieJednopunktBin(this.dec2bin(ob1Y), this.dec2bin(ob2Y), random_point)
        }
        return [ob12_listX, ob12_listY]
    }


    onChangeProbabilityKrzyzowanie = (v) => {
        // this.disableOperatorsButtons()

        this.setState({
            sliderPopSizeValuePKrzyzowanie: v,
        });
    }

    setDefaultGlobalVariables() {
        let minValue = Math.ceil(2)
        let maxValue = Math.floor(this.GRID_DENSITY - 1)
        let randValue = Math.floor(Math.random() * (maxValue - minValue)) + minValue

        // squareCenterPosition = SQUARE_CENTER_POSITION_DEFAULT
        // areaPoints = AREA_POINTS_DEFAULT
        // maximum = -9999
        squareCenterPosition = [randValue + 0.5, randValue + 0.5]
        areaPoints = [[randValue, randValue],[randValue, randValue+1],[randValue+1, randValue],[randValue+1,randValue+1]]
        maximum = -9999
    }

    componentWillUnmount() { // ustawienie defaultowych zmiennych globalnych po przejsciu na inny slajd
        this.setDefaultGlobalVariables()
    }

    genRastriginsFunc = (x, y) => { return 10 * 2 + x*x + y*y - 10 * Math.cos(2*Math.PI*x)  - 10 * Math.cos(2*Math.PI*y)}

    // genbukinFunc = (x, y) => {return Math.pow(1.5 - x + x*y,2) + Math.pow(2.25 - x + x*y*y, 2) + Math.pow(2.625 - x + x*y*y*y,2) } 
    genbukinFunc = (x, y) => {return 100*Math.sqrt(Math.abs(y-0.01*x*x))+0.01*Math.abs(x+10) } 

    genGoldstein_Price = (X, Y) => {return (1+(X+Y+1)**2*(19-14*X+3*X**2-14*Y+6*X*Y+3*Y**2))*(30+(2*X-3*Y)**2*(18-32*X+12*X**2+48*Y-36*X*Y+27*Y**2))}

    generateData = (dataFunction3d = 'Rastrigin') => {
        this.setDefaultGlobalVariables()
        // let genRastriginsFunc = (x, y) => 10 * 2 + x*x + y*y - 10 * Math.cos(2*Math.PI*x)  - 10 * Math.cos(2*Math.PI*y)
        let xymin = -5.12
        let xymax = 5.12
        let dis = (xymax - xymin )/this.GRID_DENSITY
        let values = nj.arange(xymin, xymax, dis)
        //siatka
        var randomNumbers = Array.from(Array(this.GRID_DENSITY), () => new Array(this.GRID_DENSITY*this.GRID_DENSITY))
        for (let x = 0; x < this.GRID_DENSITY; x++) {
            for (let y = 0; y < this.GRID_DENSITY ; y++) {
                // let yyy = y - this.GRID_DENSITY / 2
                // let xxx = x - this.GRID_DENSITY / 2
                let yyy = values.get(x)
                let xxx = values.get(y)
                let computedValue

                if (genfunctions.rastrigin === true) {
                    // computedValue = saddleFormula(xxx, yyy)
                    computedValue = this.genRastriginsFunc(xxx, yyy)
                }
                else if (genfunctions.bukin === true) {
                    // computedValue = saddleFormula(xxx, yyy)
                    computedValue = this.genbukinFunc(xxx, yyy)
                }
                else if(genfunctions.goldstein_price ===true){
                    computedValue = this.genGoldstein_Price(xxx, yyy)
                }
                // else if (dataFunction3d === 'paraboloid') {
                //     computedValue = paraboloidFormula(xxx, yyy)
                // }

                randomNumbers[x][y] = computedValue
            }
        }
        this.setState({ data: randomNumbers })
        return randomNumbers
    }
    generateRandomObjects = () => {
        currentGenerationsCount = 0
        //generowanie punktów na funkcji
        let newObjectsX = []
        let newObjectsY = []
        let newObjectsZ = []

        for (let i = 0; i<this.state.numOfObjects; i++){
            let randomX = Math.floor(Math.random() * (this.GRID_DENSITY - 0 + 1)) + 0
            let randomY = Math.floor(Math.random() * (this.GRID_DENSITY - 0 + 1)) + 0
            let randomZ = this.state.data[randomX][randomY]

            newObjectsX.push(randomX)
            newObjectsY.push(randomY)
            newObjectsZ.push(randomZ)
  
        }
        this.setState({
            objectsPoints: {
                x: [...newObjectsX],
                y: [...newObjectsY],
                z: [...newObjectsZ],
            }
        })
    }


    onChangePopSizeAmountObj = (v) => {
        // this.disableOperatorsButtons()

        this.setState({
            numOfObjects: v,
        });
    }


    sukcesja_onChange = (e) => {
        if(e === "Sukcesja_elitarna")
        this.setState({
            eliteSuccession: true,
            rouletteSuccession: false
        })
        else{
            this.setState({
                eliteSuccession: false,
                rouletteSuccession: true
            })
        }
    }

    onChangeSliderGElite = (v) =>{
        this.setState({
            GEliteSuccession: v
        })

    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            clearInterval(this.timerId)
        }
        else {
            console.log("START")
            this.timerId = setInterval(() => {
                this.evolution()
            }, 10);
        }
    }

    sortNum = (a, b) => {
        return a - b;
    }

    evolution = () => {
        if(currentGenerationsCount<100){
            //selekcja - elitarna - czesciowe zastepowanie
            let temp_pop = []

            //przypisanie odpowiednich przystosowan, posortowanie i odrzucenie najmniejszych
            let old_adaptation = this.state.objectsPoints.z
            let old_sorted = old_adaptation.sort(this.sortNum)

            if(this.eliteSuccession){
                old_adaptation = old_sorted.slice( Math.floor(this.state.GEliteSuccession * old_sorted.length),
                old_sorted.length)
                //wybrac temp population - najmocniejszych - sortowanie i wywalenie najslabszych paru
                
                for(let el of old_adaptation){
                    let index_z = this.state.objectsPoints.z.findIndex(element => element === el)
                    temp_pop.push([this.state.objectsPoints.x[index_z], this.state.objectsPoints.y[index_z]])
                }
            }
            else{
                let prop_sum = 0
                let propabilities = []
                for(let el of old_sorted){
                    prop_sum += el
                }
                for(let el of old_sorted){
                    propabilities.push(el/prop_sum)
                }
                
                for(let i = 0; i<old_sorted.length;i++){
                    let ran =  Math.floor(Math.random() * (100 - 0 + 1) ) + 0;
                    for(let j = 0; j<old_sorted.length;j++){
                        if(propabilities[j] > ran){
                            let index_z = this.state.objectsPoints.z.findIndex(element => element === old_sorted[j])
                            temp_pop.push([this.state.objectsPoints.x[index_z], this.state.objectsPoints.y[index_z]])
                            break;
                        }
                        if(j === (old_sorted.length-1) ){
                            let index_z = this.state.objectsPoints.z.findIndex(element => element === old_sorted[j])
                            temp_pop.push([this.state.objectsPoints.x[index_z], this.state.objectsPoints.y[index_z]])
                        }
                    }
                }
                    
            }


            //potem metoda ruletki - sposob z LAB - posortowac temp z, nastepnie gdy jest jedno  
            //wylosowane ponad, to jest to
            

            //krzyzowanie
            //krzyzowanie najmocniejszych obok siebie
            for (let i=0; i<temp_pop.length && (i+1)<temp_pop.length; i=i+2){
                let crossed_elements = this.cross_over(temp_pop[i][0],temp_pop[i][1],temp_pop[i+1][0],temp_pop[i+1][1])
                temp_pop[i][0] = crossed_elements[0][0]
                temp_pop[i][1] = crossed_elements[0][1]
                temp_pop[i+1][0] = crossed_elements[1][0]
                temp_pop[i+1][1] = crossed_elements[1][1]
            }       
             //mutacja
            //ew mutacje
            for(let i = 0; i < temp_pop.length; ++i){
                let mutated = this.mutation(temp_pop[i][0], temp_pop[i][1])
                temp_pop[i][0] = mutated[0]
                temp_pop[i][1] = mutated[1]
            }
            
            //dodanie najlepszych bez krzyzowania obiektow ze starej populacji
            if(this.eliteSuccession){
                for(let el = 0; el< Math.floor(this.state.GEliteSuccession * this.state.objectsPoints.z.length); ++el){
                    let index_z = this.state.objectsPoints.z.findIndex(element => element === old_sorted[old_sorted.length - el - 1])
                    temp_pop.push([this.state.objectsPoints.x[index_z], this.state.objectsPoints.y[index_z]])
                }
            }
           


            // console.log(currentGenerationsCount++)
        // console.log(this.state.gen_num)
        // this.setState({gen_num: this.state.gen_num + 1})

        let xymin = -5.12
        let xymax = 5.12
        let dis = (xymax - xymin )/this.GRID_DENSITY
        let values = nj.arange(xymin, xymax, dis)
        // reproduction
        var newX = []
        var newY = []
        var newZ = []
        for (let i = 0; i <temp_pop.length; i++) {
            newX.push(temp_pop[i][0])
            newY.push(temp_pop[i][1])
            if (genfunctions.rastrigin) {
                newZ.push(this.genRastriginsFunc(values.get(temp_pop[i][0]), values.get(temp_pop[i][1])))
            }
            else if (genfunctions.bukin) {
                newZ.push(this.genbukinFunc(values.get(temp_pop[i][0]), values.get(temp_pop[i][1]))) 
            }
            else if(genfunctions.goldstein_price){
                newZ.push(this.genGoldstein_Price(values.get(temp_pop[i][0]), values.get(temp_pop[i][1]))) 
            }
            
        }

        // console.log(newX,newY,newZ )
        this.setState(prevState => ({
            objectsPoints: {
                x: [...newX],
                y: [...newY],
                z: [...newZ],
            }
        }))
        currentGenerationsCount++
        }
        else{
            this.onSimulationEnd()
        }
    }

    onSimulationEnd = () => {
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
    }

    function_select = (v) => {
        if(v === "Rastrigin"){
            genfunctions.rastrigin = true;
            genfunctions.bukin = false;
            genfunctions.goldstein_price = false;
            
        }
        if(v === "bukin"){
            genfunctions.rastrigin = false;
            genfunctions.bukin = true;
            genfunctions.goldstein_price = false;
        }
        if(v === "Goldstein"){
            genfunctions.rastrigin = false;
            genfunctions.bukin = false;
            genfunctions.goldstein_price = true;
        }
        this.setState({
            data: this.generateData()
        })
    }
    render() {
        const CHART_MARGIN = 5

        return (
        <div className="row" >
            <div className="col-7">
                <div>
                <Button type="primary" onClick={() => this.generateRandomObjects()}>Generuj populację</Button>
                </div> 
                
                <div>
                <MySlider min={0} max={40} defaultValue={15} sliderSize={4} step={1} ref={this.sliderPopSizeObj} text={"Ilość populacji"} passValueToParent={this.onChangePopSizeAmountObj}></MySlider>   
                </div>
                <div>
                <MySlider min={0} max={1} defaultValue={0.5} sliderSize={4} step={0.1} ref={this.sliderPopSizePT} text={"Prawdo-\npodobnieństwo mutacji"} passValueToParent={this.onChangeProbabilityMutation}></MySlider>
                </div>
                <div>
                <MySlider min={0} max={1} defaultValue={0.5} sliderSize={4} step={0.1} ref={this.sliderPopSizePCross} text={"Prawdo-\npobieństwo krzyżowania"} passValueToParent={this.onChangeProbabilityKrzyzowanie}></MySlider>
                </div>
                <div>
                    <Select
                        defaultValue="Rastrigin"
                        style={{
                            width: 220,
                        }}
                        onChange={this.function_select}
                        >
                        <Option value="Rastrigin">Rastrigin</Option>
                        <Option value="bukin">Bukin</Option>
                        <Option value="Goldstein" >
                            Goldstein - Price
                        </Option>
                    </Select>           
                </div>
                <div>
                    <Select
                        defaultValue="Sukcesja_elitarna"
                        style={{
                            width: 220,
                        }}
                        onChange={this.sukcesja_onChange}
                        >
                        <Option value="Sukcesja_elitarna">Sukcesja elitarna</Option>
                        <Option value="Sukcesja_ruletkowa">Sukcesja ruletkowa</Option>
                        
                    </Select>           
                </div>
                
                
                {this.state.eliteSuccession?
                    <div>
                    <MySlider min={0} max={1} defaultValue={0.5} sliderSize={4} step={0.1} ref={this.sliderGElite} text={"Współczynnik sukcesji elitarnej"} passValueToParent={this.onChangeSliderGElite}></MySlider>
                    </div>
                    :
                    <div/>
                    
                }
                <h3>
                    Pokolenie: {currentGenerationsCount}
                </h3>
            </div> 
            <div className="col-4">
                <Plot
                    data={[
                    {
                        type: "surface",
                        name: '3D',
                        z: this.state.data,
                        showscale: false,
                    },
                    {
                        x: [...this.state.objectsPoints.x],
                        y: [...this.state.objectsPoints.y],
                        z: [...this.state.objectsPoints.z],
                        mode: 'markers',
                        type: 'scatter3d',
                        name: "obiekty",
                        marker: {
                            color: 'yellow',
                            size: 8,
                            line: {
                                color: 'rgb(204, 204, 204)',
                                width: 1},
                            // opacity: 1
                        }
                    },
                    ]}
                    config={{
                        'displayModeBar': false, // wylaczenie kontrolek Plotly
                        "scrollZoom": false      // wylaczenie zoomowania wykresu rolka myszki
                    }}
                    layout={{
                        width: '100%',
                        height: '100%',
                        title: this.props.title,
                        paper_bgcolor: '#d3d3d3',
                        plot_bgcolor: '#343a40',
                        xaxis: {
                            showgrid: false,
                            // zeroline: False
                            visible: false
                        },
                        yaxis: {
                            showgrid: false,
                            // zeroline: False
                            visible: false
                        },
                        margin: {
                            l: CHART_MARGIN,
                            r: CHART_MARGIN,
                            b: CHART_MARGIN,
                            t: CHART_MARGIN * 8,
                            pad: 4
                        },
                        autosize: true,
                        scene: {
                            
                            camera: {
                                
                                eye: {
                                    x: 0,
                                    y: 0,
                                    z: 2
                                },
                                
                            },
                        }

                    }}
                />
            </div>
        </div>  
        );
    }
}

export default PlotlyChart_sandbox;