import React from "react";
import TestRenderer from "react-test-renderer";
import SubmitButton from "../src/components/SubmitButton";
import ResourceContext from "../src/context";

describe("submit button", () => {
  it("should render submit button", () => {
    const wrapper = new TestRenderer.create(
      (
        <ResourceContext.Provider value={{ state: {} }}>
          <SubmitButton />
        </ResourceContext.Provider>
      )
    );    
    expect(wrapper.root.findByType("button").children).toEqual(["Submit"]);    
  });
});

