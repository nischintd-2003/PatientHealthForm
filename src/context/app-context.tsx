import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { appReducer } from './app-reducer';
import type { AppState } from '../interface/app-state-type';
import { loadStateFromStorage, saveStateToStorage } from '../utilities/storage';
import type { AppAction } from '../interface/app-action-type';

const initialState: AppState = {
  patients: [],
  editingId: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const persistedState = loadStateFromStorage();

  const [state, dispatch] = useReducer(appReducer, persistedState ?? initialState);

  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
