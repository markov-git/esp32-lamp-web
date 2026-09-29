import type { IAppSensorTimeValue } from '../types/app.ts';

export function averageBy(data: IAppSensorTimeValue[], groupSize: number): IAppSensorTimeValue[] {
	return Array.from(
		{ length: Math.ceil(data.length / groupSize) },
		(_, i) => {
			const group = data.slice(i * groupSize, i * groupSize + groupSize);

			return {
				...group[0],
				value: group.reduce((sum, item) => sum + item.value, 0) / group.length
			};
		}
	);
}