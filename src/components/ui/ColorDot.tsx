
interface IProps {
	color: 'red' | 'blue';
}

export const ColorDot = (props: IProps) => (
	<div className={`color-dot _${props.color}`}/>
);