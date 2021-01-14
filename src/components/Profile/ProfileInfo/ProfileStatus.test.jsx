import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props in state", () => {
    const component = create(<ProfileStatus status="test status" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("test status");
  });

  test("span creation and display", () => {
    const component = create(<ProfileStatus status="test status" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span).not.toBeNull;
  });

  test("span holds correct status", () => {
    const component = create(<ProfileStatus status="test status" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.children[0]).toBe("test status");
  });

  test("input undefined check", () => {
    const component = create(<ProfileStatus status="test status" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });

  test("input display after span double click", () => {
    const component = create(<ProfileStatus status="test status" />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    const input = root.findByType("input");
    expect(input.props.value).toBe("test status");
  });

  test("callback execution", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus updateUserStatus={mockCallback} status="test status" />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
