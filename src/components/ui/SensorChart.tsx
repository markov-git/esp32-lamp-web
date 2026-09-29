import { AreaChart, type AreaChartProps } from '@mantine/charts';
import { Card, Group, Skeleton, Text, Title } from '@mantine/core';
import type { IAppSensorTimeValue, IAppSoilTimeHistory } from '../../types/app.ts';

interface IProps {
	loading: boolean;
	caption: string;
	value?: string;
	iconPath: string;

	chartProps: Pick<AreaChartProps,
		| 'type'
		| 'series'
		| 'yAxisProps'
		| 'xAxisProps'
		| 'tooltipProps'
		| 'valueFormatter'
		| 'unit'
		| 'referenceLines'
		| 'withBrush'
		| 'brushProps'
	>;

	history: IAppSensorTimeValue[] | IAppSoilTimeHistory[] | undefined;
}

export const SensorChart = (props: IProps) => {

	return (
		<Card withBorder>
			<Group justify="space-between">
				<Group>
					<div className="indicator-card-icon">
						<img src={ props.iconPath } alt=""/>
					</div>

					<div className="indicator-card-caption">
						<Title order={ 3 }>
							{ props.caption }
						</Title>
					</div>
				</Group>


				<Group>
					{ !!props.value && (
						<Group>
							<Text color="gray">Сейчас:</Text>
							<Text fw={ 600 }>{ props.value }</Text>
						</Group>
					) }
				</Group>
			</Group>

			<Skeleton visible={ props.loading } mt="md">
				<AreaChart
					h={ 600 }
					data={ Array.isArray(props.history) ? props.history : [] }
					dataKey="timestamp"
					curveType="natural"
					{ ...props.chartProps }
				/>
			</Skeleton>
		</Card>
	);
};