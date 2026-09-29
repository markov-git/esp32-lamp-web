import { useEffect, useState } from 'react';
import { getHistory, getSensorsInfo, getState } from './api/esp32.ts';
import type { IEsp32Sensors, IEsp32State } from './types/esp32.ts';
import type { IAppSensorsHistory, TAppTabId } from './types/app.ts';
import { AppContextProvider } from './Context.tsx';
import './App.css';
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { Sidebar } from './components/Sidebar.tsx';
import { ControlPage } from './components/ControlPage.tsx';
import { Center, Loader, MantineProvider } from '@mantine/core';
import { theme } from "./theme";
import { mapEspHistoryToAppHistory } from './dataMappers/espHistoryToAppHistory.ts';

function App() {
	const [ state, setState ] = useState<IEsp32State | undefined>(undefined);
	const [ sensors, setSensors ] = useState<IEsp32Sensors | undefined>(undefined);
	const [ sensorsDayHistory, setSensorsDayHistory ] = useState<IAppSensorsHistory | undefined>(undefined);
	const [ connected, setConnected ] = useState(true);
	const [ loading, setLoading ] = useState(true);
	const [ activeTab, setActiveTab ] = useState<TAppTabId>('dashboard');

	useEffect(() => {
		const requestState = () => {
			getState()
				.then(setState)
				.catch(() => {
					console.error('Failed to connect to ESP32');
					setConnected(false);
				})
				.finally(() => {
					setLoading(false);
					setTimeout(requestState, 15_000);
				});
		}

		const requestSensors = () => {
			getSensorsInfo()
				.then(setSensors)
				.then(() => setConnected(true))
				.catch(() => {
					console.error('Failed to connect to ESP32');
					setConnected(false);
				})
				.finally(() => {
					setLoading(false);
					setTimeout(requestSensors, 3_000);
				});
		}

		const requestHistory = () => {
			getHistory('day')
				.then((history) => {
					setSensorsDayHistory(mapEspHistoryToAppHistory(history));
				})
				.catch(() => {
					console.error('Failed to connect to ESP32');
				})
				.finally(() => {
					setTimeout(requestHistory, 600_000);
				});
		}
		requestState();
		requestSensors();

		// Историю отложено запрашиваем - тяжелый запрос
		setTimeout(requestHistory, 1_500);
	}, []);

	if (loading) {
		return (
			<MantineProvider theme={theme}>
				<Center h="100vh">
					<Loader size="xl"/>
				</Center>
			</MantineProvider>
		);
	}

	if (!state) {
		return <div>Empty state info</div>;
	}

	return (
		<MantineProvider theme={theme}>
			<AppContextProvider context={{
				connected,
				state,
				sensors,
				sensorsDayHistory,
				changeState: setState,
			}}>
				<div className="app-shell">
					<Sidebar activeTab={activeTab} onChangeActiveTab={setActiveTab}/>
					<ControlPage tab={activeTab}/>
				</div>
			</AppContextProvider>
		</MantineProvider>
	);
}

export default App;
