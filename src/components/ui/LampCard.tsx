import type { ILampState } from '../../types/esp32.ts';
import './LampCard.css'

interface IProps {
	value: ILampState | undefined;
}

export const LampCard = (props: IProps) => {


	return (
		<div className="lamp-card">
			<div className="lamp-card-header">
				<div className="lamp-card-icon">
					<img src="/lamp.svg" alt=""/>
				</div>

				<div className="lamp-card-caption">
					<div className="lamp-card-title">
						{`Лампа ${props.value?.id || '-'}`}
					</div>
				</div>
			</div>

			<div className="lamp-card-body">

			</div>
		</div>
	)
}