import type { IEsp32Sensors, IEsp32State, IEsp32SystemInfo, TLampChannel } from '../types/esp32.ts';


const mockState: IEsp32State = {
	server: null,
	lamps: [
		{id: 1, red: 0, blue: 0},
		{id: 2, red: 0, blue: 0},
		{id: 3, red: 0, blue: 0}
	]
}

export function getMockState() {
	return structuredClone(mockState);
}

export function setMockChannel(lampId: number, channel: TLampChannel, value: number): IEsp32State {
	const lamp = mockState.lamps.find((lamp) => lamp.id === lampId);
	if (!lamp) {
		return getMockState();
	}

	lamp[channel] = value;

	return getMockState();
}

export function getMockSensors() {
	return {
		bme280: {
			humidity: 67.20801,
			pressure: 1003.595,
			temperature: 21.46
		},
	} satisfies IEsp32Sensors;
}

export function getMockSystem() {
	return {
		"chipModel": "ESP32-D0WD-V3",
		"chipRevision": 3,
		"cpuCores": 2,
		"cpuFrequencyMhz": 240,
		"uptimeSeconds": 18,
		"freeHeap": 241920,
		"totalHeap": 326852,
		"minimumFreeHeap": 225920,
		"flashSize": 4194304,
		"sketchSize": 867344,
		"freeSketchSpace": 1310720,
		"filesystemTotal": 1441792,
		"filesystemUsed": 180224,
		"ip": "192.168.31.83",
		"gateway": "192.168.31.1",
		"subnet": "255.255.255.0",
		"mac": "00:70:07:A3:CC:E8",
		"wifiRssi": -64,
		"chipTemperature": 39.44444
	} satisfies IEsp32SystemInfo;
}