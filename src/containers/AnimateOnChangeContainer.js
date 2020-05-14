import React, { PureComponent } from "react";
import AnimateOnChange from "react-animate-on-change";

class AnimateOnChangeContainer extends PureComponent {
  state = {
    animate: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.setState({
        animate: true,
      });
    }
  }

  render() {
    return (
      <AnimateOnChange
        baseClassName={this.props.baseClassName}
        animationClassName={this.props.animationClassName}
        animate={this.state.animate}
      >
        {this.props.children}
      </AnimateOnChange>
    );
  }
}

export default AnimateOnChangeContainer;
