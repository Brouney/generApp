import React, {Component} from "react";
import { Slider, InputNumber, Row, Col } from 'antd';
import 'antd/dist/antd.css';

class MySlider extends React.Component {

    constructor(props) {
        super(props)
        this.min = props.min;
        this.max = props.max;
        this.defaultValue = props.defaultValue ? props.defaultValue : 0
        this.sliderSize = props.sliderSize;
        this.step = props.step;
        this.text = props.text;

        this.numberField = React.createRef();
    }
  state = {
    inputValue: this.min ? this.min : this.defaultValue,
  };

  onChange = value => {
    this.setState({
      inputValue: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.inputValue !== prevState.inputValue) {
        this.props.passValueToParent(this.state.inputValue);
    }
  }


  render() {
    const { inputValue } = this.state;
    return (
      <div className="row">
        <div className="col-3" span={this.sliderSize}>
            <h5>{this.text}</h5>
        </div>
        <div className="col-3" span={this.sliderSize}>
          <Slider
            min={this.min}
            max={this.max}
            defaultValue={this.defaultValue}
            onChange={this.onChange}
            value={inputValue}
            step={this.step ? this.step : 1}
          />
        </div>
        <div className="col-3" span={this.sliderSize / 3}>
          <InputNumber
            min={this.min}
            max={this.max}
            defaultValue={this.defaultValue}
            style={{ margin: '0 16px' }}
            value={typeof inputValue === 'number' ? inputValue : this.state.inputValue}
            onChange={this.onChange}
            step={this.step ? this.step : 1}
            ref={this.numberField}
          />
        </div>
    </div>
    );
  }
}

export default MySlider; 