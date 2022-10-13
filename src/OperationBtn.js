import { ACTIONS } from './App';

export default function OperationBtn({ dispatch, operation }) {
  return (
    // For performing a calculation
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
