import { FormHead } from '../ui/FormHead.tsx';
import { Button, Center, Loader, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getSchedules, setScheduleEnabled } from '../../api/esp32.ts';
import type { IScheduleInfo } from '../../types/esp32.ts';
import { LampScheduleCard } from '../ui/LampScheduleCard/LampScheduleCard.tsx';
import { useAppContext } from '../../Context.tsx';

export const Schedule = () => {
	const [ state, setState ] = useState<IScheduleInfo | undefined>(undefined);
	const [ loading, setLoading ] = useState(true);
	const [ processing, setProcessing ] = useState(false);
	const [ error, setError ] = useState<string | null>(null);
	const ctx = useAppContext();

	const requestSchedules = () => {
		getSchedules()
			.then(setState)
			.catch(() => setError('Failed to connect to ESP32'))
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		requestSchedules();
	}, []);


	const toggleLampScheduleEnabled = async (lampId: number, value: boolean) => {
		if (processing) {
			return;
		}
		try {
			setProcessing(true);

			const state = await setScheduleEnabled(lampId, value);
			ctx?.changeState(state);

			setLoading(true);
			requestSchedules();
		} catch (e) {
			console.error(e);
		} finally {
			setProcessing(false);
		}
	};

	if (loading) {
		return (
			<Center h="100vh">
				<Loader size="xl"/>
			</Center>
		);
	}

	if (error) {
		return <div>{ error }</div>;
	}

	if (!state) {
		return <div>Empty state info</div>;
	}

	return (
		<div className="form-container">
			<FormHead
				title="Расписание"
				subtitle="Автоматическое управление лампами с настройкой каналов"
			/>

			<Button style={{maxWidth: 220}} color="green">＋ Добавить событие</Button>

			<Stack>
				{state.lamps.map((lampSchedule) => (
					<LampScheduleCard
						key={lampSchedule.id}
						lampSchedule={lampSchedule}
						disabled={processing}
						onToggleLampScheduleEnabled={toggleLampScheduleEnabled}
					/>
				))}
			</Stack>
		</div>
	);
};