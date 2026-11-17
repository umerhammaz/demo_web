const KEY_ACTIONS = {
  "+": { type: "operator", value: "add" },
  "-": { type: "operator", value: "subtract" },
  "*": { type: "operator", value: "multiply" },
  x: { type: "operator", value: "multiply" },
  "/": { type: "operator", value: "divide" },
  "=": { type: "equals" },
  Enter: { type: "equals" },
  ".": { type: "dot" },
  ",": { type: "dot" },
  "%": { type: "percent" },
  Backspace: { type: "backspace" },
  Escape: { type: "clear" },
  Delete: { type: "clear" },
};

const DIGIT_PATTERN = /^[0-9]$/;

export function bindKeyboard(dispatch) {
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const action = DIGIT_PATTERN.test(event.key)
      ? { type: "digit", value: event.key }
      : KEY_ACTIONS[event.key];

    if (!action) return;
    event.preventDefault();
    dispatch(action);
  });
}