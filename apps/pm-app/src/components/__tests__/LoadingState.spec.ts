import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import LoadingState from "../LoadingState.vue";

describe("LoadingState.vue", () => {
  it('renders default message "Loading..." when no prop is passed', () => {
    const wrapper = mount(LoadingState);
    expect(wrapper.text()).toContain("Loading...");
  });

  it("renders custom message when passed", () => {
    const message = "Creating Account...";
    const wrapper = mount(LoadingState, {
      props: { message },
    });
    expect(wrapper.text()).toContain(message);
  });

  it('renders in "Full Page" mode by default (isCard: false)', () => {
    const wrapper = mount(LoadingState);
    // Check for full page class
    expect(wrapper.classes()).toContain("h-full");
    expect(wrapper.classes()).toContain("w-full");
    // Ensure card classes are NOT present
    expect(wrapper.classes()).not.toContain("shadow-xl");
  });

  it('renders in "Card" mode when isCard prop is true', () => {
    const wrapper = mount(LoadingState, {
      props: { isCard: true },
    });

    const container = wrapper.element as HTMLElement;
    // Check for card specific classes that signify the card style
    expect(wrapper.classes()).toContain("shadow-xl");
    expect(wrapper.classes()).toContain("rounded-lg");
    expect(wrapper.classes()).toContain("border-4");
  });
});
