
export interface IEsp32State {
	lamps: ILampState[];
	time: IEsp32Time;
}

export interface IEsp32Time {
	unix: number;
	lostPower: boolean;
}

export interface ILampState extends Record<TLampChannel, number> {
	id: number;
}

export type TLampChannel = 'red' | 'blue';

export interface IEsp32Sensors {
	bme280: {
		humidity: number;
		pressure: number;
		temperature: number;
	};
	soilMoisture: {
		id: number;
		raw: number;
		percent: number;
	}[];
}

export interface IEsp32SystemInfo {
	chipModel: string,
	chipRevision: 3,
	cpuCores: 2,
	cpuFrequencyMhz: 240,
	uptimeSeconds: 18,

	freeHeap: 241920,
	totalHeap: 326852,
	minimumFreeHeap: 225920,

	flashSize: 4194304,

	sketchSize: 867344,
	freeSketchSpace: 1310720,

	filesystemTotal: 1441792,
	filesystemUsed: 180224,

	ip: "192.168.31.83",
	gateway: "192.168.31.1",
	subnet: "255.255.255.0",
	mac: "00:70:07:A3:CC:E8",
	wifiRssi: -64,

	chipTemperature: 39.44444
}