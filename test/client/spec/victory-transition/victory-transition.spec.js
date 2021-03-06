/**
 * Client tests
 */
import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import VictoryTransition from "src/victory-transition/victory-transition";

const TestComponent = (
  {
    message,
  },
) => {
  return (
    <text className="foo">
      {message[0]}
    </text>
  );
};

TestComponent.propTypes = {
  message: PropTypes.array
};

describe("components/victory-transition", () => {
  it("renders a child component", () => {
    const wrapper = mount(
      <VictoryTransition animate={{ duration: 0 }} animationWhitelist={["data"]}>
        <TestComponent animate={{ duration: 0 }} message={["HELLO"]} />
      </VictoryTransition>
    );
    const output = wrapper.find(".foo");
    expect(output.length).to.equal(1);
    expect(output.text()).to.equal("HELLO");
  });
});