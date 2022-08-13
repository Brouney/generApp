import React, {Component} from "react";
import { InputNumber } from 'antd';
var Latex = require('react-latex');

class ParameterComponent26A extends Component {

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
            eon: props.eon ? props.eon : 1,
            eoff: props.eoff ? props.eoff : 1,
            
        }
        this.mylevel = props.level ? props.level : 1;
        this.main = props.main;
    }

    changeEonEoffBefore = (f,ft) => {
        this.main.setState({
            main_eon: [],
            main_eoff: []
        })
        // console.log(this.main.table[0].current.state.f)
        let sumF = 0;
        let sumFt = 0;
        for (let i = 0; i<this.mylevel-1; ++i){
            sumF += this.main.state.references[i].current.state.f;
            sumFt += this.main.state.references[i].current.state.ft;
            this.main.setState(prevState =>({
                main_eon: [...prevState.main_eon, this.main.state.references[i].current.state.eon],
                main_eoff: [...prevState.main_eoff, this.main.state.references[i].current.state.eoff]
            }))
        }
        console.log(sumF)
        this.setState({
            eon : (sumF + f)/this.mylevel,
            eoff : (sumFt + ft)/this.mylevel,
        })
        this.main.setState(prevState =>({
            main_eon: [...prevState.main_eon, (sumF + f)/this.mylevel],
            main_eoff: [...prevState.main_eoff, (sumFt + ft)/this.mylevel]
        }))
    }
    changeEonEoffWithoutBefore = (f,ft) => {
        // console.log(this.main.table[0].current.state.f)
        let sumF = f;
        let sumFt = ft;
        for (let i = 0; i<this.mylevel-2; ++i){
            sumF += this.main.state.references[i].current.state.f;
            sumFt += this.main.state.references[i].current.state.ft;
        }
        sumF += this.state.f;
        sumFt += this.state.ft;
        // console.log(sumF)
        this.setState({
            eon : (sumF)/this.mylevel,
            eoff : (sumFt)/this.mylevel,
        })
    }
    changeEonEoffAfter = (f,ft) => {
        // console.log(this.main.table[0].current.state.f)
        for (let i = this.mylevel; i<this.main.state.parameters.length; ++i){
            this.main.state.references[i].current.changeEonEoffWithoutBefore(f,ft)
            this.main.setState(prevState =>({
                main_eon: [...prevState.main_eon, this.main.state.references[i].current.state.eon],
                main_eoff: [...prevState.main_eoff, this.main.state.references[i].current.state.eoff]
            }))
        }

    }
    handleChange_n1 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)
        let f_ = ((value + this.state.n2 + this.state.n3 + this.state.n4 + this.state.n5) / 5)
        let ft_ = Math.max(value, this.state.n2, this.state.n3, this.state.n4, this.state.n5)
        this.setState({
            n1: value,
        });
        this.setState({
            f: f_,
            ft: ft_,
            
        });

        this.changeEonEoffBefore(f_,ft_);
        this.changeEonEoffAfter(f_,ft_);
    };
    handleChange_n2 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)
        let f_ = ((value + this.state.n2 + this.state.n3 + this.state.n4 + this.state.n5) / 5)
        let ft_ = Math.max(value, this.state.n2, this.state.n3, this.state.n4, this.state.n5)
        this.setState({
            n2: value,
        });
        this.setState({
            f: f_,
            ft: ft_,
            
        });

        this.changeEonEoffBefore(f_,ft_);
        this.changeEonEoffAfter(f_,ft_);
    };
    handleChange_n3 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)
        let f_ = ((value + this.state.n2 + this.state.n3 + this.state.n4 + this.state.n5) / 5)
        let ft_ = Math.max(value, this.state.n2, this.state.n3, this.state.n4, this.state.n5)
        this.setState({
            n3: value,
        });
        this.setState({
            f: f_,
            ft: ft_,
            
        });

        this.changeEonEoffBefore(f_,ft_);
        this.changeEonEoffAfter(f_,ft_);
        
    };
    handleChange_n4 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)
        let f_ = ((value + this.state.n2 + this.state.n3 + this.state.n4 + this.state.n5) / 5)
        let ft_ = Math.max(value, this.state.n2, this.state.n3, this.state.n4, this.state.n5)
        this.setState({
            n4: value,
        });
        this.setState({
            f: f_,
            ft: ft_,
            
        });

        this.changeEonEoffBefore(f_,ft_);
        this.changeEonEoffAfter(f_,ft_);
    };
    handleChange_n5 = value => {
        if (value == null) {
            value = 0
        }
        value = Number.isInteger(value) ? value : Math.floor(value)
        let f_ = ((value + this.state.n2 + this.state.n3 + this.state.n4 + this.state.n5) / 5)
        let ft_ = Math.max(value, this.state.n2, this.state.n3, this.state.n4, this.state.n5)
        this.setState({
            n5: value,
        });
        this.setState({
            f: f_,
            ft: ft_,
            
        });

        this.changeEonEoffBefore(f_,ft_);
        this.changeEonEoffAfter(f_,ft_);
    };



    render(){
        const { n1, n2, n3, n4, n5, f, ft, eon, eoff } = this.state;
        // let xKod = (uKod - Umin) * (2**bity - 1) / (Umax - Umin)

        return(
            <div style={{margin: "10px"}}>
                <h5><li>
                <label>
                    <Latex>{"${n_1}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n1}
                        style={{ margin: '0 10px' }}
                        // value={this.state.n1}
                        value={typeof n1 === 'number' ? n1 : this.state.n1}
                        onChange={this.handleChange_n1}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                <Latex>{"${n_2}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n2}
                        style={{ margin: '0 10px' }}
                        // value={this.state.n2}
                        value={typeof n2 === 'number' ? n2 : this.state.n2}
                        onChange={this.handleChange_n2}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    <Latex>{"${n_3}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n3}
                        style={{ margin: '0 10px' }}
                        // value={this.state.n3}
                        value={typeof n3 === 'number' ? n3 : this.state.n3}
                        onChange={this.handleChange_n3}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    <Latex>{"${n_4}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n4}
                        // value={this.state.n4}
                        style={{ margin: '0 10px' }}
                        value={typeof n4 === 'number' ? n4 : this.state.n4}
                        onChange={this.handleChange_n4}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    <Latex>{"${n_5}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={this.state.n5}
                        // value={this.state.n5}
                        style={{ margin: '0 10px' }}
                        value={typeof n5 === 'number' ? n5 : this.state.n5}
                        onChange={this.handleChange_n5}
                        step={this.step ? this.step : 1}
                    />
                </label>
                <label>
                    <Latex>{"${\\langle f\\rangle}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 10px' }}
                        value={f}
                        readOnly = {true}
                    />
                </label>
                <label>
                <Latex>{"${f^{*}(t)}$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 10px' }}
                        value={ft}
                        readOnly = {true}
                    />
                </label>
                <label>
                    <Latex>{"$${e_{on}}$$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 10px' }}
                        value={eon}
                        readOnly = {true}
                    />
                </label>
                <label>
                    <Latex>{"$${e_{off}}$$"}</Latex>
                    <InputNumber
                        min={0}
                        max={1023}
                        defaultValue={15}
                        style={{ margin: '0 10px' }}
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

export default ParameterComponent26A;