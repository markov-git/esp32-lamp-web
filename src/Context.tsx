import type { IEsp32Sensors, IEsp32State } from './types/esp32.ts';
import * as React from 'react';
import { useContext } from 'react';

export interface IAppContext {
	connected: boolean;
	state: IEsp32State;
	sensors: IEsp32Sensors | undefined;

	changeState: (state: IEsp32State) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = React.createContext<IAppContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<React.PropsWithChildren<{context: IAppContext}>> = ({children, context}) => {
	return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}