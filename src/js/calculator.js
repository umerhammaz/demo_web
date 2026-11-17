export const ERROR_TEXT = "Error";

const MAX_DIGITS = 12;

const OPERATORS = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b === 0 ? NaN : a / b),
};

function format(value) {
  if (!Number.isFinite(value)) return ERROR_TEXT;
  return String(Number(value.toPrecision(MAX_DIGITS)));
}

export function createCalculator() {
  let current = "0";
  let stored = null;
  let operator = null;
  let overwrite = true;
  let error = false;

  function reset() {
    current = "0";
    stored = null;
    operator = null;
    overwrite = true;
    error = false;
  }

  function commit(result) {
    current = format(result);
    error = current === ERROR_TEXT;
    if (error) {
      stored = null;
      operator = null;
    }
  }

  function inputDigit(digit) {
    if (error) reset();
    if (overwrite) {
      current = digit;
      overwrite = false;
      return;
    }
    if (current.replace(/[-.]/g, "").length >= MAX_DIGITS) return;
    current = current === "0" ? digit : current + digit;
  }

  function inputDot() {
    if (error) reset();
    if (overwrite) {
      current = "0.";
      overwrite = false;
      return;
    }
    if (!current.includes(".")) current += ".";
  }

  function chooseOperator(nextOperator) {
    if (error) return;
    if (operator !== null && !overwrite) {
      commit(OPERATORS[operator](stored, Number(current)));
      if (error) return;
    }
    stored = Number(current);
    operator = nextOperator;
    overwrite = true;
  }

  function equals() {
    if (error || operator === null) return;
    commit(OPERATORS[operator](stored, Number(current)));
    operator = null;
    stored = null;
    overwrite = true;
  }

  function toggleSign() {
    if (error || current === "0") return;
    current = current.startsWith("-") ? current.slice(1) : "-" + current;
  }

  function percent() {
    if (error) return;
    commit(Number(current) / 100);
    overwrite = true;
  }

  function backspace() {
    if (error) {
      reset();
      return;
    }
    if (overwrite) return;
    current = current.length > 1 ? current.slice(0, -1) : "0";
    if (current === "-") current = "0";
  }

  function getState() {
    return {
      display: current,
      activeOperator: error ? null : operator,
      hasError: error,
    };
  }

  return {
    inputDigit,
    inputDot,
    chooseOperator,
    equals,
    toggleSign,
    percent,
    backspace,
    reset,
    getState,
  };
}