

export function formatTemperature(value: number | undefined): string {
	if (typeof value !== 'number') {
		return '-';
	}
	return `${value.toFixed(1)} °C`;
}


export function formatPressure(value: number | undefined): string {
	if (typeof value !== 'number') {
		return '-';
	}
	return `${(value * 0.75006375541921).toFixed(0)} мм рт ст`;
}

export function formatHumidity(value: number | undefined): string {
	if (typeof value !== 'number') {
		return '-';
	}
	return `${value.toFixed(1)}%`;
}