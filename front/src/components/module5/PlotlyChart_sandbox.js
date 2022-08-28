import { Button, Checkbox } from "antd";
import React from "react";
import Plot from "react-plotly.js";
import MySlider from "../common/MySlider";
var nj = require('numjs');


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


class PlotlyChart_sandbox extends React.Component {

    constructor(props) {
        super(props)
        this.GRID_DENSITY = props.gridDensity
        this.simulationRunning = false
        this.state = {
            data: this.generateData(),
            squareArea: areaPoints,
            numOfObjects : 5,// aktualna wielkosc populacji
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
            sukcesjaElitarna: true, //checkbox rodzaju selekcji
            GsukcesjiElitarnej: 0.5, //współczynnik selekcji
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
        while(binaryValue.length <= 10){
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
        return [newOb1, newOb2]
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
            let min = 0
            let max = 10
            // [min, max)
            let random_point = Math.floor(Math.random() * (max - min)) + min;
            x = this.mutateDec(x, random_point)
        }
        random_mutation = Math.random()
        if(random_mutation < this.state.sliderPopSizeValuePMutation ){
            let min = 0
            let max = 10
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
            let min = 0
            let max = 10
            // [min, max)
            let random_point = Math.floor(Math.random() * (max - min)) + min;
            ob12_listX = this.krzyzowanieJednopunktBin(this.dec2bin(ob1X), this.dec2bin(ob2X), random_point)
        }
        random_cross = Math.random()
        if(random_cross < this.state.sliderPopSizeValuePKrzyzowanie ){
            let min = 0
            let max = 10
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

    generateData = (dataFunction3d = 'Rastrigin') => {
        this.setDefaultGlobalVariables()

        let genRastriginsFunc = (x, y) => 10 * 2 + x*x + y*y - 10 * Math.cos(2*Math.PI*x)  - 10 * Math.cos(2*Math.PI*y)
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

                if (dataFunction3d === 'Rastrigin') {
                    // computedValue = saddleFormula(xxx, yyy)
                    computedValue = genRastriginsFunc(xxx, yyy)
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

    findFourPointsOfCenter = (x, y) => { // zwraca punkty, ktore tworza obszar o danym srodku w punkcie x,y
        let points = [
            [Math.abs(Math.round(x + 0.5)), Math.abs(Math.round(y + 0.5))],
            [Math.abs(Math.round(x - 0.5)), Math.abs(Math.round(y + 0.5))],
            [Math.abs(Math.round(x + 0.5)), Math.abs(Math.round(y - 0.5))],
            [Math.abs(Math.round(x - 0.5)), Math.abs(Math.round(y - 0.5))],
        ]
        // console.log('findFourPointsOfCenter:', points)
        return points
    }
    onChangePopSizeAmountObj = (v) => {
        // this.disableOperatorsButtons()

        this.setState({
            numOfObjects: v,
        });
    }


    sukcesjaElitarnaCheckbox_onChange = (e) => {
        this.setState({
            sukcesjaElitarna: !this.state.sukcesjaElitarna
        })
    }

    onChangeSliderGElite = (v) =>{
        this.setState({
            GsukcesjiElitarnej: v
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
            }, 100);
        }
    }

    evolution = () => {
        if(currentGenerationsCount<100){
            //selekcja
            //wybrac temp population - najmocniejszych - sortowanie i wywalenie najslabszych paru

            //potem metoda ruletki - sposob z LAB - posortowac temp z, nastepnie gdy jest jedno ponad 
            //wylosowane ponad, to jest to


            //krzyzowanie
            //krzyzowanie najmocniejszych obok siebie



            //mutacja
            //ew mutacje


            // console.log(currentGenerationsCount++)
        // console.log(this.state.gen_num)
        // this.setState({gen_num: this.state.gen_num + 1})


        // reproduction
        // var newX = []
        // var newY = []
        // var newZ = []
        // for (let i = 0; i < newPopulationIfKilled.length; i++) {
        //     if (newPopulationIfKilled[i] == false) {
        //         newX.push(xxx[i])
        //         newY.push(yyy[i])
        //         newZ.push(rastrigin(xxx[i], yyy[i]))
        //     }
        // }

        // newPopulationIfKilled = []
        // for (let i = 0; i < newX.length; i++) {
        //     newPopulationIfKilled.push(false)
        // }

        // this.setState(prevState => ({
        //     populationXcoord: newX,
        //     populationYcoord: newY,
        //     populationZcoord: newZ,
        //     populationIfKilled: newPopulationIfKilled,
        // }))
        }
        else{
            this.onSimulationEnd()
        }
    }

    onSimulationEnd = () => {
        this.handleStartStop(true)
        this.navigationButtons.current.enableNavigationButtons()
    }

    render() {
        const CHART_MARGIN = 5

        return (
        <div> 
            <div>
            <Button type="primary" onClick={() => this.generateRandomObjects()}>Generuj populację</Button>
            </div> 
            
            <div>
            <MySlider min={0} max={30} defaultValue={5} sliderSize={4} step={1} ref={this.sliderPopSizeObj} text={"Ilość populacji"} passValueToParent={this.onChangePopSizeAmountObj}></MySlider>   
            </div>
            <div>
            <MySlider min={0} max={1} defaultValue={0.5} sliderSize={4} step={0.1} ref={this.sliderPopSizePT} text={"Prawdopodobnieństwo mutacji"} passValueToParent={this.onChangeProbabilityMutation}></MySlider>
            </div>
            <div>
            <MySlider min={0} max={1} defaultValue={0.5} sliderSize={4} step={0.1} ref={this.sliderPopSizePCross} text={"Prawdopobieństwo krzyżowania"} passValueToParent={this.onChangeProbabilityKrzyzowanie}></MySlider>
            </div>
            <div>
            <Checkbox onChange={this.sukcesjaElitarnaCheckbox_onChange} style={{color:'white'}} defaultChecked={true} >Metoda selekcji - sukcesja elitarna</Checkbox>
            </div>
            {this.state.sukcesjaElitarna?
            <div>
            <MySlider min={0} max={1} defaultValue={0.5} sliderSize={4} step={0.1} ref={this.sliderGElite} text={"Współczynnik sukcesji elitarnej"} passValueToParent={this.onChangeSliderGElite}></MySlider>
            </div>
            :
            <div/>
            }
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
                    opacity: 1
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
                        aspectratio: {
                            x: 1,
                            y: 1,
                            z: 1
                        },
                        camera: {
                            center: {
                                x: 0,
                                y: 0,
                                z: 0
                            },
                            eye: {
                                x: 1.25,
                                y: 1.25,
                                z: 1.25
                            },
                            up: {
                                x: 0,
                                y: 0,
                                z: 1
                            }
                        },
                    }

                }}
            />
        </div>  
        );
    }
}

export default PlotlyChart_sandbox;