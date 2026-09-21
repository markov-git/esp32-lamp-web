import type { TAppTabId } from '../types/app.ts';
import { Alert, Button, Stack, Text } from '@mantine/core';
import { useAppContext } from '../Context.tsx';
import { formatDate } from '../utils/dateTime.ts';

interface IProps {
	activeTab: TAppTabId;

	onChangeActiveTab: (activeTab: TAppTabId) => void;
}

export const Sidebar = (props: IProps) => {
	const ctx = useAppContext();

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
			<Stack justify="space-between" style={{flex: 1}}>
				<Stack>
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
				</Stack>

				<Stack>
					{ctx?.state.time.lostPower && (
						<Alert variant="light" color="red" title="DS3231">
							Module lost power!
						</Alert>
					)}

					<div className={ctx?.connected ? "connection-card" : "connection-card _offline"}>
						<div className={"status-dot"}/>
						<div>
							<strong>{ctx?.connected ? 'ESP32 онлайн' : 'ESP32 оффлайн'}</strong>
							<span id="last-update">{formatDate(ctx?.state.time.unix)}</span>
						</div>
					</div>
				</Stack>

			</Stack>

		</aside>
	);
};