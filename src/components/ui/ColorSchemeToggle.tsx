import { Group, SegmentedControl, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
	const { setColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<Group justify="center" mt="xl">
			<SegmentedControl
				size="md"
				value={colorScheme}
				data={[
					{value: 'light', label: 'Light'},
					{value: 'dark', label: 'Dark'},
					{value: 'auto', label: 'Auto'}
				]}
				onChange={scheme => setColorScheme(scheme)}
			/>
		</Group>
	);
}