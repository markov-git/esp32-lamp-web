import { Card, Group, Stack, Switch, Text } from '@mantine/core';
import type { ILampSchedule } from '../../../types/esp32.ts';
import { ChannelScheduleTable } from './ChannelScheduleTable.tsx';

interface IProps {
	lampSchedule: ILampSchedule;
	disabled: boolean;

	onToggleLampScheduleEnabled: (lampId: number, value: boolean) => void;
}

export const LampScheduleCard = ({ lampSchedule, disabled, onToggleLampScheduleEnabled }: IProps) => {

	const toggleLampScheduleEnabled = async () => {
		onToggleLampScheduleEnabled(lampSchedule.id, !lampSchedule.enabled);
	};

	return (
		<Card withBorder>
			<Stack>
				<Group gap="xs">
					<Switch
						checked={ lampSchedule.enabled }
						onChange={ toggleLampScheduleEnabled }
						color="green"
						disabled={ disabled }
					/>
					<div className="lamp-card-caption">
						<Text fw={ 500 } size="lg">{ `Лампа ${ lampSchedule.id ?? '-' }` }</Text>
					</div>
				</Group>


				<ChannelScheduleTable
					value={lampSchedule.red}
					channel="red"
				/>

				<ChannelScheduleTable
					value={lampSchedule.blue}
					channel="blue"
				/>
			</Stack>
		</Card>
	);
};