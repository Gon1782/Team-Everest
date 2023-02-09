import { useReducer, useCallback } from 'react';

export interface Magic {
  [key: string]: string | number | boolean | undefined;
}

interface ActionType {
  type: string;
  name?: string;
  value?: string;
}

const useInputs = (initialState: Magic) => {
  const reducer = (state: Magic, action: ActionType): Magic => {
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
