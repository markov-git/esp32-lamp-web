import './SensorCard.css';
import { Card, LoadingOverlay } from '@mantine/core';

interface IProps {
	caption: string;
	value: string;

	loading: boolean;

	iconPath: string;
}

export const SensorCard = (props: IProps) => {

	return (
		<Card withBorder>
			<LoadingOverlay
				visible={props.loading}
				zIndex={1000}
				overlayProps={{ radius: "sm", blur: 2 }}
			/>

			<div className="indicator-card-container">
				<div className="indicator-card-icon">
					<img src={props.iconPath} alt=""/>
				</div>

				<div className="indicator-card-content">
					<div className="indicator-card-caption">
						{props.caption}
					</div>

					<div className="indicator-card-value">
						{props.value}
					</div>
				</div>
			</div>
		</Card>
	)
}