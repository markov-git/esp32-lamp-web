import type {
	IEsp32History,
	IEsp32Sensors,
	IEsp32State,
	IEsp32SystemInfo,
	IEsp32Time, IScheduleEntry,
	IScheduleInfo, THistoryRange,
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
			lampId: 1,
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
			lampId: 2,
			enabled: true,
			red: [],
			blue: [],
		},
		{
			lampId: 3,
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
	const lampSchedule = mockSchedule.lamps.find((lamp) => lamp.lampId === lampId);
	if (!lamp || !lampSchedule) {
		return getMockState();
	}

	lamp.scheduleEnabled = value;
	lampSchedule.enabled = value;

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
	const candidate = mockSchedule.lamps.find((lamp) => lamp.lampId === lampId);

	if (!candidate) {
		return getMockSchedules();
	}

	candidate[channel].push(entry);

	return getMockSchedules();
}

export function updateMockSchedule(lampId: number, channel: TLampChannel, index: number, entry: IScheduleEntry): IScheduleInfo {
	const candidate = mockSchedule.lamps.find((lamp) => lamp.lampId === lampId);

	if (!candidate) {
		return getMockSchedules();
	}

	candidate[channel][index] = entry;

	return getMockSchedules();
}

export function deleteMockSchedule(lampId: number, channel: TLampChannel, index: number): IScheduleInfo {
	const candidate = mockSchedule.lamps.find((lamp) => lamp.lampId === lampId);

	if (!candidate) {
		return getMockSchedules();
	}

	candidate[channel] = candidate[channel].toSpliced(index, 1);

	return getMockSchedules();
}

