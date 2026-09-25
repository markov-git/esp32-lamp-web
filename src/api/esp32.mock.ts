import type {
	IEsp32Sensors,
	IEsp32State,
	IEsp32SystemInfo,
	IEsp32Time, IScheduleEntry,
	IScheduleInfo,
	TLampChannel,
} from '../types/esp32.ts';

const mockState: IEsp32State = {
	lamps: [
		{
			id: 1,
			current: {
				red: 0,
				blue: 0,
			},
			manual: {
				red: 0,
				blue: 0,
			},
			scheduleEnabled: false,
		},
		{
			id: 2,
			current: {
				red: 0,
				blue: 0,
			},
			manual: {
				red: 0,
				blue: 0,
			},
			scheduleEnabled: false,
		},
		{
			id: 3,
			current: {
				red: 0,
				blue: 0,
			},
			manual: {
				red: 0,
				blue: 0,
			},
			scheduleEnabled: false,
		},
	],
	time: {
		unix: 1858709804,
		lostPower: false,
	},
};

const mockSchedule: IScheduleInfo = {
	lamps: [
		{
			id: 0,
			enabled: false,
			red: [
				{
					days: 62,
					start: 420,
					end: 600,
					brightness: 70,
					fadeIn: 30,
					fadeOut: 30,
				},
			],
			blue: [
				{
					days: 62,
					start: 420,
					end: 600,
					brightness: 70,
					fadeIn: 30,
					fadeOut: 30,
				},
			],
		},
		{
			id: 1,
			enabled: false,
			red: [],
			blue: [],
		},
		{
			id: 2,
			enabled: false,
			red: [],
			blue: [],
		},
	],
};

export function getMockState() {
	return structuredClone(mockState);
}

export function setMockChannel(lampId: number, channel: TLampChannel, value: number): IEsp32State {
	const lamp = mockState.lamps.find((lamp) => lamp.id === lampId);
	if (!lamp) {
		return getMockState();
	}

	lamp.manual[channel] = value;
	lamp.current[channel] = value;

	return getMockState();
}

export function setMockScheduleEnabled(lampId: number, value: boolean) {
	const lamp = mockState.lamps.find((lamp) => lamp.id === lampId);
	if (!lamp) {
		return getMockState();
	}

	lamp.scheduleEnabled = value;

	return getMockState();
}

export function getMockSensors() {
	return {
		bme280: {
			temperature: 22.09,
			humidity: 68.4541,
			pressure: 995.2168,
		},
		soilMoisture: [
			{
				id: 0,
				raw: 2649,
				percent: 0,
			},
			{
				id: 1,
				raw: 25,
				percent: 100,
			},
			{
				id: 2,
				raw: 7,
				percent: 100,
			},
		],
	} satisfies IEsp32Sensors;
}

export function getMockSystem() {
	return {
		'chipModel': 'ESP32-D0WD-V3',
		'chipRevision': 3,
		'cpuCores': 2,
		'cpuFrequencyMhz': 240,
		'uptimeSeconds': 18,
		'freeHeap': 241920,
		'totalHeap': 326852,
		'minimumFreeHeap': 225920,
		'flashSize': 4194304,
		'sketchSize': 867344,
		'freeSketchSpace': 1310720,
		'filesystemTotal': 1441792,
		'filesystemUsed': 180224,
		'ip': '192.168.31.83',
		'gateway': '192.168.31.1',
		'subnet': '255.255.255.0',
		'mac': '00:70:07:A3:CC:E8',
		'wifiRssi': -64,
		'chipTemperature': 39.44444,
	} satisfies IEsp32SystemInfo;
}

export function getMockTime(): IEsp32Time {
	return {
		unix: Date.now(),
		lostPower: true,
	};
}

export function getMockSchedules(): IScheduleInfo {
	return structuredClone(mockSchedule);
}

export function addMockSchedule(lampId: number, channel: TLampChannel, entry: IScheduleEntry): IScheduleInfo {
	const candidate = mockSchedule.lamps.find((lamp) => lamp.id === lampId);

	if (!candidate) {
		return getMockSchedules();
	}

	candidate[channel].push(entry);

	return getMockSchedules();
}

export function updateMockSchedule(lampId: number, channel: TLampChannel, index: number, entry: IScheduleEntry): IScheduleInfo {
	const candidate = mockSchedule.lamps.find((lamp) => lamp.id === lampId);

	if (!candidate) {
		return getMockSchedules();
	}

	candidate[channel][index] = entry;

	return getMockSchedules();
}

export function deleteMockSchedule(lampId: number, channel: TLampChannel, index: number): IScheduleInfo {
	const candidate = mockSchedule.lamps.find((lamp) => lamp.id === lampId);

	if (!candidate) {
		return getMockSchedules();
	}

	candidate[channel] = candidate[channel].toSpliced(index, 1);

	return getMockSchedules();
}