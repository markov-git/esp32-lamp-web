import { Button, Card, Group, Stack, Switch, Text } from '@mantine/core';
import type { ILampSchedule, TLampChannel } from '../../../types/esp32.ts';
import { ChannelScheduleTable } from './ChannelScheduleTable.tsx';

interface IProps {
	lampSchedule: ILampSchedule;
	disabled: boolean;
	processing: boolean;

	onToggleLampScheduleEnabled: (lampId: number, value: boolean) => void;
	onAddLampSchedule: (lampId: number) => void;
	onChangeLampSchedule: (lampId: number, channel: TLampChannel, entryIndex: number) => void;
	onDeleteLampSchedule: (lampId: number, channel: TLampChannel, entryIndex: number) => void;
}

export const LampScheduleCard = ({
									 lampSchedule,
									 disabled, processing,
									 onToggleLampScheduleEnabled,
									 onAddLampSchedule,
									 onChangeLampSchedule,
									 onDeleteLampSchedule,
								 }: IProps) => {

	const toggleLampScheduleEnabled = async () => {
		onToggleLampScheduleEnabled(lampSchedule.lampId, !lampSchedule.enabled);
	};

	return (
		<Card withBorder>
			<Stack>
				<Group gap="xs" justify="space-between">
					<Group>
						<Switch
							checked={ lampSchedule.enabled }
							onChange={ toggleLampScheduleEnabled }
							color="green"
							disabled={ processing }
						/>
						<div className="lamp-card-caption">
							<Text fw={ 500 } size="lg">{ `Лампа ${ lampSchedule.lampId ?? '-' }` }</Text>
						</div>
					</Group>

					<Button
						style={ { maxWidth: 220 } }
						color="green"
						size="compact-md"
						variant="subtle"
						loading={ processing }
						disabled={ disabled }
						onClick={ () => onAddLampSchedule(lampSchedule.lampId) }
					>＋ Добавить событие</Button>
				</Group>


				<ChannelScheduleTable
					color="red"
					value={ lampSchedule.red }
					channelCaption="Красный"
					processing={ processing }
					disabled={ disabled }
					onChangeLampSchedule={ (entryIndex) => onChangeLampSchedule(lampSchedule.lampId, 'red', entryIndex) }
					onDeleteLampSchedule={ (entryIndex) => onDeleteLampSchedule(lampSchedule.lampId, 'red', entryIndex) }
				/>

				<ChannelScheduleTable
					color="blue"
					value={ lampSchedule.blue }
					channelCaption="Синий"
					processing={ processing }
					disabled={ disabled }
					onChangeLampSchedule={ (entryIndex) => onChangeLampSchedule(lampSchedule.lampId, 'blue', entryIndex) }
					onDeleteLampSchedule={ (entryIndex) => onDeleteLampSchedule(lampSchedule.lampId, 'blue', entryIndex) }
				/>
			</Stack>
		</Card>
	);
};