import { useEffect, useState } from 'react';
import { getState } from './api/esp32.ts';
import type { IEsp32State } from './types/esp32.ts';
import { AppContextProvider } from './Context.tsx';
import './App.css';
import { Sidebar } from './components/Sidebar.tsx';
import { ControlPage } from './components/ControlPage.tsx';
import type { TAppTabId } from './types/app.ts';

function App() {
	const [ state, setState ] = useState<IEsp32State | undefined>(undefined);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState<string | null>(null);
	const [ activeTab, setActiveTab ] = useState<TAppTabId>('dashboard');

	useEffect(() => {
		getState()
			.then(setState)
			.catch(() => setError('Failed to connect to ESP32'))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!state) {
		return <div>Empty state info</div>;
	}

	if (error) {
		return <div>{ error }</div>;
	}

	return (
		<AppContextProvider context={{
			state,
			changeState: setState,
		}}>
			<div className="app-shell">
				<Sidebar activeTab={activeTab} onChangeActiveTab={setActiveTab}/>
				<ControlPage tab={activeTab}/>
			</div>
		</AppContextProvider>
	);
}

export default App;
