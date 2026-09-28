import type { IScheduleEntry } from '../../../types/esp32.ts';
import { Button, Group, Stack, Table, Text } from '@mantine/core';
import { formatMinutes } from '../../../utils/dateTime.ts';
import { ColorDot } from '../ColorDot.tsx';
import { getBits } from '../../../utils/bit.ts';


interface IProps {
	value: IScheduleEntry[];

	color: 'red' | 'blue';
	channelCaption: string;

	processing: boolean;
	disabled: boolean;

	onChangeLampSchedule: (entryIndex: number) => void;
	onDeleteLampSchedule: (entryIndex: number) => void;
}

export const ChannelScheduleTable = (props: IProps) => {

	const rows = props.value.map((entry, index) => (
		<Table.Tr key={index}>
			<Table.Td>{index + 1}</Table.Td>
			<Table.Td>{formatMinutes(entry.start)}</Table.Td>
			<Table.Td>{formatMinutes(entry.end)}</Table.Td>
			<Table.Td>{entry.brightness}%</Table.Td>
			<Table.Td>{getBits(entry.days).filter(Boolean).length} / 7</Table.Td>
			<Table.Td>{entry.fadeIn}мин / {entry.fadeOut}мин</Table.Td>

			<Table.Td>
				<Group justify="flex-end" align="center">
					<Button
						variant="light"
						loading={ props.processing }
						disabled={ props.disabled }
						onClick={() => props.onChangeLampSchedule(index)}
					>
						<img src="/pen.svg" alt=""/>
					</Button>

					<Button
						variant="light"
						color="red"
						loading={ props.processing }
						disabled={ props.disabled }
						onClick={() => props.onDeleteLampSchedule(index)}
					>
						<img src="/trash.svg" alt=""/>
					</Button>
				</Group>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Stack>
			<Group>
				<ColorDot color={props.color}/>
				<Text>{`${props.channelCaption} канал`}</Text>
			</Group>
			<Table withTableBorder>

				<Table.Thead>
					<Table.Tr>
						<Table.Th>#</Table.Th>
						<Table.Th>start</Table.Th>
						<Table.Th>end</Table.Th>
						<Table.Th>brightness</Table.Th>
						<Table.Th>days</Table.Th>
						<Table.Th>fade</Table.Th>
						<Table.Th/>
					</Table.Tr>
				</Table.Thead>

				<Table.Tbody>
					{rows}
				</Table.Tbody>

			</Table>
		</Stack>
	)
}