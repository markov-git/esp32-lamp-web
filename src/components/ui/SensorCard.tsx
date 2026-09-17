import './SensorCard.css';

interface IProps {
	caption: string;
	value: string;

	iconPath: string;
}

export const SensorCard = (props: IProps) => {

	return (
		<div className="indicator-card">
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
		</div>
	)
}