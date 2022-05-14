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

class ParameterComponent22A extends Component {

    constructor(props){
        super(props)

        this.state = {
            n1: props.n1 ? props.n1 : 0,
            n2: props.n2 ? props.n2 : 0,
            n3: props.n3 ? props.n3 : 0,
            n4: props.n4 ? props.n4 : 0,
            n5: props.n5 ? props.n5 : 0,
            f: props.f ? props.f : 0,
            ft: props.ft ? props.ft : 0,
            eon: props.eon ? props.eon : 0,
            eoff: props.eoff ? props.eoff : 0,
            
        }
    }

    handleChange_n1 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)

        this.setState({
            n1: value,
        });
        this.setState({
            f: ((this.state.n1 + this.state.n2 + this.state.n3 + this.state.n4 + this.state.n5) / 5),
            ft: Math.max(this.state.n1, this.state.n2, this.state.n3, this.state.n4, this.state.n5),
            
        });
        
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
            });
        }
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
        if (maxPossibleEncodedValue < this.state.Umax) {
            this.setState({
                Umin: 0,
                Umax: maxPossibleEncodedValue,
                uKod: 0
            });
        }
    };

    handleChangeUkod = value => {
        if (value == null) {
            value = this.state.Umin
        }

        // TODO kodujemy tylko liczby calkowite?
        // TODO umin=12 umax=31 ukod=21 = liczba binarna z ulamkiem, czy mozemy tak kodowac? dopytac promot
        // value = Number.isInteger(value) ? value : Math.floor(value)

        this.setState({
            uKod: value,
        });
    };

    render(){
        const { Umin, Umax, bity, uKod } = this.state;
        let xKod = (uKod - Umin) * (2**bity - 1) / (Umax - Umin)

        return(
            <div style={{margin: "10px"}}>
                <h5><li>
                <label>
                    U_min
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
                    U_max
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
                    Liczba bitów
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
                    u kodowane
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

                x = {Number.isInteger(xKod)
                ? xKod
                : xKod.toFixed(3)}
                <Latex>{"$${_{dec}}$$"}</Latex>

                 ({zeroPad(xKod.toString(2), bity)}<Latex>{"$${_{bin}}$$"}</Latex>)
                </li></h5>
            </div>
        )
    }

}

export default ParameterComponent22A;