import { ColorSchemeToggle } from './ColorSchemeToggle.tsx';
import { Stack, Text } from '@mantine/core';

interface IProps {
	title: string;
	subtitle: string;
}

export const FormHead = (props: IProps) => {

	return (
		<header className="topbar">
			<Stack gap="xs">
				<Text>ESP32 Plant Control</Text>
				<Text size="lg" fw={700}>{props.title}</Text>
				<Text>{props.subtitle}</Text>
			</Stack>

			<ColorSchemeToggle/>
		</header>
	)
}