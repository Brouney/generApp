import React from "react";
import Plot from "react-plotly.js";

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


class PlotlyChart3d extends React.Component {

    constructor(props) {
        super(props)
        this.GRID_DENSITY = props.gridDensity ? props.gridDensity : 10

        this.state = {
            data: props.data ? props.data : this.generateData(),
            squareArea: areaPoints
        }

        this.generateData = this.generateData.bind(this);
        this.moveSquareOnChartTowardsExtremum = this.moveSquareOnChartTowardsExtremum.bind(this);
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
        // let randomNumbers = []
        // for (let i = 0; i < this.GRID_DENSITY; i++) {
        //     // randomNumbers.push(Array(this.GRID_DENSITY).fill().map(() => 1 - i*0.1))  // plaska powierzchnia
        //     randomNumbers.push(Array(this.GRID_DENSITY).fill().map(() => Math.random())) // losowa powierzchnia
        // }
        // console.log(areaPoints)

        this.setDefaultGlobalVariables()

        let saddleFormula = (x, y) => y*y - x*x
        let paraboloidFormula = (x, y) => - x*x - y*y
        

        var randomNumbers = Array.from(Array(this.GRID_DENSITY), () => [])
        for (let x = 0; x < randomNumbers.length; x++) {
            for (let y = 0; y < this.GRID_DENSITY; y++) {
                let yyy = y - this.GRID_DENSITY / 2
                let xxx = x - this.GRID_DENSITY / 2
                let computedValue

                if (dataFunction3d === 'saddle') {
                    computedValue = saddleFormula(xxx, yyy)
                }
                else if (dataFunction3d === 'paraboloid') {
                    computedValue = paraboloidFormula(xxx, yyy)
                }

                randomNumbers[x][y] = computedValue
            }
        }

        this.setState({ data: randomNumbers })
        return randomNumbers
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

        // console.log('zValues:', zValues)
        // while (zValues.length) {
        //     newww.push(zValues.splice(0,2))
        // }
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
        let xOnChart = [
                areaPoints[0][1],
                areaPoints[1][1],
                areaPoints[2][1],
                areaPoints[3][1],
            ]
        let yOnChart = [
            areaPoints[0][0],
            areaPoints[1][0],
            areaPoints[2][0],
            areaPoints[3][0],
        ]

        // console.log(xOnChart)
        // console.log(yOnChart)

        return (
        <Plot
            data={[
            {
                type: "surface",
                name: '3D',
                z: this.state.data,
                showscale: false,
            },
            {
                type: "surface",
                name: 'Szukanie',
                x: xOnChart,
                y: yOnChart,
                z: this.state.squareArea,
                colorscale: 'hsv',
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
            //   scene: {
            //     xaxis: {
            //       title: graphData.masterGraph.xAxis,
            //       titlefont: {
            //         family: "Courier New, monospace",
            //         size: 12,
            //         color: "#444444"
            //       }
            //     },
            //     yaxis: {
            //       title: graphData.masterGraph.yAxis,
            //       titlefont: {
            //         family: "Courier New, monospace",
            //         size: 12,
            //         color: "#444444"
            //       }
            //     },
            //     zaxis: {
            //       title: graphData.masterGraph.zAxis,
            //       titlefont: {
            //         family: "Courier New, monospace",
            //         size: 12,
            //         color: "#444444"
            //       }
            //     }
            //   }
            }}
        />
        );
    }
}

export default PlotlyChart3d;