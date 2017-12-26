import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "../victory-util/prop-types";

export default class Portal extends React.Component {
  static displayName = "Portal";

  static propTypes = {
    className: PropTypes.string,
    height: CustomPropTypes.nonNegative,
    style: PropTypes.object,
    viewBox: PropTypes.string,
    width: CustomPropTypes.nonNegative
  }

  constructor(props) {
    super(props);
    this.map = {};
    this.index = 1;
  }

  getChildren() {
    return Object.keys(this.map).map((key) => {
      const el = this.map[key];
      return el ? React.cloneElement(el, { key }) : el;
    });
  }

  portalDeregister = key => {
    delete this.map[key];
  };

  portalRegister = () => {
    return ++this.index;
  };

  portalUpdate = (key, element) => {
    this.map[key] = element;
    this.forceUpdate();
  };

  // Overridden in victory-core-native
  render() {
    return <svg {...this.props}>{this.getChildren()}</svg>;
  }
}
