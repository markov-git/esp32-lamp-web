import type { TAppTabId } from '../types/app.ts';
import { Button, Stack, Text } from '@mantine/core';

interface IProps {
	activeTab: TAppTabId;

	onChangeActiveTab: (activeTab: TAppTabId) => void;
}

export const Sidebar = (props: IProps) => {

	const renderTab = (tab: TAppTabId, caption: string) => {
		return (
			<Button
				fullWidth
				size="md"
				variant={tab === props.activeTab ? 'filled' : 'outline'}
				onClick={ () => props.onChangeActiveTab(tab) }
			>{caption}</Button>
		);
	};

	return (
		<aside className="sidebar">
			<div className="brand">
				<div className="brand-mark">✦</div>

				<Stack gap="xs">
					<Text>ESP32 Grow</Text>
					<Text size="xs">Управление растениями</Text>
				</Stack>
			</div>

			<Stack>
				{ renderTab('dashboard', 'Панель') }
				{ renderTab('schedule', 'Расписание') }
				{ renderTab('settings', 'Настройки') }
			</Stack>

			<div className="connection-card">
				<div className="status-dot"></div>
				<div>
					<strong>ESP32 онлайн</strong>
					<span id="esp-ip">todo</span>
					<span id="last-update">Обновление: todo</span>
				</div>
			</div>
		</aside>
	);
};