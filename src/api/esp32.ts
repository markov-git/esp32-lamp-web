import type { IEsp32State, TLampChannel } from '../types/esp32.ts';

export async function getState(): Promise<IEsp32State> {
	const response = await fetch('/api/state')

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

export async function setChannel(lampId: number, channel: TLampChannel, value: number): Promise<IEsp32State> {
	// /api/lamp/1/red?value=0
	const response = await fetch(`/api/lamp/${lampId}/${channel}?value=${value}`, {
		method: 'POST',
	})

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