export function getMockHistory(range: THistoryRange): IEsp32History {
	return {
		range,
		records: [
			{
				'timestamp': 1790626452,
				'temperature': 21.29,
				'humidity': 66.67,
				'pressure': 1015.32,
				'soil': [
					{
						'raw': 2262,
						'percent': 68,
					},
					{
						'raw': 63,
						'percent': 100,
					},
					{
						'raw': 756,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790626611,
				'temperature': 21.28,
				'humidity': 66.69,
				'pressure': 1015.32,
				'soil': [
					{
						'raw': 2254,
						'percent': 71,
					},
					{
						'raw': 64,
						'percent': 100,
					},
					{
						'raw': 765,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790626623,
				'temperature': 21.26,
				'humidity': 66.83,
				'pressure': 1015.34,
				'soil': [
					{
						'raw': 2258,
						'percent': 70,
					},
					{
						'raw': 6,
						'percent': 100,
					},
					{
						'raw': 692,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790628130,
				'temperature': 21.12,
				'humidity': 66.65,
				'pressure': 1015.28,
				'soil': [
					{
						'raw': 2210,
						'percent': 86,
					},
					{
						'raw': 80,
						'percent': 100,
					},
					{
						'raw': 48,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790628248,
				'temperature': 21.14,
				'humidity': 67.18,
				'pressure': 1015.26,
				'soil': [
					{
						'raw': 2253,
						'percent': 71,
					},
					{
						'raw': 216,
						'percent': 100,
					},
					{
						'raw': 439,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790628848,
				'temperature': 20.45,
				'humidity': 67.37,
				'pressure': 1015.35,
				'soil': [
					{
						'raw': 2270,
						'percent': 65,
					},
					{
						'raw': 255,
						'percent': 100,
					},
					{
						'raw': 115,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790629448,
				'temperature': 20.36,
				'humidity': 67.68,
				'pressure': 1015.38,
				'soil': [
					{
						'raw': 2263,
						'percent': 68,
					},
					{
						'raw': 435,
						'percent': 100,
					},
					{
						'raw': 226,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790630048,
				'temperature': 20.28,
				'humidity': 67.39,
				'pressure': 1015.41,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 340,
						'percent': 100,
					},
					{
						'raw': 164,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790630648,
				'temperature': 20.24,
				'humidity': 67.55,
				'pressure': 1015.36,
				'soil': [
					{
						'raw': 2266,
						'percent': 67,
					},
					{
						'raw': 432,
						'percent': 100,
					},
					{
						'raw': 179,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790631248,
				'temperature': 20.15,
				'humidity': 67.93,
				'pressure': 1015.36,
				'soil': [
					{
						'raw': 2241,
						'percent': 75,
					},
					{
						'raw': 303,
						'percent': 100,
					},
					{
						'raw': 142,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790631848,
				'temperature': 20.08,
				'humidity': 67.48,
				'pressure': 1015.31,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 332,
						'percent': 100,
					},
					{
						'raw': 218,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790632448,
				'temperature': 20.05,
				'humidity': 67.58,
				'pressure': 1015.32,
				'soil': [
					{
						'raw': 2258,
						'percent': 70,
					},
					{
						'raw': 464,
						'percent': 100,
					},
					{
						'raw': 243,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790633048,
				'temperature': 20.01,
				'humidity': 67.54,
				'pressure': 1015.31,
				'soil': [
					{
						'raw': 2270,
						'percent': 65,
					},
					{
						'raw': 479,
						'percent': 100,
					},
					{
						'raw': 251,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790633648,
				'temperature': 19.98,
				'humidity': 67.82,
				'pressure': 1015.35,
				'soil': [
					{
						'raw': 2246,
						'percent': 74,
					},
					{
						'raw': 256,
						'percent': 100,
					},
					{
						'raw': 137,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790634248,
				'temperature': 19.97,
				'humidity': 67.44,
				'pressure': 1015.36,
				'soil': [
					{
						'raw': 2254,
						'percent': 71,
					},
					{
						'raw': 262,
						'percent': 100,
					},
					{
						'raw': 136,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790634848,
				'temperature': 19.94,
				'humidity': 67.44,
				'pressure': 1015.38,
				'soil': [
					{
						'raw': 2262,
						'percent': 68,
					},
					{
						'raw': 259,
						'percent': 100,
					},
					{
						'raw': 159,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790635448,
				'temperature': 19.92,
				'humidity': 67.51,
				'pressure': 1015.52,
				'soil': [
					{
						'raw': 2260,
						'percent': 69,
					},
					{
						'raw': 478,
						'percent': 100,
					},
					{
						'raw': 254,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790636048,
				'temperature': 19.9,
				'humidity': 67.54,
				'pressure': 1015.5,
				'soil': [
					{
						'raw': 2255,
						'percent': 71,
					},
					{
						'raw': 343,
						'percent': 100,
					},
					{
						'raw': 220,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790636648,
				'temperature': 19.89,
				'humidity': 67.38,
				'pressure': 1015.51,
				'soil': [
					{
						'raw': 2238,
						'percent': 76,
					},
					{
						'raw': 438,
						'percent': 100,
					},
					{
						'raw': 262,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790637248,
				'temperature': 19.86,
				'humidity': 67.22,
				'pressure': 1015.45,
				'soil': [
					{
						'raw': 2264,
						'percent': 68,
					},
					{
						'raw': 470,
						'percent': 100,
					},
					{
						'raw': 279,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790637848,
				'temperature': 19.86,
				'humidity': 67.4,
				'pressure': 1015.45,
				'soil': [
					{
						'raw': 2248,
						'percent': 73,
					},
					{
						'raw': 450,
						'percent': 100,
					},
					{
						'raw': 272,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790638448,
				'temperature': 19.85,
				'humidity': 67.24,
				'pressure': 1015.52,
				'soil': [
					{
						'raw': 2244,
						'percent': 74,
					},
					{
						'raw': 467,
						'percent': 100,
					},
					{
						'raw': 204,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790639048,
				'temperature': 19.84,
				'humidity': 67.34,
				'pressure': 1015.52,
				'soil': [
					{
						'raw': 2262,
						'percent': 68,
					},
					{
						'raw': 281,
						'percent': 100,
					},
					{
						'raw': 172,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790639648,
				'temperature': 19.84,
				'humidity': 67.5,
				'pressure': 1015.6,
				'soil': [
					{
						'raw': 2251,
						'percent': 72,
					},
					{
						'raw': 272,
						'percent': 100,
					},
					{
						'raw': 154,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790640248,
				'temperature': 19.82,
				'humidity': 67.18,
				'pressure': 1015.6,
				'soil': [
					{
						'raw': 2240,
						'percent': 76,
					},
					{
						'raw': 490,
						'percent': 100,
					},
					{
						'raw': 209,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790640848,
				'temperature': 19.82,
				'humidity': 67.36,
				'pressure': 1015.59,
				'soil': [
					{
						'raw': 2269,
						'percent': 66,
					},
					{
						'raw': 284,
						'percent': 100,
					},
					{
						'raw': 159,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790641448,
				'temperature': 19.82,
				'humidity': 66.77,
				'pressure': 1015.61,
				'soil': [
					{
						'raw': 2234,
						'percent': 78,
					},
					{
						'raw': 303,
						'percent': 100,
					},
					{
						'raw': 189,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790642048,
				'temperature': 19.8,
				'humidity': 67.35,
				'pressure': 1015.65,
				'soil': [
					{
						'raw': 2259,
						'percent': 69,
					},
					{
						'raw': 384,
						'percent': 100,
					},
					{
						'raw': 243,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790642648,
				'temperature': 19.8,
				'humidity': 66.72,
				'pressure': 1015.64,
				'soil': [
					{
						'raw': 2251,
						'percent': 72,
					},
					{
						'raw': 353,
						'percent': 100,
					},
					{
						'raw': 151,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790643248,
				'temperature': 19.78,
				'humidity': 67.06,
				'pressure': 1015.6,
				'soil': [
					{
						'raw': 2257,
						'percent': 70,
					},
					{
						'raw': 490,
						'percent': 100,
					},
					{
						'raw': 283,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790643848,
				'temperature': 19.77,
				'humidity': 66.75,
				'pressure': 1015.56,
				'soil': [
					{
						'raw': 2258,
						'percent': 70,
					},
					{
						'raw': 303,
						'percent': 100,
					},
					{
						'raw': 136,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790644448,
				'temperature': 19.75,
				'humidity': 67.31,
				'pressure': 1015.49,
				'soil': [
					{
						'raw': 2266,
						'percent': 67,
					},
					{
						'raw': 407,
						'percent': 100,
					},
					{
						'raw': 256,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790645048,
				'temperature': 19.73,
				'humidity': 66.78,
				'pressure': 1015.51,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 453,
						'percent': 100,
					},
					{
						'raw': 219,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790645648,
				'temperature': 19.73,
				'humidity': 66.85,
				'pressure': 1015.48,
				'soil': [
					{
						'raw': 2235,
						'percent': 77,
					},
					{
						'raw': 302,
						'percent': 100,
					},
					{
						'raw': 133,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790646248,
				'temperature': 19.72,
				'humidity': 66.73,
				'pressure': 1015.51,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 499,
						'percent': 100,
					},
					{
						'raw': 277,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790646848,
				'temperature': 19.71,
				'humidity': 66.65,
				'pressure': 1015.48,
				'soil': [
					{
						'raw': 2251,
						'percent': 72,
					},
					{
						'raw': 354,
						'percent': 100,
					},
					{
						'raw': 157,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790647448,
				'temperature': 19.7,
				'humidity': 67.12,
				'pressure': 1015.44,
				'soil': [
					{
						'raw': 2257,
						'percent': 70,
					},
					{
						'raw': 448,
						'percent': 100,
					},
					{
						'raw': 272,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790648048,
				'temperature': 19.7,
				'humidity': 66.72,
				'pressure': 1015.49,
				'soil': [
					{
						'raw': 2235,
						'percent': 77,
					},
					{
						'raw': 306,
						'percent': 100,
					},
					{
						'raw': 98,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790648648,
				'temperature': 19.68,
				'humidity': 66.7,
				'pressure': 1015.49,
				'soil': [
					{
						'raw': 2253,
						'percent': 71,
					},
					{
						'raw': 308,
						'percent': 100,
					},
					{
						'raw': 194,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790649248,
				'temperature': 19.68,
				'humidity': 66.48,
				'pressure': 1015.54,
				'soil': [
					{
						'raw': 2242,
						'percent': 75,
					},
					{
						'raw': 479,
						'percent': 100,
					},
					{
						'raw': 279,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790649848,
				'temperature': 19.66,
				'humidity': 66.78,
				'pressure': 1015.65,
				'soil': [
					{
						'raw': 2249,
						'percent': 73,
					},
					{
						'raw': 273,
						'percent': 100,
					},
					{
						'raw': 113,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790650448,
				'temperature': 19.65,
				'humidity': 66.02,
				'pressure': 1015.71,
				'soil': [
					{
						'raw': 2247,
						'percent': 73,
					},
					{
						'raw': 272,
						'percent': 100,
					},
					{
						'raw': 155,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790651048,
				'temperature': 19.63,
				'humidity': 66.9,
				'pressure': 1015.73,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 362,
						'percent': 100,
					},
					{
						'raw': 164,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790651648,
				'temperature': 19.62,
				'humidity': 66.15,
				'pressure': 1015.7,
				'soil': [
					{
						'raw': 2254,
						'percent': 71,
					},
					{
						'raw': 295,
						'percent': 100,
					},
					{
						'raw': 178,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790652248,
				'temperature': 19.61,
				'humidity': 66.39,
				'pressure': 1015.73,
				'soil': [
					{
						'raw': 2255,
						'percent': 71,
					},
					{
						'raw': 315,
						'percent': 100,
					},
					{
						'raw': 190,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790652848,
				'temperature': 19.61,
				'humidity': 66.1,
				'pressure': 1015.73,
				'soil': [
					{
						'raw': 2238,
						'percent': 76,
					},
					{
						'raw': 299,
						'percent': 100,
					},
					{
						'raw': 134,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790653448,
				'temperature': 19.6,
				'humidity': 65.83,
				'pressure': 1015.81,
				'soil': [
					{
						'raw': 2245,
						'percent': 74,
					},
					{
						'raw': 465,
						'percent': 100,
					},
					{
						'raw': 243,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790654048,
				'temperature': 19.6,
				'humidity': 65.72,
				'pressure': 1015.82,
				'soil': [
					{
						'raw': 2242,
						'percent': 75,
					},
					{
						'raw': 289,
						'percent': 100,
					},
					{
						'raw': 126,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790654648,
				'temperature': 19.65,
				'humidity': 65.82,
				'pressure': 1015.81,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 400,
						'percent': 100,
					},
					{
						'raw': 79,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790655248,
				'temperature': 19.89,
				'humidity': 64.59,
				'pressure': 1015.85,
				'soil': [
					{
						'raw': 2240,
						'percent': 76,
					},
					{
						'raw': 384,
						'percent': 100,
					},
					{
						'raw': 243,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790655848,
				'temperature': 19.99,
				'humidity': 64.63,
				'pressure': 1015.84,
				'soil': [
					{
						'raw': 2252,
						'percent': 72,
					},
					{
						'raw': 443,
						'percent': 100,
					},
					{
						'raw': 255,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790656448,
				'temperature': 20.05,
				'humidity': 64.6,
				'pressure': 1015.92,
				'soil': [
					{
						'raw': 2264,
						'percent': 68,
					},
					{
						'raw': 453,
						'percent': 100,
					},
					{
						'raw': 224,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790657048,
				'temperature': 20.09,
				'humidity': 64.46,
				'pressure': 1015.89,
				'soil': [
					{
						'raw': 2259,
						'percent': 69,
					},
					{
						'raw': 466,
						'percent': 100,
					},
					{
						'raw': 242,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790657648,
				'temperature': 20.07,
				'humidity': 64.14,
				'pressure': 1015.9,
				'soil': [
					{
						'raw': 2259,
						'percent': 69,
					},
					{
						'raw': 328,
						'percent': 100,
					},
					{
						'raw': 83,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790658248,
				'temperature': 20.12,
				'humidity': 64.04,
				'pressure': 1015.9,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 388,
						'percent': 100,
					},
					{
						'raw': 240,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790658848,
				'temperature': 20.2,
				'humidity': 63.71,
				'pressure': 1015.99,
				'soil': [
					{
						'raw': 2269,
						'percent': 66,
					},
					{
						'raw': 418,
						'percent': 100,
					},
					{
						'raw': 262,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790659448,
				'temperature': 20.27,
				'humidity': 63.94,
				'pressure': 1016.05,
				'soil': [
					{
						'raw': 2259,
						'percent': 69,
					},
					{
						'raw': 243,
						'percent': 100,
					},
					{
						'raw': 95,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790660048,
				'temperature': 20.19,
				'humidity': 64.07,
				'pressure': 1016.06,
				'soil': [
					{
						'raw': 2266,
						'percent': 67,
					},
					{
						'raw': 470,
						'percent': 100,
					},
					{
						'raw': 281,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790660648,
				'temperature': 20.17,
				'humidity': 64.11,
				'pressure': 1016.03,
				'soil': [
					{
						'raw': 2251,
						'percent': 72,
					},
					{
						'raw': 420,
						'percent': 100,
					},
					{
						'raw': 208,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790661248,
				'temperature': 20.14,
				'humidity': 63.99,
				'pressure': 1016.01,
				'soil': [
					{
						'raw': 2260,
						'percent': 69,
					},
					{
						'raw': 426,
						'percent': 100,
					},
					{
						'raw': 201,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790661848,
				'temperature': 20.11,
				'humidity': 64.72,
				'pressure': 1016.02,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 290,
						'percent': 100,
					},
					{
						'raw': 190,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790662448,
				'temperature': 20.06,
				'humidity': 64.54,
				'pressure': 1015.98,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 256,
						'percent': 100,
					},
					{
						'raw': 130,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790663048,
				'temperature': 20.04,
				'humidity': 64.35,
				'pressure': 1016.01,
				'soil': [
					{
						'raw': 2254,
						'percent': 71,
					},
					{
						'raw': 303,
						'percent': 100,
					},
					{
						'raw': 144,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790663648,
				'temperature': 20.01,
				'humidity': 64.7,
				'pressure': 1016.02,
				'soil': [
					{
						'raw': 2242,
						'percent': 75,
					},
					{
						'raw': 325,
						'percent': 100,
					},
					{
						'raw': 188,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790664248,
				'temperature': 20,
				'humidity': 63.99,
				'pressure': 1015.99,
				'soil': [
					{
						'raw': 2239,
						'percent': 76,
					},
					{
						'raw': 473,
						'percent': 100,
					},
					{
						'raw': 245,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790664848,
				'temperature': 20.03,
				'humidity': 64.99,
				'pressure': 1015.97,
				'soil': [
					{
						'raw': 2241,
						'percent': 75,
					},
					{
						'raw': 482,
						'percent': 100,
					},
					{
						'raw': 282,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790665448,
				'temperature': 20.02,
				'humidity': 64.83,
				'pressure': 1015.93,
				'soil': [
					{
						'raw': 2247,
						'percent': 73,
					},
					{
						'raw': 388,
						'percent': 100,
					},
					{
						'raw': 144,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790666048,
				'temperature': 19.99,
				'humidity': 65.62,
				'pressure': 1015.95,
				'soil': [
					{
						'raw': 2240,
						'percent': 76,
					},
					{
						'raw': 277,
						'percent': 100,
					},
					{
						'raw': 170,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790666576,
				'temperature': 20.63,
				'humidity': 64.93,
				'pressure': 1015.89,
				'soil': [
					{
						'raw': 2242,
						'percent': 75,
					},
					{
						'raw': 186,
						'percent': 100,
					},
					{
						'raw': 528,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790667176,
				'temperature': 20.86,
				'humidity': 63.57,
				'pressure': 1015.93,
				'soil': [
					{
						'raw': 2254,
						'percent': 71,
					},
					{
						'raw': 503,
						'percent': 100,
					},
					{
						'raw': 291,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790667776,
				'temperature': 20.73,
				'humidity': 64.96,
				'pressure': 1015.89,
				'soil': [
					{
						'raw': 2264,
						'percent': 68,
					},
					{
						'raw': 494,
						'percent': 100,
					},
					{
						'raw': 284,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790668376,
				'temperature': 20.66,
				'humidity': 64.97,
				'pressure': 1015.89,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 496,
						'percent': 100,
					},
					{
						'raw': 278,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790668976,
				'temperature': 20.55,
				'humidity': 64.64,
				'pressure': 1015.86,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 319,
						'percent': 100,
					},
					{
						'raw': 208,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790669576,
				'temperature': 20.76,
				'humidity': 64.97,
				'pressure': 1015.89,
				'soil': [
					{
						'raw': 2266,
						'percent': 67,
					},
					{
						'raw': 276,
						'percent': 100,
					},
					{
						'raw': 175,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790670176,
				'temperature': 21.31,
				'humidity': 63.88,
				'pressure': 1015.95,
				'soil': [
					{
						'raw': 2246,
						'percent': 74,
					},
					{
						'raw': 261,
						'percent': 100,
					},
					{
						'raw': 127,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790670776,
				'temperature': 21.34,
				'humidity': 63.8,
				'pressure': 1015.93,
				'soil': [
					{
						'raw': 2253,
						'percent': 71,
					},
					{
						'raw': 453,
						'percent': 100,
					},
					{
						'raw': 282,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790671376,
				'temperature': 20.94,
				'humidity': 64.11,
				'pressure': 1015.86,
				'soil': [
					{
						'raw': 2258,
						'percent': 70,
					},
					{
						'raw': 246,
						'percent': 100,
					},
					{
						'raw': 102,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790671976,
				'temperature': 21.05,
				'humidity': 63.74,
				'pressure': 1015.86,
				'soil': [
					{
						'raw': 2241,
						'percent': 75,
					},
					{
						'raw': 291,
						'percent': 100,
					},
					{
						'raw': 189,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790672576,
				'temperature': 21.27,
				'humidity': 64.22,
				'pressure': 1015.83,
				'soil': [
					{
						'raw': 2267,
						'percent': 67,
					},
					{
						'raw': 420,
						'percent': 100,
					},
					{
						'raw': 272,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790673176,
				'temperature': 21.55,
				'humidity': 62.83,
				'pressure': 1015.82,
				'soil': [
					{
						'raw': 2245,
						'percent': 74,
					},
					{
						'raw': 251,
						'percent': 100,
					},
					{
						'raw': 67,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790673776,
				'temperature': 21.56,
				'humidity': 63.34,
				'pressure': 1015.83,
				'soil': [
					{
						'raw': 2255,
						'percent': 71,
					},
					{
						'raw': 464,
						'percent': 100,
					},
					{
						'raw': 275,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790674376,
				'temperature': 20.86,
				'humidity': 64.47,
				'pressure': 1015.78,
				'soil': [
					{
						'raw': 2247,
						'percent': 73,
					},
					{
						'raw': 471,
						'percent': 100,
					},
					{
						'raw': 260,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790674976,
				'temperature': 20.49,
				'humidity': 65.25,
				'pressure': 1015.72,
				'soil': [
					{
						'raw': 2257,
						'percent': 70,
					},
					{
						'raw': 293,
						'percent': 100,
					},
					{
						'raw': 161,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790675576,
				'temperature': 20.33,
				'humidity': 64.86,
				'pressure': 1015.59,
				'soil': [
					{
						'raw': 2242,
						'percent': 75,
					},
					{
						'raw': 303,
						'percent': 100,
					},
					{
						'raw': 192,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790676176,
				'temperature': 20.25,
				'humidity': 64.35,
				'pressure': 1015.5,
				'soil': [
					{
						'raw': 2254,
						'percent': 71,
					},
					{
						'raw': 433,
						'percent': 100,
					},
					{
						'raw': 208,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790676776,
				'temperature': 20.19,
				'humidity': 64.88,
				'pressure': 1015.52,
				'soil': [
					{
						'raw': 2240,
						'percent': 76,
					},
					{
						'raw': 443,
						'percent': 100,
					},
					{
						'raw': 273,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790677376,
				'temperature': 20.23,
				'humidity': 65.02,
				'pressure': 1015.49,
				'soil': [
					{
						'raw': 2247,
						'percent': 73,
					},
					{
						'raw': 451,
						'percent': 100,
					},
					{
						'raw': 221,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790677976,
				'temperature': 21.65,
				'humidity': 61.38,
				'pressure': 1015.44,
				'soil': [
					{
						'raw': 2231,
						'percent': 79,
					},
					{
						'raw': 240,
						'percent': 100,
					},
					{
						'raw': 163,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790678576,
				'temperature': 21.45,
				'humidity': 62.33,
				'pressure': 1015.47,
				'soil': [
					{
						'raw': 2257,
						'percent': 70,
					},
					{
						'raw': 369,
						'percent': 100,
					},
					{
						'raw': 180,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790679176,
				'temperature': 21.53,
				'humidity': 62.23,
				'pressure': 1015.39,
				'soil': [
					{
						'raw': 2253,
						'percent': 71,
					},
					{
						'raw': 465,
						'percent': 100,
					},
					{
						'raw': 272,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790679776,
				'temperature': 21.44,
				'humidity': 61.97,
				'pressure': 1015.36,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 280,
						'percent': 100,
					},
					{
						'raw': 185,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790680376,
				'temperature': 21.23,
				'humidity': 60.72,
				'pressure': 1015.38,
				'soil': [
					{
						'raw': 2241,
						'percent': 75,
					},
					{
						'raw': 390,
						'percent': 100,
					},
					{
						'raw': 254,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790680976,
				'temperature': 20.93,
				'humidity': 61.46,
				'pressure': 1015.33,
				'soil': [
					{
						'raw': 2241,
						'percent': 75,
					},
					{
						'raw': 272,
						'percent': 100,
					},
					{
						'raw': 146,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790681576,
				'temperature': 20.94,
				'humidity': 60.81,
				'pressure': 1015.31,
				'soil': [
					{
						'raw': 2243,
						'percent': 75,
					},
					{
						'raw': 433,
						'percent': 100,
					},
					{
						'raw': 220,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790682176,
				'temperature': 20.97,
				'humidity': 61,
				'pressure': 1015.34,
				'soil': [
					{
						'raw': 2251,
						'percent': 72,
					},
					{
						'raw': 294,
						'percent': 100,
					},
					{
						'raw': 181,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790682776,
				'temperature': 20.86,
				'humidity': 60.89,
				'pressure': 1015.29,
				'soil': [
					{
						'raw': 2225,
						'percent': 81,
					},
					{
						'raw': 439,
						'percent': 100,
					},
					{
						'raw': 187,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790683376,
				'temperature': 20.87,
				'humidity': 60.48,
				'pressure': 1015.23,
				'soil': [
					{
						'raw': 2259,
						'percent': 69,
					},
					{
						'raw': 265,
						'percent': 100,
					},
					{
						'raw': 158,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790683976,
				'temperature': 20.9,
				'humidity': 60.03,
				'pressure': 1015.12,
				'soil': [
					{
						'raw': 2254,
						'percent': 71,
					},
					{
						'raw': 262,
						'percent': 100,
					},
					{
						'raw': 160,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790684576,
				'temperature': 20.87,
				'humidity': 60.21,
				'pressure': 1015.2,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 410,
						'percent': 100,
					},
					{
						'raw': 201,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790685176,
				'temperature': 20.96,
				'humidity': 59.43,
				'pressure': 1015.17,
				'soil': [
					{
						'raw': 2247,
						'percent': 73,
					},
					{
						'raw': 327,
						'percent': 100,
					},
					{
						'raw': 222,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790685776,
				'temperature': 21.03,
				'humidity': 59.06,
				'pressure': 1015.12,
				'soil': [
					{
						'raw': 2254,
						'percent': 71,
					},
					{
						'raw': 304,
						'percent': 100,
					},
					{
						'raw': 197,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790686376,
				'temperature': 21.03,
				'humidity': 59.3,
				'pressure': 1015.1,
				'soil': [
					{
						'raw': 2249,
						'percent': 73,
					},
					{
						'raw': 479,
						'percent': 100,
					},
					{
						'raw': 285,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790686976,
				'temperature': 20.96,
				'humidity': 60.21,
				'pressure': 1015.05,
				'soil': [
					{
						'raw': 2248,
						'percent': 73,
					},
					{
						'raw': 471,
						'percent': 100,
					},
					{
						'raw': 267,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790687576,
				'temperature': 20.92,
				'humidity': 58.98,
				'pressure': 1015.08,
				'soil': [
					{
						'raw': 2227,
						'percent': 80,
					},
					{
						'raw': 465,
						'percent': 100,
					},
					{
						'raw': 254,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790688176,
				'temperature': 20.48,
				'humidity': 60.92,
				'pressure': 1015.09,
				'soil': [
					{
						'raw': 2253,
						'percent': 71,
					},
					{
						'raw': 288,
						'percent': 100,
					},
					{
						'raw': 138,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790688776,
				'temperature': 20.9,
				'humidity': 59.97,
				'pressure': 1015.16,
				'soil': [
					{
						'raw': 2237,
						'percent': 77,
					},
					{
						'raw': 464,
						'percent': 100,
					},
					{
						'raw': 237,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790689376,
				'temperature': 21.34,
				'humidity': 60.58,
				'pressure': 1015.2,
				'soil': [
					{
						'raw': 2246,
						'percent': 74,
					},
					{
						'raw': 247,
						'percent': 100,
					},
					{
						'raw': 144,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790689976,
				'temperature': 21.01,
				'humidity': 61.45,
				'pressure': 1015.26,
				'soil': [
					{
						'raw': 2240,
						'percent': 76,
					},
					{
						'raw': 262,
						'percent': 100,
					},
					{
						'raw': 128,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790690576,
				'temperature': 20.87,
				'humidity': 61.35,
				'pressure': 1015.28,
				'soil': [
					{
						'raw': 2246,
						'percent': 74,
					},
					{
						'raw': 271,
						'percent': 100,
					},
					{
						'raw': 75,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790691176,
				'temperature': 20.72,
				'humidity': 62.02,
				'pressure': 1015.3,
				'soil': [
					{
						'raw': 2239,
						'percent': 76,
					},
					{
						'raw': 382,
						'percent': 100,
					},
					{
						'raw': 253,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790691776,
				'temperature': 20.73,
				'humidity': 61.93,
				'pressure': 1015.41,
				'soil': [
					{
						'raw': 2256,
						'percent': 70,
					},
					{
						'raw': 282,
						'percent': 100,
					},
					{
						'raw': 190,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790692376,
				'temperature': 20.93,
				'humidity': 61.04,
				'pressure': 1015.43,
				'soil': [
					{
						'raw': 2241,
						'percent': 75,
					},
					{
						'raw': 448,
						'percent': 100,
					},
					{
						'raw': 179,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790692976,
				'temperature': 20.74,
				'humidity': 60.68,
				'pressure': 1015.44,
				'soil': [
					{
						'raw': 2243,
						'percent': 75,
					},
					{
						'raw': 485,
						'percent': 100,
					},
					{
						'raw': 279,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790693576,
				'temperature': 20.68,
				'humidity': 60.82,
				'pressure': 1015.48,
				'soil': [
					{
						'raw': 2251,
						'percent': 72,
					},
					{
						'raw': 346,
						'percent': 100,
					},
					{
						'raw': 158,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790694176,
				'temperature': 20.68,
				'humidity': 61.04,
				'pressure': 1015.57,
				'soil': [
					{
						'raw': 2243,
						'percent': 75,
					},
					{
						'raw': 307,
						'percent': 100,
					},
					{
						'raw': 196,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790694776,
				'temperature': 20.93,
				'humidity': 59.66,
				'pressure': 1015.69,
				'soil': [
					{
						'raw': 2249,
						'percent': 73,
					},
					{
						'raw': 449,
						'percent': 100,
					},
					{
						'raw': 274,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790695376,
				'temperature': 20.84,
				'humidity': 60.44,
				'pressure': 1015.76,
				'soil': [
					{
						'raw': 2236,
						'percent': 77,
					},
					{
						'raw': 486,
						'percent': 100,
					},
					{
						'raw': 287,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790695976,
				'temperature': 20.61,
				'humidity': 60.64,
				'pressure': 1015.84,
				'soil': [
					{
						'raw': 2240,
						'percent': 76,
					},
					{
						'raw': 246,
						'percent': 100,
					},
					{
						'raw': 146,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790696576,
				'temperature': 20.82,
				'humidity': 59.95,
				'pressure': 1015.91,
				'soil': [
					{
						'raw': 2251,
						'percent': 72,
					},
					{
						'raw': 482,
						'percent': 100,
					},
					{
						'raw': 266,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790697176,
				'temperature': 21.61,
				'humidity': 59.59,
				'pressure': 1015.96,
				'soil': [
					{
						'raw': 2245,
						'percent': 74,
					},
					{
						'raw': 246,
						'percent': 100,
					},
					{
						'raw': 167,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790697776,
				'temperature': 21.5,
				'humidity': 57.36,
				'pressure': 1016,
				'soil': [
					{
						'raw': 2261,
						'percent': 69,
					},
					{
						'raw': 343,
						'percent': 100,
					},
					{
						'raw': 170,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790698376,
				'temperature': 21.35,
				'humidity': 58.46,
				'pressure': 1015.98,
				'soil': [
					{
						'raw': 2225,
						'percent': 81,
					},
					{
						'raw': 231,
						'percent': 100,
					},
					{
						'raw': 109,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790698769,
				'temperature': 21.28,
				'humidity': 58.11,
				'pressure': 1016.01,
				'soil': [
					{
						'raw': 2226,
						'percent': 80,
					},
					{
						'raw': 53,
						'percent': 100,
					},
					{
						'raw': 373,
						'percent': 100,
					},
				],
			},
			{
				'timestamp': 1790698805,
				'temperature': 21.2,
				'humidity': 58.27,
				'pressure': 1015.93,
				'soil': [
					{
						'raw': 2241,
						'percent': 75,
					},
					{
						'raw': 59,
						'percent': 100,
					},
					{
						'raw': 370,
						'percent': 100,
					},
				],
			},
		],
	};
}