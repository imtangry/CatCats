import {createContext, ReactNode, useContext, useMemo,  useState} from 'react';

export type Coin = number;

type TAppStateProvider = {
  children: ReactNode;
};

type AppStateContextProviderValue = {
  coin: Coin;
  setCoin: (coin: Coin) => void;
};

const initialContext: AppStateContextProviderValue = {
  coin: 0,
  setCoin: () => {},
};

const AppStateContext = createContext<AppStateContextProviderValue>(initialContext);

export const AppStateProvider = ({ children }: TAppStateProvider) => {
  const [coin, setCoin] = useState(0);

  const contextValue = useMemo(() => {
    return {coin, setCoin}
  }, [coin, setCoin])
  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
