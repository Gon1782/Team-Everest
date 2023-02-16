import { useReducer, useCallback } from 'react';

export interface State {
  [key: string]: string;
}

interface ActionType {
  type: string;
  name?: string;
  value?: string;
}

// 객체일때 커스텀훅 initialState는 객체
const useInputs = (initialState: State) => {
  const reducer = (state: State, action: ActionType): State => {
    switch (action.type) {
      case 'CHANGE_INPUT':
        return {
          ...state,
          [action.name ?? '']: action.value,
        };
      case 'CHANGE_RESET':
        return initialState;
      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      dispatch({ type: 'CHANGE_INPUT', name: name, value: value });
    },
    [],
  );

  const reset = useCallback(() => {
    dispatch({ type: 'CHANGE_RESET' });
  }, []);

  return [state, onChange, reset] as const;
};

export default useInputs;
