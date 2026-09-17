interface IProps {
	value: boolean;
	onChange: (value: boolean) => void;
}

export const Toggle = ({value, onChange}: IProps) => {
	return (
		<button
			onClick={() => onChange(!value)}
			style={{
				width: "40px",
				height: "24px",
				border: "none",
				borderRadius: "12px",
				backgroundColor: value ? "#22c55e" : "#ef4444",
				cursor: "pointer",
				padding: "4px",
				transition: "background-color 0.2s ease",
			}}
			aria-pressed={value}
		>
			<div
				style={{
					width: "16px",
					height: "16px",
					borderRadius: "50%",
					backgroundColor: "white",
					transform: value ? "translateX(16px)" : "translateX(0)",
					transition: "transform 0.2s ease",
				}}
			/>
		</button>
	);
}