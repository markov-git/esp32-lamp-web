import { useState } from 'react'
import type { IEsp32State, ILampState } from '../types/esp32.ts';
import { setChannel } from '../api/esp32.ts';

interface IProps extends ILampState {
	onChangeState: (state: IEsp32State) => void;
}

export function LampInfo(lampState: IProps) {
	const [red, setRed] = useState(lampState.red || 0);
	const [saving, setSaving] = useState(false);

	async function handleCommit() {
		setSaving(true)

		try {
			const newState = await setChannel(1, 'red', red);
			lampState.onChangeState(newState);
		} catch (error) {
			console.error(error)
		} finally {
			setSaving(false)
		}
	}

	return (
		<section className="channel-card">
			<div className="channel-header">
				<span>LAMP ID: </span>
				<span>{lampState.id}</span>

				<span>({` RED: ${lampState.red}; BLUE: ${lampState.blue}`})</span>
			</div>

			<input
				type="range"
				min="0"
				max="100"
				value={red}
				disabled={saving}
				onChange={(event) => setRed(Number(event.target.value))}
			/>

			<button className="button" onClick={handleCommit} disabled={saving}>Save</button>
		</section>
	)
}