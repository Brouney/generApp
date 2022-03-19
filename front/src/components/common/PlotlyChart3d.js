import React from "react";
import Plot from "react-plotly.js";

const graphData = {
  masterGraph: {
    xAxis: "X-Axis",
    yAxis: "Y-Axis",
    zAxis: "Z-Axis"
  }
};

// TODO: fix reset squareArea after losuj funkcje 3D
// TODO: rysowanie area nie pokrywa sie z wykresem tylko robi sie dolek, zle Z wartosci przypisane do zlych punktow

const RANDOM_NUMBERS_COUNT = 10
const GRID_DISTANCE_BETWEEN_POINTS = 0.5

export let squareCenterPosition = [0.5, 0.5] // punkt X,Y - srodek obszaru, ktory bladzi po wykresie szukajac ekstremum
export let areaPoints = [[0,0],[0,1],[1,0],[1,1]] // obszar, ktory bladzi po wykresie szukajac ekstremum
export let maximum = -9999


class PlotlyChart3d extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: props.data ? props.data : this.generateData(),
            squareArea: areaPoints
        }

        this.generateData = this.generateData.bind(this);
        this.moveSquareOnChartTowardsExtremum = this.moveSquareOnChartTowardsExtremum.bind(this);
    }

    setDefaultGlobalVariables() {
        squareCenterPosition = [0.5, 0.5]
        areaPoints = [[0,0],[0,1],[1,0],[1,1]]
        maximum = -9999
    }

    componentWillUnmount() { // ustawienie defaultowych zmiennych globalnych po przejsciu na inny slajd
        this.setDefaultGlobalVariables()
    }

    generateData = () => {
        // let randomNumbers = []
        // for (let i = 0; i < RANDOM_NUMBERS_COUNT; i++) {
        //     randomNumbers.push(Array(RANDOM_NUMBERS_COUNT).fill().map(() => 1 - i*0.1))  // plaska powierzchnia
            // randomNumbers.push(Array(RANDOM_NUMBERS_COUNT).fill().map(() => Math.random())) // losowa powierzchnia
        // }
        
        this.setDefaultGlobalVariables()

        var randomNumbers = Array.from(Array(RANDOM_NUMBERS_COUNT), () => [])
        for (let x = 0; x < randomNumbers.length; x++) {
            for (let y = 0; y < 10; y++) {
                randomNumbers[x][y] = x*x - y*y
            }
        }

        this.setState({ data: randomNumbers })
        return randomNumbers
    }

    findNeighborsOfPoint = (x, y) => { // zwraca srodki sasiadow punktu ktory ma srodek w x,y
        let neighbors = []
        for (let i = x-1; i < x+2; i++) {
            for (let j = y-1; j < y+2; j++) {
                if ((-1 < x && x <= RANDOM_NUMBERS_COUNT)    &&
                    (-1 < y && y <= RANDOM_NUMBERS_COUNT)    &&
                    (x != i || y != j)              &&
                    (0 <= i && i <= RANDOM_NUMBERS_COUNT) &&
                    (0 <= j && j <= RANDOM_NUMBERS_COUNT)) {
                        // console.log(i, j)
                        neighbors.push([i, j])
                }
            }
        }
        // console.log(neighbors)
        return neighbors
    }

    findFourPointsOfCenter = (x, y) => { // zwraca punkty, ktore tworza obszar o danym srodku w punkcie x,y
        return [[Math.abs(Math.round(x - 0.5)), Math.abs(Math.round(y - 0.5))],
                [Math.abs(Math.round(x + 0.5)), Math.abs(Math.round(y + 0.5))],
                [Math.abs(Math.round(x + 0.5)), Math.abs(Math.round(y - 0.5))],
                [Math.abs(Math.round(x - 0.5)), Math.abs(Math.round(y + 0.5))]]
    }

    moveSquareOnChartTowardsExtremum = () => {
        const neighborsCenters = this.findNeighborsOfPoint(squareCenterPosition[0], squareCenterPosition[1])

        for (const neighbor of neighborsCenters) {
            let points = this.findFourPointsOfCenter(neighbor[0], neighbor[1])
            let sumOfPoints = 0
            for (const point of points) {
                if (typeof this.state.data[point[0]] === 'undefined') {
                    return
                }

                sumOfPoints += this.state.data[point[0]][point[1]]
            }

            if (sumOfPoints > maximum) {
                squareCenterPosition = [neighbor[0], neighbor[1]]
                areaPoints = [...points]
                maximum = sumOfPoints
            }
        }

        // console.log(areaPoints)
        // console.log(this.state.data)

        let zValues = [] // tablica czterech wartosci z wykresu 3D, na ktorych aktualnie jest malowany obszar poszukujacy ekstremum
        for (const point of areaPoints) {
            zValues.push(this.state.data[point[0]][point[1]] + 0.1) // dodaje 0.1 zeby obszar nie nachodzil na wykres
        }

        let newww = []
        while (zValues.length) {
            newww.push(zValues.splice(0,2))
        }

        // console.log(newww)
        this.setState({squareArea: newww})
    }

    render() {
        const CHART_MARGIN = 5
        
        return (
        <Plot
            data={[
            {
                type: "surface",
                name: '3D',
                z: this.state.data
            },
            {
                type: "surface",
                name: 'Szukanie',
                x: [areaPoints[0][1], areaPoints[1][1], areaPoints[2][1], areaPoints[3][1]],
                y: [areaPoints[0][0], areaPoints[1][0], areaPoints[2][0], areaPoints[3][0]],
                z: this.state.squareArea,
                colorscale: 'hsv'
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