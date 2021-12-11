class Button extends React.Component {
    render() {
      return (
        <div className={`button ${this.props.buttonClass}`} onClick={this.props.onClick}>
          {this.props.buttonText}
        </div>
      );
    }
  }