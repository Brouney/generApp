import { Button } from "antd";
import React from "react";
import Plot from "react-plotly.js";
import MySlider from "../common/MySlider";
var nj = require('numjs');

const graphData = {
  masterGraph: {
    xAxis: "X-Axis",
    yAxis: "Y-Axis",
    zAxis: "Z-Axis"
  }
};

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

        this.state = {
            data: this.generateData(),
            squareArea: areaPoints,
            numOfObjects : 5,
            objectsPoints: {
                x:[],
                y:[],
                z:[],
            },
            sliderPopSizeValuePT: 0.5,
            sliderPopSizeValuePCross: 0.5
        }
        this.sliderPopSize = React.createRef()
        
        this.generateData = this.generateData.bind(this);
        this.moveSquareOnChartTowardsExtremum = this.moveSquareOnChartTowardsExtremum.bind(this);
    }

    onChangeSliderPopSizePT = (v) => {
        // this.disableOperatorsButtons()

        this.setState({
            sliderPopSizeValuePT: v,
        });
    }
    onChangeSliderPopSizePCross = (v) => {
        // this.disableOperatorsButtons()

        this.setState({
            sliderPopSizeValuePCross: v,
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

    generateData = (dataFunction3d = 'saddle') => {
        this.setDefaultGlobalVariables()

        let genRastriginsFunc = (x, y) => 10 * 2 + x*x + y*y - 10 * Math.cos(2*Math.PI*x)  - 10 * Math.cos(2*Math.PI*y)
        let xymin = -5.12
        let xymax = 5.12
        let dis = (xymax - xymin )/this.GRID_DENSITY
        let values = nj.arange(xymin, xymax,dis)
        //siatka
        var randomNumbers = Array.from(Array(this.GRID_DENSITY), () => new Array(this.GRID_DENSITY*this.GRID_DENSITY))
        for (let x = 0; x < this.GRID_DENSITY; x++) {
            for (let y = 0; y < this.GRID_DENSITY ; y++) {
                // let yyy = y - this.GRID_DENSITY / 2
                // let xxx = x - this.GRID_DENSITY / 2
                let yyy = values.get(x)
                let xxx = values.get(y)
                let computedValue

                if (dataFunction3d === 'saddle') {
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
    findNeighborsOfPoint = (x, y) => { // zwraca srodki sasiadow punktu ktory ma srodek w x,y
        let neighbors = []
        for (let i = x-1; i < x+2; i++) {
            for (let j = y-1; j < y+2; j++) {
                if ((-1 < x && x <= this.GRID_DENSITY)    &&
                    (-1 < y && y <= this.GRID_DENSITY)    &&
                    (x != i || y != j)              &&
                    (0 <= i && i <= this.GRID_DENSITY) &&
                    (0 <= j && j <= this.GRID_DENSITY)) {
                        // console.log(i, j)
                        neighbors.push([i, j])
                }
            }
        }
        // console.log(neighbors)
        return neighbors
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

    moveSquareOnChartTowardsExtremum = () => {
        const neighborsCenters = this.findNeighborsOfPoint(squareCenterPosition[0], squareCenterPosition[1])
        let isHigherValueFound = false

        for (const neighbor of neighborsCenters) {
            let points = this.findFourPointsOfCenter(neighbor[0], neighbor[1])
            let sumOfPoints = 0
            for (const point of points) {
                if (typeof this.state.data[point[0]] === 'undefined') { // sasiedztwo 8 komorek dookola, dotarlismy do ekstremum
                    this.props.onSimulationEnd()
                    return
                }

                sumOfPoints += this.state.data[point[0]][point[1]]
            }

            if (sumOfPoints > maximum) {
                isHigherValueFound = true

                squareCenterPosition = [neighbor[0], neighbor[1]]
                areaPoints = [...points]
                maximum = sumOfPoints
                console.log(maximum)
            }
        }

        if (!isHigherValueFound) {
            this.props.onSimulationEnd()
            return
        }

        // console.log(areaPoints)
        // console.log(this.state.data)

        let zValues = [] // tablica czterech wartosci z wykresu 3D, na ktorych aktualnie jest malowany obszar poszukujacy ekstremum
        for (const point of areaPoints) {
            zValues.push(this.state.data[point[0]][point[1]] + 0.1) // dodaje 0.1 zeby obszar nie nachodzil na wykres
        }

        let newww = new Array(4).fill(0).map(() => new Array(4).fill(0)) // tablica 4x4, aby dobrze rysowal sie obszar szukajacy ekstremum
    
        for (let i = 0; i < newww.length; i++) {
            for (let j = 0; j < newww[i].length; j++) {
                newww[i][j] = zValues[i]
            }
        }

        // console.log(newww)
        this.setState({squareArea: newww})
    }

    render() {
        const CHART_MARGIN = 5

        return (
        <div> 
            <div>
            <Button type="primary" onClick={() => this.generateRandomObjects()}>Generuj populację</Button>
            </div> 
            <div>

            </div>
            <div>
                
            </div>
            <div>
            <MySlider min={0} max={1} defaultValue={0.5} sliderSize={4} step={0.1} ref={this.sliderPopSizePT} text={"P(t)"} passValueToParent={this.onChangeSliderPopSizePT}></MySlider>
            </div>
            <div>
            <MySlider min={0} max={1} defaultValue={0.5} sliderSize={4} step={0.1} ref={this.sliderPopSizePCross} text={"P(cross)"} passValueToParent={this.onChangeSliderPopSizePCross}></MySlider>
            </div>
            
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
                    color: 'rgb(23, 190, 207)',
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