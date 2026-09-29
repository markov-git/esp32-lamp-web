import { FormHead } from '../ui/FormHead.tsx';
import { useEffect, useState } from 'react';
import type { THistoryRange } from '../../types/esp32.ts';
import { Group, SegmentedControl, Stack } from '@mantine/core';
import { getHistory } from '../../api/esp32.ts';
import {
	mapEspHistoryToAppHistoryWithSoilGroup,
} from '../../dataMappers/espHistoryToAppHistory.ts';
import type { IAppSensorsHistoryWithSoilGroup } from '../../types/app.ts';
import { SensorChart } from '../ui/SensorChart.tsx';
import { formatHumidity, formatPressure, formatTemperature } from '../../utils/sensors.ts';
import { useAppContext } from '../../Context.tsx';
import * as React from 'react';

export const SensorsHistory = () => {
	const ctx = useAppContext();

	const [ range, setRange ] = useState<THistoryRange>('month');
	const [ loading, setLoading ] = useState(true);
	const [ sensorsHistory, setSensorsHistory ] = useState<IAppSensorsHistoryWithSoilGroup | undefined>(undefined);

	const requestHistory = (v: THistoryRange) => {
		getHistory(v)
			.then((history) => {
				setSensorsHistory(mapEspHistoryToAppHistoryWithSoilGroup(history));
			})
			.catch(() => {
				console.error('Failed to connect to ESP32');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		requestHistory(range);
	}, []);

	const handleChangeRange = (range: THistoryRange) => {
		setRange(range);
		setLoading(true);
		requestHistory(range);
	};

	const formatTick = (value: number) => {
		const date = new Date(value);

		return date.toLocaleString('ru-RU', {
			// day: '2-digit',
			// month: 'short',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const formatBrush = (value: number) => {
		const date = new Date(value);

		return date.toLocaleString('ru-RU', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const formatLabel = (value: React.ReactNode) => {
		const date = new Date(Number(value));

		return date.toLocaleString('ru-RU', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	return (
		<div className="form-container">
			<FormHead
				title="Графики датчиков"
				subtitle="История изменения параметров"
			/>

			<Group justify="center">
				<SegmentedControl
					color="gray"
					size="md"
					value={ range }
					data={ [
						{ value: 'day', label: 'День' },
						{ value: 'month', label: 'Месяц' },
						{ value: 'all', label: 'Вся история' },
					] }
					onChange={ handleChangeRange }
					transitionDuration={ 300 }
					transitionTimingFunction="linear"
					disabled={ loading }
				/>
			</Group>

			<Stack>
				<SensorChart
					loading={ loading }
					caption="Температура воздуха"
					value={ formatTemperature(ctx?.sensors?.bme280.temperature) }
					iconPath="/thermometer.svg"
					history={ sensorsHistory?.temperature }
					chartProps={ {
						series: [ { name: 'value', color: 'red.6', label: 'Значение' } ],
						valueFormatter: value => formatTemperature(value),
						withBrush: true,
						referenceLines: [{ y: ctx?.sensors?.bme280.temperature, label: `Сейчас ${formatTemperature(ctx?.sensors?.bme280.temperature)}`, color: 'red.6' }],
						xAxisProps: {
							tickFormatter: formatTick,
						},
						tooltipProps: {
							labelFormatter: formatLabel,
						},
						brushProps: {
							tickFormatter: formatBrush,
						}
					} }
				/>
				<SensorChart
					loading={ loading }
					caption="Давление"
					value={ formatPressure(ctx?.sensors?.bme280.pressure) }
					iconPath="/pressure.svg"
					history={ sensorsHistory?.pressure }
					chartProps={ {
						series: [ { name: 'value', color: 'grape.6', label: 'Значение' } ],
						yAxisProps: { domain: [ 700, 800 ] },
						unit: 'мм рт ст',
						withBrush: true,
						referenceLines: [{ y: +((ctx?.sensors?.bme280.pressure || 0) * 0.75006375541921).toFixed(0), label: `Сейчас ${formatPressure(ctx?.sensors?.bme280.pressure)}`, color: 'red.6' }],
						xAxisProps: {
							tickFormatter: formatTick,
						},
						tooltipProps: {
							labelFormatter: formatLabel,
						},
						brushProps: {
							tickFormatter: formatBrush,
						}
					} }
				/>
				<SensorChart
					loading={ loading }
					caption="Влажность"
					value={ formatHumidity(ctx?.sensors?.bme280.humidity) }
					iconPath="/humidity.svg"
					history={ sensorsHistory?.humidity }
					chartProps={ {
						series: [ { name: 'value', color: 'cyan.6', label: 'Значение' } ],
						valueFormatter: value => formatHumidity(value),
						withBrush: true,
						referenceLines: [{ y: ctx?.sensors?.bme280.humidity, label: `Сейчас ${formatHumidity(ctx?.sensors?.bme280.humidity)}`, color: 'red.6' }],
						xAxisProps: {
							tickFormatter: formatTick,
						},
						tooltipProps: {
							labelFormatter: formatLabel,
						},
						brushProps: {
							tickFormatter: formatBrush,
						}
					} }
				/>
				<SensorChart
					loading={ loading }
					caption={ `Влажность почвы` }
					iconPath="/flower.svg"
					history={ sensorsHistory?.soil }
					chartProps={ {
						series: [
							{ name: 'soil1', color: 'indigo.6', label: 'Датчик №1' },
							{ name: 'soil2', color: 'blue.6', label: 'Датчик №2' },
							{ name: 'soil3', color: 'teal.6', label: 'Датчик №3' },
						],
						withBrush: true,
						unit: '%',
						xAxisProps: {
							tickFormatter: formatTick,
						},
						tooltipProps: {
							labelFormatter: formatLabel,
						},
						brushProps: {
							tickFormatter: formatBrush,
						}
					} }
				/>
			</Stack>
		</div>
	);
};