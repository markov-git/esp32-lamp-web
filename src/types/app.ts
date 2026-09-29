import type { IScheduleEntry, TLampChannel } from './esp32.ts';

export type TAppTabId = 'dashboard' | 'schedule' | 'settings' | 'sensorsHistory';

export interface IEditableEntry {
	// in every modal
	entry: IScheduleEntry;
	// only for new in modal
	lampId: number;
	channel: TLampChannel;
	// hidden in modal
	isNew: boolean;
	entryIndex: number;
}

export type TAppSensorsBME = 'temperature' | 'humidity' | 'pressure';
export type TAppSensorsSoil = 'soil1' | 'soil2' | 'soil3';
export type TAppSensorName = TAppSensorsBME | TAppSensorsSoil;

export type IAppSensorsHistory = Record<TAppSensorName, IAppSensorTimeValue[]>;

export interface IAppSensorsHistoryWithSoilGroup extends Record<TAppSensorsBME, IAppSensorTimeValue[]> {
	soil: IAppSoilTimeHistory[];
}

export interface IAppSensorTimeValue {
	timestamp: number;
	value: number;
}

export interface IAppSoilTimeHistory {
	timestamp: number;
	soil1: number;
	soil2: number;
	soil3: number;
}