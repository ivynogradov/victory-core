/*eslint-disable react/no-multi-comp*/
import React from "react";
import PropTypes from "prop-types";
import { Data } from "src/index";
import { defaults, get, reduce, map } from "lodash";

const MockDataComponent = props => {
  const { datum: { x, y }, events, style } = props;
  return (
    <p style={style} {...events}>
      `${x}: ${y}`
    </p>
  );
};

MockDataComponent.displayName = "MockDataComponent";
MockDataComponent.role = "dataComponent";

MockDataComponent.propTypes = {
  datum: PropTypes.object,
  events: PropTypes.object,
  style: PropTypes.object
};

const MockLabel = props => {
  const { text } = props;

  return (
    <p>`${text}`</p>
  );
};

MockLabel.displayName = "MockLabel";
MockLabel.role = "label";

MockLabel.propTypes = {
  text: PropTypes.string
};

const MockVictoryComponent = props => {
  const props = defaults({}, props, this.defaultProps);
  const { dataComponent, labelComponent, groupComponent } = props;

  const dataComponents = map(this.dataKeys, (_key, index) => {
    const dataProps = this.getComponentProps(dataComponent, "data", index);
    return React.cloneElement(dataComponent, dataProps);
  });

  const labelComponents = map(this.dataKeys, (_key, index) => {
    const labelProps = this.getComponentProps(labelComponent, "labels", index);
    return get(labelProps, "text") ? React.cloneElement(labelComponent, labelProps) : undefined;
  });

  return React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents);
};

MockVictoryComponent.displayName = "MockVictoryComponent";
MockVictoryComponent.role = "chart";

MockVictoryComponent.defaultProps = {
  dataComponent: <MockDataComponent/>,
  labelComponent: <MockLabel/>,
  groupComponent: <div/>
};

MockVictoryComponent.getBaseProps = (props) => {
  const data = Data.getData(props);
  const childProps = reduce(data, (accum, datum, index) => {
    return defaults({}, accum, {
      [index]: {
        data: {
          index,
          datum,
          data,
          style: {}
        }
      }
    });
  }, {});

  return {
    parent: {
      data
    },
    ...childProps
  };
};

export { MockVictoryComponent, MockLabel, MockDataComponent };