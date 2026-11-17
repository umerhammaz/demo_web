export function createView(root) {
  const display = root.querySelector("[data-display]");
  const keys = root.querySelector("[data-keys]");
  const operatorButtons = [...keys.querySelectorAll('[data-action="operator"]')];
  let handle = () => {};

  keys.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    handle({ type: button.dataset.action, value: button.dataset.value });
  });

  function render(state) {
    display.textContent = state.display;
    display.dataset.error = String(state.hasError);
    for (const button of operatorButtons) {
      button.dataset.active = String(button.dataset.value === state.activeOperator);
    }
  }

  function onAction(handler) {
    handle = handler;
  }

  return { render, onAction };
}