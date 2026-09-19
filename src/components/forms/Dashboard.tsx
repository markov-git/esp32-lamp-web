import * as React from 'react';
import { FormHead } from '../ui/FormHead.tsx';
import { SensorCard } from '../ui/SensorCard.tsx';
import { useAppContext } from '../../Context.tsx';
import { LampCard } from '../ui/LampCard.tsx';

import { SimpleGrid, Stack, Title } from '@mantine/core';
import { formatHumidity, formatPressure, formatTemperature } from '../../utils/sensors.ts';

export const Dashboard: React.ComponentType = () => {
	const ctx = useAppContext();

	return (
		<div className="form-container">
			<FormHead
				title="Панель управления"
				subtitle="Текущее состояние системы"
			/>

			<SimpleGrid cols={3}>
				<SensorCard
					caption="Температура воздуха"
					value={formatTemperature(ctx?.sensors?.bme280.temperature)}
					iconPath="/thermometer.svg"
					loading={!ctx?.sensors}
				/>
				<SensorCard
					caption="Давление"
					value={formatPressure(ctx?.sensors?.bme280.pressure)}
					iconPath="/pressure.svg"
					loading={!ctx?.sensors}
				/>
				<SensorCard
					caption="Влажность"
					value={formatHumidity(ctx?.sensors?.bme280.humidity)}
					iconPath="/humidity.svg"
					loading={!ctx?.sensors}
				/>

				<SensorCard
					caption="Влажность почвы 1"
					value="68 %"
					iconPath="/flower.svg"
					loading
				/>

				<SensorCard
					caption="Влажность почвы 2"
					value="42 %"
					iconPath="/flower.svg"
					loading
				/>

				<SensorCard
					caption="Влажность почвы 3"
					value="79 %"
					iconPath="/flower.svg"
					loading
				/>
			</SimpleGrid>

			<Stack gap="md">
				<Title order={2}>Управление лампами</Title>

				<SimpleGrid cols={3}>
					<LampCard value={ctx?.state.lamps[0]}/>
					<LampCard value={ctx?.state.lamps[1]}/>
					<LampCard value={ctx?.state.lamps[2]}/>
				</SimpleGrid>
			</Stack>
		</div>
	);
};