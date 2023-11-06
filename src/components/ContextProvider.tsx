import React, {createContext, useContext, useMemo, useState} from 'react';
import {View} from 'react-native';
import {isLandscapeSync} from 'react-native-device-info';
import {globalStyles} from '../utils/globalStyles';

export class GlobalContextModal {
  commonMiniSpace: number = 3;
  commonMargin: number = 15;
  commonSpace: number = 10;
  isThisLandScape: boolean;
  constructor(isThisLandScape: boolean) {
    this.isThisLandScape = isThisLandScape;
  }
}

// if a component tries to access the useGlobalContext without being wrapped inside the GlobalContextProvider, then that component will recieve this default value.
export const GlobalContext = createContext<GlobalContextModal>(
  new GlobalContextModal(false),
);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context) {
    return context;
  } else {
    throw Error('useGlobalContext must be used within a Provider');
  }
};

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isThisLandScape, setIsThisLandScape] = useState<boolean>(
    isLandscapeSync(),
  );

  const contextValue: GlobalContextModal = useMemo(() => {
    let isThisLandScape = isLandscapeSync();
    setIsThisLandScape(isThisLandScape);
    return new GlobalContextModal(isThisLandScape);
  }, [isThisLandScape]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
