import * as React from 'react';

interface IProps {
	min?: number;
	max?: number;
	value: number;

	mode: 'red' | 'blue';

	onChange: (value: number) => void;
}

export const Range = ({
						  min = 0,
						  max = 100,
						  value,
						  mode,
						  onChange,
					  }: IProps) => {

	const percent = ((value - min) / (max - min)) * 100;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const nextValue = Number(e.target.value);
		onChange(nextValue);
	};

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
				padding: '10px 8px',
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
						top: '3px',
						left: 0,
						right: 0,
						height: '8px',
						borderRadius: '10px',
						background: 'rgba(255,255,255,.65)',
						boxShadow: 'inset 0 1px 3px rgba(50,100,30,.15)',
					} }
				/>

				{/* Active track */ }
				<div
					style={ {
						position: 'absolute',
						top: '3px',
						left: 0,
						width: `${ percent }%`,
						height: '8px',
						borderRadius: '10px',
						background: colorsByMode[mode].activeTrackBg,
						boxShadow: colorsByMode[mode].activeTrackBsh,
						pointerEvents: 'none',
					} }
				/>

				{/* Native range */ }
				<input
					type="range"
					min={ min }
					max={ max }
					value={ value }
					onChange={ handleChange }
					aria-label="Яркость"
					style={ {
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '14px',
						margin: 0,
						opacity: 0,
						cursor: 'pointer',
					} }
				/>

				{/* Custom thumb */ }
				<div
					style={ {
						position: 'absolute',
						top: '-3px',
						left: `calc(${ percent }% - 10px)`,
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						background: '#fff',
						border: colorsByMode[mode].thumbBorder,
						boxShadow: colorsByMode[mode].thumbBsh,
						pointerEvents: 'none',
					} }
				/>
			</div>
		</div>
	);
};