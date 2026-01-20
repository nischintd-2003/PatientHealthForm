import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { appReducer } from './app-reducer';
import type { AppState } from '../interface/app-state-type';
import { loadStateFromStorage, saveStateToStorage } from '../utilities/storage';

const initialState: AppState = {
  patients: [],
  editingId: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loaded = loadStateFromStorage();
    if (loaded) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: loaded });
    }
  }, []);

  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
