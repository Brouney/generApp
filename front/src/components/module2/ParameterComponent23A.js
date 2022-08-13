import React, {Component} from "react";
import { InputNumber } from 'antd';
var Latex = require('react-latex');

function howManyBitsNeededToRepresentInteger(value) {
    if (value == 0) {
        return 1
    }
    else {
        return 1 + Math.floor(Math.log(value)/Math.log(2))
    }
}

const zeroPad = (num, places) => String(num).padStart(places, '0')

class ParameterComponent23A extends Component {

    constructor(props){
        super(props)

        this.state = {
            Umin: props.Umin ? props.Umin : 0,
            Umax: props.Umax ? props.Umax : 7,
            bity: props.bity ? props.bity : 3,
            uKod: props.uKod ? props.uKod : 1,
            xKod: props.xKod ? props.xKod : 1,

            listIndex: props.listIndex,
        }
    }

    handleChangeUmin = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)

        this.setState({
            Umin: value,
        });

        if (value > this.state.uKod) {
            this.setState({
                uKod: value,
                xKod: value
            });
        }

        this.props.passXkodToParent(this.state.listIndex, zeroPad(Math.round(this.state.xKod).toString(2), this.state.bity));
    };

    handleChangeUmax = value => {
        if (value == null) {
            value = 1
        }
        value = Number.isInteger(value) ? value : Math.floor(value)

        let newBits = howManyBitsNeededToRepresentInteger(value)
        this.setState({
            Umax: value,
            bity: newBits
        });

        if (value < this.state.uKod) {
            this.setState({
                uKod: value,
                xKod: value
            });
        }

        this.props.passXkodToParent(this.state.listIndex,  zeroPad(Math.round(this.state.xKod).toString(2), newBits));
    };

    handleChangeBits = value => {
        if (value == null) {
            value = 1
        }
        value = Number.isInteger(value) ? value : Math.floor(value)
        this.setState({
            bity: value,
        });

        let maxPossibleEncodedValue = 2**value - 1
        if (maxPossibleEncodedValue < this.state.Umax || maxPossibleEncodedValue < this.state.xKod) {
            this.setState({
                Umin: 0,
                Umax: maxPossibleEncodedValue,
                uKod: 0,
                xKod: 0
            });

        }
        this.props.passXkodToParent(this.state.listIndex,  zeroPad(Math.round(this.state.xKod).toString(2), value));
    };

    handleChangeUkod = value => {
        if (value == null) {
            value = this.state.Umin
        }

        this.setState({
            uKod: value,
            xKod: (value - this.state.Umin) * (2**this.state.bity - 1) / (this.state.Umax - this.state.Umin)
        });

        this.props.passXkodToParent(this.state.listIndex,  zeroPad(Math.round(this.state.xKod).toString(2), this.state.bity));
    };

    handleChangeXkod = value => {
        if (value == null) {
            value = this.state.Umin
        }

        this.setState({
            uKod: value * (this.state.Umax - this.state.Umin) / (2**this.state.bity - 1) + this.state.Umin,
            xKod: value,
        });

        this.props.passXkodToParent(this.state.listIndex,  zeroPad(Math.round(value).toString(2), this.state.bity));
    };

    render(){
        const { Umin, Umax, bity, uKod, xKod } = this.state;

        return(
            <div style={{margin: "10px"}}>
                <h5><li>
                <label>
                    <Latex>{"${U_{min}}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={this.state.Umax-1}
                        defaultValue={this.state.Umin}
                        style={{ margin: '0 16px' }}
                        value={typeof Umin === 'number' ? Umin : this.state.Umin}
                        onChange={this.handleChangeUmin}
                        step={this.step ? this.step : 1}
                    />
                </label>

                <label>
                    <Latex>{"${U_{max}}$"}</Latex>
                    <InputNumber
                        min={this.state.Umin+1}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 16px' }}
                        value={typeof Umax === 'number' ? Umax : this.state.Umax}
                        onChange={this.handleChangeUmax}
                        step={this.step ? this.step : 1}
                    />
                </label>

                <label>
                    Liczba bitów <Latex>{"${l}$"}</Latex>
                    <InputNumber
                        min={1}
                        max={10}
                        defaultValue={1}
                        style={{ margin: '0 16px' }}
                        value={typeof bity === 'number' ? Math.floor(bity) : this.state.bity}
                        onChange={this.handleChangeBits}
                        step={this.step ? this.step : 1}
                    />
                </label>

                <label>
                    <Latex>{"${u}$"}</Latex> kodowane
                    <InputNumber
                        min={this.state.Umin}
                        max={this.state.Umax}
                        defaultValue={this.state.Umin}
                        style={{ margin: '0 16px' }}
                        value={typeof uKod === 'number' ? uKod : this.state.uKod}
                        onChange={this.handleChangeUkod}
                        step={this.step ? this.step : 1}
                    />
                </label>

                <label>
                    <Latex>{"${x_{dec}}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={2**bity - 1}
                        defaultValue={this.state.Umin}
                        style={{ margin: '0 16px' }}
                        value={typeof uKod === 'number' ? xKod : this.state.xKod}
                        onChange={this.handleChangeXkod}
                        step={this.step ? this.step : 1}
                    />
                </label>

                <Latex>{"${x_{bin}}$"}</Latex> = {zeroPad(Math.round(xKod).toString(2), bity)}
                </li></h5>
            </div>
        )
    }

}

export default ParameterComponent23A;