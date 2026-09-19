import * as React from 'react';
import type { TAppTabId } from '../types/app.ts';

interface IProps {
	activeTab: TAppTabId;

	onChangeActiveTab: (activeTab: TAppTabId) => void;
}

export const Sidebar = (props: IProps) => {

	const renderTab = (tab: TAppTabId, caption: React.ReactElement) => {
		let className = 'nav-item';
		if (tab === props.activeTab) {
			className += ' active';
		}
		return (
			<button className={ className } data-page={ tab }
					onClick={ () => props.onChangeActiveTab(tab) }>{ caption }</button>
		);
	};

	return (
		<aside className="sidebar">
			<div className="brand">
				<div className="brand-mark">✦</div>

				<div>
					<strong>ESP32 Grow</strong>
					<span>Управление растениями</span>
				</div>
			</div>

			<nav className="nav" aria-label="Навигация">
				{ renderTab('dashboard', <>⌂ <span>Панель</span></>) }
				{ renderTab('schedule', <>◷ <span>Расписание</span></>) }
				{ renderTab('settings', <>⚙ <span>Настройки</span></>) }
			</nav>

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