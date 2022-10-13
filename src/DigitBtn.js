import { ACTIONS } from './App';

export default function DigitBtn({ dispatch, digit }) {
  return (
    // For adding numbers
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
