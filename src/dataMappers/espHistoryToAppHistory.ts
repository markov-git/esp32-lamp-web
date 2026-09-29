import type { IAppSensorsHistory } from '../types/app.ts';
import type { IEsp32History } from '../types/esp32.ts';
import { averageBy } from '../utils/array.ts';

export function mapEspHistoryToAppHistory(espHistory: IEsp32History): IAppSensorsHistory {
	const result: IAppSensorsHistory = {
		temperature: [],
		humidity: [],
		pressure: [],
		soil1: [],
		soil2: [],
		soil3: [],
	};

	for (const record of espHistory.records) {
		const timestamp = record.timestamp * 1000;
		result.temperature.push({
			timestamp,
			value: record.temperature,
		});
		result.humidity.push({
			timestamp,
			value: record.humidity,
		});
		result.pressure.push({
			timestamp,
			value: record.pressure,
		});
		result.soil1.push({
			timestamp,
			value: record.soil[0].percent,
		});
		result.soil2.push({
			timestamp,
			value: record.soil[1].percent,
		});
		result.soil3.push({
			timestamp,
			value: record.soil[2].percent,
		});
	}

	return {
		temperature: averageBy(result.temperature, 3),
		humidity: averageBy(result.humidity, 3),
		pressure: averageBy(result.pressure, 3),
		soil1: averageBy(result.soil1, 3),
		soil2: averageBy(result.soil2, 3),
		soil3: averageBy(result.soil3, 3),
	};
}