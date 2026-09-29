import type { IScheduleEntry, TLampChannel } from './esp32.ts';

export type TAppTabId = 'dashboard' | 'schedule' | 'settings';

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

export type TAppSensorName = 'temperature' | 'humidity' | 'pressure' | 'soil1' | 'soil2' | 'soil3';

export type IAppSensorsHistory = Record<TAppSensorName, IAppSensorTimeValue[]>;

export interface IAppSensorTimeValue {
	timestamp: number;
	value: number;
}