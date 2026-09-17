interface IProps {
	min?: number;
	max?: number;
	value: number;

	mode: 'red' | 'blue';
}

export const ProgressBar = ({
						  min = 0,
						  max = 100,
						  value,
						  mode,
					  }: IProps) => {
	const percent = ((value - min) / (max - min)) * 100;

	const colorsByMode = {
		red: {
			activeTrackBg: 'linear-gradient(90deg, rgb(255 107 107), rgb(229 47 47))',
			activeTrackBsh: 'rgb(229 47 47 / 30%) 0px 2px 8px',
			thumbBorder: '3px solid rgb(237 72 72)',
			thumbBsh: 'rgb(225 45 45 / 30%) 0px 3px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px',
		},
		blue: {
			activeTrackBg: 'linear-gradient(90deg, rgb(110 107 255), rgb(49 47 229))',
			activeTrackBsh: 'rgb(47 56 229 / 30%) 0px 2px 8px',
			thumbBorder: '3px solid rgb(74 72 237)',
			thumbBsh: 'rgb(49 45 225 / 30%) 0px 3px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px',
		},
	};

	return (
		<div
			style={ {
				padding: '8px 0',
				borderRadius: '18px',
				flex: 1,
			} }
		>
			<div
				style={ {
					position: 'relative',
					height: '14px',
				} }
			>
				{/* Track */ }
				<div
					style={ {
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: '14px',
						borderRadius: '10px',
						background: 'rgb(125 138 147 / 20%)',
						boxShadow: 'inset 0 1px 3px rgba(50,100,30,.15)',
					} }
				/>

				{/* Active track */ }
				<div
					style={ {
						position: 'absolute',
						top: 0,
						left: 0,
						width: `${ percent }%`,
						height: '14px',
						borderRadius: '10px',
						background: colorsByMode[mode].activeTrackBg,
						boxShadow: colorsByMode[mode].activeTrackBsh,
						pointerEvents: 'none',
					} }
				/>

			</div>
		</div>
	);
};