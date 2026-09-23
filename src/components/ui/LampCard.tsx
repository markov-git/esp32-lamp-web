import type { ILampState, TLampChannel } from '../../types/esp32.ts';
import './LampCard.css'
import { setChannel } from '../../api/esp32.ts';
import { useState } from 'react';
import { useAppContext } from '../../Context.tsx';
import { Card, Slider, Switch, Text, Progress, Stack } from '@mantine/core';

interface IProps {
	value: ILampState | undefined;
}

export const LampCard = (props: IProps) => {
	const [processing, setProcessing] = useState(false);
	const ctx = useAppContext();

	const someChannelEnabled = !!props.value?.current.red || !!props.value?.current.blue;

	const changeChannelValue = async (channel: TLampChannel, value: number) => {
		if (!props.value || processing) return;
		try {
			setProcessing(true);
			const state = await setChannel(props.value.id, channel, value);
			ctx?.changeState(state);
		} catch (e) {
			console.error(e);
		} finally {
			setProcessing(false);
		}
	}

	const toggleLamp = async () => {
		if (!props.value || processing) return;
		try {
			setProcessing(true);
			const newValue = someChannelEnabled ? 0 : 100;
			await setChannel(props.value.id, 'red', newValue);
			const state = await setChannel(props.value.id, 'blue', newValue);
			ctx?.changeState(state);
		} catch (e) {
			console.error(e);
		} finally {
			setProcessing(false);
		}
	}

	const renderChannelControls = (channel: TLampChannel, className?: string) => {
		const captionByChannel: Record<TLampChannel, string> = {
			red: 'Красный канал (Red)',
			blue: 'Синий канал (Blue)'
		}
		const currentValue = props.value?.current[channel];
		const manualValue = props.value?.manual[channel];

		return (
			<Stack gap="xs">
				<div className={"lamp-card-header" + (className || '')}>
					<Text fw={500}>{captionByChannel[channel]}</Text>

					<Text fw={500}>{`${currentValue ?? '-'} %`}</Text>
				</div>

				<Stack>
					<Progress
						value={currentValue ?? 0}
						color={channel}
						size="xl"
						transitionDuration={500}
						animated={processing}
					/>
					<Slider
						value={manualValue ?? 0}
						onChange={v => changeChannelValue(channel, v)}
						color={channel}
						disabled={processing}
					/>
				</Stack>
			</Stack>
		)
	}

	return (
		<Card withBorder style={{flex: 1}}>
			<Stack>
				<div className="lamp-card-header">
					<div className="lamp-card-icon">
						<img src="/lamp.svg" alt=""/>
					</div>

					<div className="lamp-card-caption">
						<Text fw={500} size="lg">{`Лампа ${props.value?.id || '-'}`}</Text>
					</div>

					<Switch
						checked={someChannelEnabled}
						onChange={toggleLamp}
						color="green"
						disabled={processing}
					/>
				</div>

				<Stack gap="xl">
					{renderChannelControls('red')}
					{renderChannelControls('blue', ' mt22')}
				</Stack>
			</Stack>
		</Card>
	)
}