import * as React from 'react';
import { FormHead } from '../ui/FormHead.tsx';
import { SensorCard } from '../ui/SensorCard.tsx';


export const Dashboard: React.ComponentType = () => {

	return (
		<div className="form-container">
			<FormHead
				title="Панель управления"
				subtitle="Текущее состояние системы"
			/>

			<div className="sensor-cards-row">
				<SensorCard
					caption="Температура воздуха"
					value="24.6 °C"
					iconPath="/thermometer.svg"
				/>

				<SensorCard
					caption="Влажность почвы 1"
					value="68 %"
					iconPath="/flower.svg"
				/>

				<SensorCard
					caption="Влажность почвы 2"
					value="42 %"
					iconPath="/flower.svg"
				/>

				<SensorCard
					caption="Влажность почвы 3"
					value="79 %"
					iconPath="/flower.svg"
				/>
			</div>
		</div>
	);
};