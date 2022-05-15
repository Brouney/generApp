import React, {Component} from "react";
import { InputNumber } from 'antd';
var Latex = require('react-latex');

class ParameterComponent22A extends Component {

    constructor(props){
        super(props)

        this.state = {
            n1: props.n1 ? props.n1 : 1,
            n2: props.n2 ? props.n2 : 1,
            n3: props.n3 ? props.n3 : 1,
            n4: props.n4 ? props.n4 : 1,
            n5: props.n5 ? props.n5 : 1,
            f: props.f ? props.f : 1,
            ft: props.ft ? props.ft : 1,
            eon: props.eon ? props.eon : 0,
            eoff: props.eoff ? props.eoff : 0,
            
        }
        this.mylevel = props.level ? props.level : 0;
        this.main = props.main;
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
            f: ((value + this.state.n2 + this.state.n3 + this.state.n4 + this.state.n5) / 5),
            ft: Math.max(value, this.state.n2, this.state.n3, this.state.n4, this.state.n5),
            
        });
        
    };
    handleChange_n2 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)

        this.setState({
            n2: value,
        });
        this.setState({
            f: ((this.state.n1 + value + this.state.n3 + this.state.n4 + this.state.n5) / 5),
            ft: Math.max(this.state.n1, value, this.state.n3, this.state.n4, this.state.n5),
            
        });
        
    };
    handleChange_n3 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)

        this.setState({
            n3: value,
        });
        this.setState({
            f: ((this.state.n1 + this.state.n2 + value + this.state.n4 + this.state.n5) / 5),
            ft: Math.max(this.state.n1, this.state.n2, value, this.state.n4, this.state.n5),
            
        });
        
    };
    handleChange_n4 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)

        this.setState({
            n4: value,
        });
        this.setState({
            f: ((this.state.n1 + this.state.n2 + this.state.n3 + value + this.state.n5) / 5),
            ft: Math.max(this.state.n1, this.state.n2, this.state.n3, value, this.state.n5),
            
        });
        
    };
    handleChange_n5 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)

        this.setState({
            n5: value,
        });
        this.setState({
            f: ((this.state.n1 + this.state.n2 + this.state.n3 + this.state.n4 + value) / 5),
            ft: Math.max(this.state.n1, this.state.n2, this.state.n3, this.state.n4, value),
            
        });
        
    };



    render(){
        const { n1, n2, n3, n4, n5, f, ft, eon, eoff } = this.state;
        // let xKod = (uKod - Umin) * (2**bity - 1) / (Umax - Umin)

        return(
            <div style={{margin: "10px"}}>
                <h5><li>
                <label>
                    n1
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n1}
                        style={{ margin: '0 16px' }}
                        // value={this.state.n1}
                        value={typeof n1 === 'number' ? n1 : this.state.n1}
                        onChange={this.handleChange_n1}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    n2
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n2}
                        style={{ margin: '0 16px' }}
                        // value={this.state.n2}
                        value={typeof n2 === 'number' ? n2 : this.state.n2}
                        onChange={this.handleChange_n2}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    n3
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n3}
                        style={{ margin: '0 16px' }}
                        // value={this.state.n3}
                        value={typeof n3 === 'number' ? n3 : this.state.n3}
                        onChange={this.handleChange_n3}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    n4
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n4}
                        // value={this.state.n4}
                        style={{ margin: '0 16px' }}
                        value={typeof n4 === 'number' ? n4 : this.state.n4}
                        onChange={this.handleChange_n4}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    n5
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n5}
                        // value={this.state.n5}
                        style={{ margin: '0 16px' }}
                        value={typeof n5 === 'number' ? n5 : this.state.n5}
                        onChange={this.handleChange_n5}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    f
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 16px' }}
                        value={f}
                        readOnly = {true}
                    />
                </label>
                <label>
                    ft
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 16px' }}
                        value={ft}
                        readOnly = {true}
                    />
                </label>
                <label>
                    eon
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 16px' }}
                        value={eon}
                        readOnly = {true}
                    />
                </label>
                <label>
                    eoff
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 16px' }}
                        value={eoff}
                        readOnly = {true}
                    />
                </label>

                {/* x = {Number.isInteger(xKod)
                ? xKod
                : xKod.toFixed(3)}
                <Latex>{"$${_{dec}}$$"}</Latex>

                 ({zeroPad(xKod.toString(2), bity)}<Latex>{"$${_{bin}}$$"}</Latex>) */}
                </li></h5>
            </div>
        )
    }

}

export default ParameterComponent22A;