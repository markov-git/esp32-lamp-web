import { ColorSchemeToggle } from './ColorSchemeToggle.tsx';
import { Stack, Text, Title } from '@mantine/core';

interface IProps {
	title: string;
	subtitle: string;
}

export const FormHead = (props: IProps) => {

	return (
		<header className="topbar">
			<Stack gap="xs">
				<Text>ESP32 Plant Control</Text>
				<Title order={1}>{props.title}</Title>
				<Title order={3}>{props.subtitle}</Title>
			</Stack>

			<ColorSchemeToggle/>
		</header>
	)
}