import type { TAppTabId } from '../types/app.ts';
import * as React from 'react';
import { Dashboard } from './forms/Dashboard.tsx';
import { Settings } from './forms/Settings.tsx';
import { Schedule } from './forms/Schedule.tsx';

interface IProps {
	tab: TAppTabId;
}

const FORM_BY_TAB : Record<TAppTabId, React.ComponentType> = {
	dashboard: Dashboard,
	settings: Settings,
	schedule: Schedule,
}

export const ControlPage = (props: IProps) => {

	const Form = FORM_BY_TAB[props.tab];

	return (
		<main className="main">
			<Form/>
		</main>
	)
}