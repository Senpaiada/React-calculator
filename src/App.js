import { useReducer } from 'react';
import './App.css';
import DigitBtn from './DigitBtn';
import OperationBtn from './OperationBtn';
import './styles.css';

// For selections of actions the user wishes to perform
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};
// For change of event that occurred controls/updates your current state
const reducer = (state, { type, payload }) => {
  // A switch statement to help you select which action you wish to choose
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOprand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOprand === '0') return state;
      if (payload.digit === '.' && state.currentOprand.includes('.'))
        return state;

      return {
        ...state,
        currentOprand: `${state.currentOprand || ''}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOprand == null && state.prevOprand == null) {
        return state;
      }
      if (state.currentOprand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.prevOprand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOprand: state.currentOprand,
          currentOprand: null,
        };
      }

      return {
        ...state,
        prevOprand: evaluate(state),
        operation: payload.operation,
        currentOprand: null,
      };
    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOprand == null ||
        state.prevOprand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        prevOprand: null,
        operation: null,
        currentOprand: evaluate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOprand: null,
        };
      }
      if (state.currentOprand == null) return state;
      if (state.currentOprand.length === 1) {
        return {
          ...state,
          currentOprand: null,
        };
      }

      return {
        ...state,
        currentOprand: state.currentOprand.slice(0, -1),
      };

    default:
  }
};

// for checking if the user is doing the right calculation
const evaluate = ({ currentOprand, prevOprand, operation }) => {
  const prev = parseFloat(prevOprand);
  const current = parseFloat(currentOprand);
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      break;
  }
  return computation.toString();
};

// for making your integer values to appear with a coma
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

// This is the function for the integer formatter
const formatOperand = (operand) => {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};
function App() {
  // This is the use of useReducer to avoid reoccurance of your former sate or prev state
  const [{ currentOprand, prevOprand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev-oprand">
          {formatOperand(prevOprand)} {operation}
        </div>
        <div className="curr-oprand">{formatOperand(currentOprand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationBtn operation="/" dispatch={dispatch} />
      <DigitBtn digit="1" dispatch={dispatch} />
      <DigitBtn digit="2" dispatch={dispatch} />
      <DigitBtn digit="3" dispatch={dispatch} />
      <OperationBtn operation="*" dispatch={dispatch} />{' '}
      <DigitBtn digit="4" dispatch={dispatch} />
      <DigitBtn digit="5" dispatch={dispatch} />
      <DigitBtn digit="6" dispatch={dispatch} />
      <OperationBtn operation="+" dispatch={dispatch} />{' '}
      <DigitBtn digit="7" dispatch={dispatch} />
      <DigitBtn digit="8" dispatch={dispatch} />
      <DigitBtn digit="9" dispatch={dispatch} />
      <OperationBtn operation="-" dispatch={dispatch} />{' '}
      <DigitBtn digit="." dispatch={dispatch} />
      <DigitBtn digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
