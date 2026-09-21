export function formatDuration(totalSeconds: number) {
	const months = Math.floor(totalSeconds / 2592000); // 30 дней
	const days = Math.floor((totalSeconds % 2592000) / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);

	return [
		months && `${months} мес.`,
		days && `${String(days).padStart(2, '0')} д.`,
		hours && `${String(hours).padStart(2, '0')} ч.`,
		`${String(minutes).padStart(2, '0')} мин.`,
		`${String(seconds).padStart(2, '0')} сек.`,
	].filter(Boolean).join(' ');
}

export function formatDate(value: number | undefined): string {
	if (typeof value !== 'number') {
		return '-';
	}
	const date = new Date(value);

	return date.toLocaleString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	}).replace(',', '');
}