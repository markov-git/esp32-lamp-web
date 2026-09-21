import { useEffect, useState } from 'react';
import { getSensorsInfo, getState } from './api/esp32.ts';
import type { IEsp32Sensors, IEsp32State } from './types/esp32.ts';
import { AppContextProvider } from './Context.tsx';
import './App.css';
import "@mantine/core/styles.css";
import { Sidebar } from './components/Sidebar.tsx';
import { ControlPage } from './components/ControlPage.tsx';
import type { TAppTabId } from './types/app.ts';
import { Center, Loader, MantineProvider } from '@mantine/core';
import { theme } from "./theme";

function App() {
	const [ state, setState ] = useState<IEsp32State | undefined>(undefined);
	const [ sensors, setSensors ] = useState<IEsp32Sensors | undefined>(undefined);
	const [ connected, setConnected ] = useState(true);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState<string | null>(null);
	const [ activeTab, setActiveTab ] = useState<TAppTabId>('dashboard');

	useEffect(() => {
		getState()
			.then(setState)
			.catch(() => setError('Failed to connect to ESP32'))
			.finally(() => setLoading(false));

		const requestSensors = () => {
			getSensorsInfo()
				.then(setSensors)
				.then(() => !connected && setConnected(true))
				.catch(() => {
					console.error('Failed to connect to ESP32');
					setConnected(false);
				})
				.finally(() => {
					setLoading(false);
					setTimeout(requestSensors, 3_000);
				});
		}
		requestSensors();
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

	if (error) {
		return <div>{ error }</div>;
	}

	return (
		<MantineProvider theme={theme}>
			<AppContextProvider context={{
				connected,
				state,
				sensors,
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
