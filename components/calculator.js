import { storeHistories } from "../services/histories_service";

export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
  record: ""
};

export const handleNumber = (value, state) => {

  if (state.currentValue === "0")
    if (value !== ".") {
      return { currentValue: `${value}` };
    }

  if (state.currentValue.includes('.'))
    if (value === '.')
      return state;
  return {
    currentValue: `${state.currentValue}${value}`,
  };
};

const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;    //copy value

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = { operator: null, previousValue: null };

  switch (operator) {
    case "+":
      return {
        currentValue: `${previous + current}`,
        ...resetState,
      };
    case "-":
      return {
        currentValue: `${previous - current}`,
        ...resetState,
      };
    case "*":
      return {
        currentValue: `${previous * current}`,
        ...resetState,
      };
    case "/":
      return {
        currentValue: `${previous / current}`,
        ...resetState,
      };

    default:
      return state;

  }
  
};

// calculator function
const calculator = (type, value, state) => {
  const resetState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    record: ""
  };
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "clear":
      return resetState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
      };
    case "operator":
      return {
        operator: value,
        previousValue: (state.previousValue != null) ? handleEqual(state).currentValue : state.currentValue,
        currentValue: "0",
      }
    case "equal":
      let str = "";
      if (state.operator != null)
        str =  `${state.previousValue} ${state.operator} ${state.currentValue} = `;
      else str = `${state.currentValue} = `;
      let response = handleEqual(state);
      str += response.currentValue;
      response = {...response, ...{record: str}};
      return response;
    default:
      return state;
  }
};

export default calculator;