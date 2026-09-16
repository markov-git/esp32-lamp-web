import { useEffect, useState } from 'react';
import { getState } from './api/esp32.ts';
import type { IEsp32State } from './types/esp32.ts';
import { LampInfo } from './components/LampInfo.tsx';

function App() {
	const [ state, setState ] = useState<IEsp32State | undefined>(undefined);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState<string | null>(null);

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
		<div>
			Awesome Lamp Panel

			<LampInfo {...state.lamps[0]} onChangeState={setState}/>
		</div>
	);
}

export default App;
