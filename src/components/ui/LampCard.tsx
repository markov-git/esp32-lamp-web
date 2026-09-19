import type { ILampState, TLampChannel } from '../../types/esp32.ts';
import './LampCard.css'
import { setChannel } from '../../api/esp32.ts';
import { useState } from 'react';
import { useAppContext } from '../../Context.tsx';
import { Card, Slider, Switch, Text, Progress } from '@mantine/core'

interface IProps {
	value: ILampState | undefined;
}

export const LampCard = (props: IProps) => {
	const [processing, setProcessing] = useState(false);
	const ctx = useAppContext();

	const someChannelEnabled = !!props.value?.red || !!props.value?.blue;

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
		const value = props.value?.[channel];

		return (
			<>
				<div className={"lamp-card-header" + (className || '')}>
					<Text fw={500}>{captionByChannel[channel]}</Text>

					<Text fw={500}>{`${value ?? '-'} %`}</Text>
				</div>

				<Progress
					value={value ?? 0}
					color={channel}
					size="xl"
					transitionDuration={500}
				/>
				<Slider
					value={value ?? 0}
					onChange={v => changeChannelValue(channel, v)}
					color={channel}
				/>
			</>
		)
	}

	return (
		<Card withBorder style={{flex: 1}}>
			<div className="lamp-card-header">
				<div className="lamp-card-icon">
					<img src="/lamp.svg" alt=""/>
				</div>

				<div className="lamp-card-caption">
					<Text fw={500} size="lg">{`Лампа ${props.value?.id || '-'}`}</Text>
				</div>

				<div className="lamp-card-toggle">
					<Switch
						checked={someChannelEnabled}
						onChange={toggleLamp}
						color="green"
					/>
				</div>
			</div>

			<div className="lamp-card-body">
				{renderChannelControls('red')}
				{renderChannelControls('blue', ' mt22')}
			</div>
		</Card>
	)
}