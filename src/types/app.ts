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