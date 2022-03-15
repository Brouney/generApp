import React from "react";
import Plot from "react-plotly.js";

const graphData = {
  masterGraph: {
    xAxis: "X-Axis",
    yAxis: "Y-Axis",
    zAxis: "Z-Axis"
  }
};

class PlotlyChart3d extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.generateData()
        }

        this.generateData = this.generateData.bind(this);
    }

    generateData = () => {
        var arr = []
        const RANDOM_NUMBERS_COUNT = 10

        for (let i = 0; i < RANDOM_NUMBERS_COUNT; i++) {
            arr.push(Array(RANDOM_NUMBERS_COUNT).fill().map(() => Math.random()))
        }

        this.setState({ data: arr })
        return arr
    }

    render() {
        const CHART_MARGIN = 5

        return (
        <Plot
            data={[
            {
                type: "surface",
                z: this.state.data
            }
            ]}
            config={{
                'displayModeBar': false, // wylaczenie kontrolek Plotly
                "scrollZoom": false
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