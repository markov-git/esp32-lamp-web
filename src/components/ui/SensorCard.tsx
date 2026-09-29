import './SensorCard.css';
import { Card, Group, LoadingOverlay, Skeleton } from '@mantine/core';
import type { IAppSensorTimeValue } from '../../types/app.ts';
import { Sparkline } from '@mantine/charts';

interface IProps {
	caption: string;
	value: string;

	loading?: boolean;

	iconPath: string;

	history: IAppSensorTimeValue[] | undefined;
}

export const SensorCard = (props: IProps) => {

	return (
		<Card withBorder>
			<LoadingOverlay
				visible={ props.loading }
				zIndex={ 1000 }
				overlayProps={ { radius: 'sm', blur: 2 } }
			/>

			<Group gap={ 8 }>
				<div className="indicator-card-icon">
					<img src={ props.iconPath } alt=""/>
				</div>

				<div className="indicator-card-content">
					<div className="indicator-card-caption">
						{ props.caption }
					</div>

					<div className="indicator-card-value">
						{ props.value }
					</div>
				</div>
			</Group>

			<Skeleton visible={!Array.isArray(props.history)} mt="xs">
				<Sparkline
					h={ 60 }
					data={ Array.isArray(props.history) ? props.history.map(v => v.value) : [] }
					curveType="natural"
					color="red"
					fillOpacity={ 0.4 }
					strokeWidth={ 1 }
					trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
				/>
			</Skeleton>
		</Card>
	);
};