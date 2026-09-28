import { Group, Stack, Select, Button, Text, Slider, Box, Checkbox, Divider } from '@mantine/core';
import { TimePicker } from '@mantine/dates';
import type { IEditableEntry } from '../../../types/app.ts';
import { days, formatMinutes, getMinutesFromFormattedString } from '../../../utils/dateTime.ts';
import type { IScheduleEntry } from '../../../types/esp32.ts';
import { getBit, setBit } from '../../../utils/bit.ts';

interface IProps {
	value: IEditableEntry;

	onChange: (value: IEditableEntry) => void;
	onSave: (value: IEditableEntry) => void;
}

export const ScheduleEntryForm = ({ value, onChange, onSave }: IProps) => {

	const isValueValid = (v: IEditableEntry) => {
		const isIndexValid = v.isNew || v.entryIndex >= 0;
		const isChannelValid = !!v.channel;
		const lampIdValid = !!v.lampId;
		const isEntryValid = [
			v.entry.brightness,
			v.entry.days,
			v.entry.end,
			v.entry.fadeIn,
			v.entry.fadeOut,
			v.entry.start,
		].every(entryValue => typeof entryValue === 'number');
		return isIndexValid && isChannelValid && lampIdValid && isEntryValid;
	};

	const changeEntry = <Key extends keyof IScheduleEntry, Value extends IScheduleEntry[Key]>(
		key: Key, v: Value,
	) => {
		const newValue: IEditableEntry = structuredClone(value);
		newValue.entry[key] = v;
		onChange(newValue);
	};

	const changeEditableEntry = <Key extends keyof IEditableEntry, Value extends IEditableEntry[Key]>(
		key: Key, v: Value,
	) => {
		const newValue: IEditableEntry = structuredClone(value);
		newValue[key] = v;
		onChange(newValue);
	};

	return (
		<Stack>
			<Group align="flex-start">
				<Stack style={{minWidth: '400px'}}>
					{ value.isNew && (
						<Group>
							<Select
								required
								label="Лампа"
								placeholder="Не задано"
								value={ value.lampId }
								checkIconPosition="right"
								data={ [
									{ value: 1, label: 'Лампа 1' },
									{ value: 2, label: 'Лампа 2' },
									{ value: 3, label: 'Лампа 3' },
								] }
								clearable={ false }
								onChange={ (v) => v !== null && changeEditableEntry('lampId', v) }
							/>
							<Select
								required
								label="Канал"
								placeholder="Не задано"
								value={ value.channel }
								checkIconPosition="right"
								data={ [
									{ value: 'red', label: 'Красный' },
									{ value: 'blue', label: 'Синий' },
								] }
								onChange={ (v) => v !== null && changeEditableEntry('channel', v) }
							/>
						</Group>
					) }


					<Stack gap={0}>
						<Text size="xl">Основные параметры</Text>
						<Group grow>
							<TimePicker
								required
								label="Время начала"
								hoursStep={1}
								minutesStep={5}
								withDropdown
								value={formatMinutes(value.entry.start)}
								onChange={v => changeEntry('start', getMinutesFromFormattedString(v))}
							/>
							<TimePicker
								required
								label="Время окончания"
								withDropdown
								value={formatMinutes(value.entry.end)}
								onChange={v => changeEntry('end', getMinutesFromFormattedString(v))}
							/>
						</Group>
					</Stack>

					<Box>
						<Group justify="space-between">
							<Text>Яркость</Text>
							<Text>{ `${ value.entry.brightness }%` }</Text>
						</Group>
						<Slider
							value={value.entry.brightness}
							color={value.channel}
							marks={[
								{ value: 25, label: '25%' },
								{ value: 50, label: '50%' },
								{ value: 75, label: '75%' },
							]}
							onChange={v => changeEntry('brightness', v)}
							label={null}
						/>
					</Box>

					<Box mt="md">
						<Group justify="space-between">
							<Text>Плавное включение</Text>
							<Text>{ `${ value.entry.fadeIn } мин` }</Text>
						</Group>
						<Slider
							value={value.entry.fadeIn}
							// color="blue"
							marks={[
								{ value: 5, label: '5 мин' },
								{ value: 20, label: '20 мин' },
								{ value: 50, label: '50 мин' },
							]}
							max={60}
							onChange={v => changeEntry('fadeIn', v)}
							label={null}
						/>
					</Box>

					<Box mt="md">
						<Group justify="space-between">
							<Text>Плавное выключение</Text>
							<Text>{ `${ value.entry.fadeOut } мин` }</Text>
						</Group>
						<Slider
							value={value.entry.fadeOut}
							marks={[
								{ value: 5, label: '5 мин' },
								{ value: 20, label: '20 мин' },
								{ value: 50, label: '50 мин' },
							]}
							max={60}
							onChange={v => changeEntry('fadeOut', v)}
							label={null}
						/>
					</Box>
				</Stack>
				<Stack gap="md" ml="md" mr="xl">
					<Text size="md" >Дни недели</Text>
					<Stack>
						{days.map((day) => (
							<Checkbox
								key={day.index}
								label={day.label}
								checked={getBit(value.entry.days, day.index)}
								onChange={(event) => changeEntry('days', setBit(value.entry.days, day.index, event.currentTarget.checked))}
							/>
						))}
					</Stack>
				</Stack>
			</Group>

			<Divider mt="xl" />

			<Group justify="flex-end">
				<Button
					disabled={ !isValueValid(value) }
					onClick={ () => onSave(value) }
				>
					Сохранить
				</Button>
			</Group>
		</Stack>
	);
};