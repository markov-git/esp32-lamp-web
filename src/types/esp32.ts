export interface IEsp32State {
	lamps: ILampState[];
	time: IEsp32Time;
}

export interface IEsp32Time {
	unix: number;
	lostPower: boolean;
}

export interface ILampState {
	id: number;
	// текущие значения подаваемые на лампу
	current: ILampChannelsState;
	// ручные значения
	manual: ILampChannelsState;
	// для лампы включено расписание
	scheduleEnabled: boolean;
}

export type ILampChannelsState = Record<TLampChannel, number>;

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
	chipModel: string;
	chipRevision: number;
	cpuCores: number;
	cpuFrequencyMhz: number;
	uptimeSeconds: number;

	freeHeap: number;
	totalHeap: number;
	minimumFreeHeap: number;

	flashSize: number;

	sketchSize: number;
	freeSketchSpace: number;

	filesystemTotal: number;
	filesystemUsed: number;

	ip: string;
	gateway: string;
	subnet: string;
	mac: string;
	wifiRssi: number;

	chipTemperature: number;
}

export interface IScheduleInfo {
	lamps: ILampSchedule[];
}

export interface ILampSchedule {
	lampId: number;
	enabled: boolean;
	blue: IScheduleEntry[];
	red: IScheduleEntry[];
}

export interface IScheduleEntry {
	brightness: number;
	days: number;
	end: number;
	start: number;
	fadeIn: number;
	fadeOut: number;
}

export type THistoryRange = 'day' | 'month' | 'all';

export interface IEsp32History {
	range: THistoryRange;
	records: IEsp32HistoryRecord[];
}

export interface IEsp32HistoryRecord {
	// sec
	timestamp: number;
	temperature: number;
	humidity: number;
	pressure: number;
	soil: IHistorySoilEntry[];
}

export interface IHistorySoilEntry {
	percent: number;
	raw: number;
}