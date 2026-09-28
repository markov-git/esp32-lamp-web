import { FormHead } from '../ui/FormHead.tsx';
import { Center, Loader, Modal, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
	addScheduleEntry,
	deleteScheduleEntry,
	getSchedules,
	setScheduleEnabled,
	updateScheduleEntry,
} from '../../api/esp32.ts';
import type { IScheduleInfo, TLampChannel } from '../../types/esp32.ts';
import { LampScheduleCard } from '../ui/LampScheduleCard/LampScheduleCard.tsx';
import { useAppContext } from '../../Context.tsx';
import { useDisclosure } from '@mantine/hooks';
import type { IEditableEntry } from '../../types/app.ts';
import { ScheduleEntryForm } from '../ui/ScheduleEntryForm/ScheduleEntryForm.tsx';

function createEmptyEntry(): IEditableEntry {
	return {
		entry: {
			brightness: 0,
			// Sunday to Saturday
			days: parseInt("1111111", 2),
			start: 0,
			end: 0,
			fadeIn: 0,
			fadeOut: 0,
		},
		isNew: false,
		lampId: 1,
		channel: 'red',
		entryIndex: -1,
	};
}

export const Schedule = () => {
	const [ state, setState ] = useState<IScheduleInfo | undefined>(undefined);
	const [ loading, setLoading ] = useState(true);
	const [ processing, setProcessing ] = useState(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ entryToEdit, setEntryToEdit ] = useState<IEditableEntry>(createEmptyEntry);
	const [ opened, { open, close } ] = useDisclosure(false);
	const ctx = useAppContext();

	const requestSchedules = () => {
		getSchedules()
			.then(setState)
			.catch(() => setError('Failed to connect to ESP32'))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		requestSchedules();
	}, []);


	const toggleLampScheduleEnabled = async (lampId: number, value: boolean) => {
		if (processing) {
			return;
		}
		try {
			setProcessing(true);

			const state = await setScheduleEnabled(lampId, value);
			ctx?.changeState(state);

			setLoading(true);
			requestSchedules();
		} catch (e) {
			console.error(e);
		} finally {
			setProcessing(false);
		}
	};

	const openAddLampScheduleModal = (lampId: number) => {
		const newEntry = createEmptyEntry();
		newEntry.lampId = lampId;
		newEntry.isNew = true;

		setEntryToEdit(newEntry);
		open();
	};

	const openChangeLampScheduleModal = (lampId: number, channel: TLampChannel, entryIndex: number) => {
		if (!state) {
			return;
		}

		const lamp = state.lamps.find(l => l.lampId === lampId);
		if (!lamp) {
			return;
		}

		const editableEntry = createEmptyEntry();
		const entryToEdit = lamp[channel][entryIndex];

		if (!entryToEdit) {
			setError(`Entry not found! ${ lampId }.${ channel }.${ entryIndex }`);
			return;
		}

		editableEntry.entry = structuredClone(entryToEdit);
		editableEntry.lampId = lampId;
		editableEntry.channel = channel;
		editableEntry.entryIndex = entryIndex;
		editableEntry.isNew = false;

		setEntryToEdit(editableEntry);
		open();
	};

	const deleteLampSchedule = async (lampId: number, channel: TLampChannel, entryIndex: number) => {
		if (processing) {
			return;
		}
		try {
			setProcessing(true);

			const scheduleInfo = await deleteScheduleEntry(lampId, channel, entryIndex);
			setState(scheduleInfo);
		} catch (e) {
			console.error(e);
		} finally {
			setProcessing(false);
		}
	};

	const saveEntryToEdit = async (value: IEditableEntry) => {
		if (processing) {
			return;
		}
		try {
			setProcessing(true);

			if (value.isNew) {
				if (value.lampId === null || value.channel === null) {
					setError(`nullable lamp or channel: ${ JSON.stringify(value) }`);
					return;
				}

				const scheduleInfo = await addScheduleEntry(
					value.lampId, value.channel, value.entry,
				);
				setState(scheduleInfo);
			} else {
				if (value.lampId === null || value.channel === null || value.entryIndex === null) {
					setError(`nullable lamp, channel or entryIndex: ${ JSON.stringify(value) }`);
					return;
				}

				const scheduleInfo = await updateScheduleEntry(
					value.lampId, value.channel, value.entryIndex, value.entry,
				);
				setState(scheduleInfo);
			}

			// сбросим на всякий стейт
			setEntryToEdit(createEmptyEntry());
		} catch (e) {
			console.error(e);
		} finally {
			setProcessing(false);
		}
	};

	if (loading) {
		return (
			<Center h="100vh">
				<Loader size="xl"/>
			</Center>
		);
	}

	if (error) {
		return <div>{ error }</div>;
	}

	if (!state) {
		return <div>Empty state info</div>;
	}

	return (
		<div className="form-container">
			<FormHead
				title="Расписание"
				subtitle="Автоматическое управление лампами с настройкой каналов"
			/>

			<Stack>
				{ state.lamps.map((lampSchedule) => (
					<LampScheduleCard
						key={ lampSchedule.lampId }
						lampSchedule={ lampSchedule }
						disabled={ !lampSchedule.enabled }
						processing={ processing }
						onToggleLampScheduleEnabled={ toggleLampScheduleEnabled }
						onAddLampSchedule={ openAddLampScheduleModal }
						onChangeLampSchedule={ openChangeLampScheduleModal }
						onDeleteLampSchedule={ deleteLampSchedule }
					/>
				)) }
			</Stack>

			<Modal
				opened={ opened }
				onClose={ close }
				size="auto"
				padding="xl"
				title={
					<Text size="xl" fw={700}>{ entryToEdit.isNew ? 'Изменить событие' : 'Добавить событие' }</Text>
				}
			>
				<ScheduleEntryForm
					value={ entryToEdit }
					onChange={ setEntryToEdit }
					onSave={ saveEntryToEdit }
				/>
			</Modal>
		</div>
	);
};