import { createCalculator } from "./calculator.js";
import { createView } from "./ui.js";
import { bindKeyboard } from "./keyboard.js";

const ACTIONS = {
  digit: (calculator, value) => calculator.inputDigit(value),
  dot: (calculator) => calculator.inputDot(),
  operator: (calculator, value) => calculator.chooseOperator(value),
  equals: (calculator) => calculator.equals(),
  clear: (calculator) => calculator.reset(),
  sign: (calculator) => calculator.toggleSign(),
  percent: (calculator) => calculator.percent(),
  backspace: (calculator) => calculator.backspace(),
};

const calculator = createCalculator();
const view = createView(document.querySelector("[data-calculator]"));

function dispatch(action) {
  const run = ACTIONS[action.type];
  if (!run) return;
  run(calculator, action.value);
  view.render(calculator.getState());
}

view.onAction(dispatch);
bindKeyboard(dispatch);
view.render(calculator.getState());