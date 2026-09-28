import type { IScheduleEntry, TLampChannel } from '../../../types/esp32.ts';
import { Stack, Table } from '@mantine/core';


interface IProps {
	value: IScheduleEntry[];

	channel: TLampChannel;
}

export const ChannelScheduleTable = (props: IProps) => {

	const rows = props.value.map((entry, index) => (
		<Table.Tr key={index}>
			<Table.Td align="right">{index + 1}</Table.Td>
			<Table.Td>{entry.start}</Table.Td>
			<Table.Td>{entry.end}</Table.Td>
			<Table.Td>{entry.brightness}</Table.Td>
			<Table.Td>{entry.days.toString(2)}</Table.Td>
			<Table.Td>{entry.fadeIn} / {entry.fadeOut}</Table.Td>
		</Table.Tr>
	));

	return (
		<Stack>

			<Table withTableBorder>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>#</Table.Th>
						<Table.Th>start</Table.Th>
						<Table.Th>end</Table.Th>
						<Table.Th>brightness</Table.Th>
						<Table.Th>days</Table.Th>
						<Table.Th>fade, мин</Table.Th>
					</Table.Tr>
				</Table.Thead>

				<Table.Tbody>
					{rows}
				</Table.Tbody>

				<Table.Caption>{`Расписание "${props.channel}" канала`}</Table.Caption>
			</Table>
		</Stack>
	)
}