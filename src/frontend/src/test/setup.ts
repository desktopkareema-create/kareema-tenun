import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// React Testing Library does not auto-clean when Vitest runs without the
// `globals` injection it detects; registering it here keeps each test's DOM
// isolated regardless of how the suite is invoked.
afterEach(() => {
  cleanup();
});

// jsdom implements neither the Pointer Events capture API nor `scrollIntoView`,
// both of which Radix UI's Select calls while opening its listbox. Without
// these the select throws `target.hasPointerCapture is not a function` and the
// sort journey cannot run at all. They are inert stubs: the assertions are on
// the option the user picks and the URL that results, not on pointer capture.
if (typeof Element !== "undefined") {
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.setPointerCapture ??= () => {};
  Element.prototype.releasePointerCapture ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};
}
