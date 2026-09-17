import type { IEsp32State, TLampChannel } from '../types/esp32.ts';
import { getMockState, setMockChannel } from '../api/esp32.mock.ts';

const useMockApi = import.meta.env.VITE_MOCK_API === 'true'

export async function getState(): Promise<IEsp32State> {
	if (useMockApi) { return getMockState() }

	const response = await fetch('/api/state')

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

export async function setChannel(lampId: number, channel: TLampChannel, value: number): Promise<IEsp32State> {
	if (useMockApi) { return setMockChannel(lampId, channel, value); }

	// /api/lamp/1/red?value=0
	const response = await fetch(`/api/lamp/${lampId}/${channel}?value=${value}`, {
		method: 'POST',
	})

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

