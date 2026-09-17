
interface IProps {
	title: string;
	subtitle: string;
}

export const FormHead = (props: IProps) => {

	return (
		<header className="topbar">
			<div>
				<div className="eyebrow">ESP32 Plant Control</div>
				<h1>{props.title}</h1>
				<p>{props.subtitle}</p>
			</div>

			<div className="top-actions">
				<button className="btn btn-danger">↻ Перезапустить ESP32</button>
			</div>
		</header>
	)
}