export function formatBytes(bytes: number) {
	if (bytes === 0) return '0 Б';

	const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	const value = bytes / Math.pow(1024, i);

	const formatted = new Intl.NumberFormat('ru-RU', {
		maximumFractionDigits: 2,
	}).format(value);

	return `${formatted} ${units[i]}`;
}