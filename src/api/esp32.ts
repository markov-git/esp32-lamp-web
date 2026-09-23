import type { IEsp32Sensors, IEsp32State, IEsp32SystemInfo, IEsp32Time, TLampChannel } from '../types/esp32.ts';
import { getMockSensors, getMockState, getMockSystem, getMockTime, setMockChannel } from './esp32.mock.ts';
import { wait } from '../utils/promise.ts';

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
	if (useMockApi) {
		await wait(3_000);
		return setMockChannel(lampId, channel, value);
	}

	// /api/lamp/1/red?value=0
	const response = await fetch(`/api/lamp/${lampId}/${channel}?value=${value}`, {
		method: 'POST',
	})

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

export async function getSensorsInfo(): Promise<IEsp32Sensors> {
	if (useMockApi) { return getMockSensors() }

	const response = await fetch('/api/sensors')

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

export async function getSystemInfo(): Promise<IEsp32SystemInfo> {
	if (useMockApi) { return getMockSystem() }

	const response = await fetch('/api/system')

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

export async function getTime(): Promise<IEsp32Time> {
	if (useMockApi) { return getMockTime() }

	const response = await fetch('/api/time')

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

export async function setTime(timeStampInSeconds: number): Promise<IEsp32Time> {
	if (useMockApi) { return getMockTime() }

	const response = await fetch('/api/time', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({unix: timeStampInSeconds}),
	})

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

