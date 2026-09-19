import { useEffect, useState } from 'react';
import { getSystemInfo } from '../../api/esp32.ts';
import type { IEsp32SystemInfo } from '../../types/esp32.ts';
import { Card, Center, Group, Loader, Progress, SimpleGrid, Table, Text, Tooltip } from '@mantine/core';
import { FormHead } from '../ui/FormHead.tsx';
import { formatDuration } from '../../utils/dateTime.ts';
import { formatBytes } from '../../utils/memory.ts';

export const Settings = () => {
	const [ state, setState ] = useState<IEsp32SystemInfo | undefined>(undefined);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState<string | null>(null);

	useEffect(() => {
		getSystemInfo()
			.then(setState)
			.catch(() => setError('Failed to connect to ESP32'))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<Center h="100vh">
				<Loader size="xl"/>
			</Center>
		);
	}

	if (!state) {
		return <div>Empty state info</div>;
	}

	if (error) {
		return <div>{ error }</div>;
	}

	const heapUtilisation = Math.round(state.totalHeap - state.freeHeap);
	const maxHeapUtilisation = Math.round(state.totalHeap - state.minimumFreeHeap);
	const heapUsage = Math.round(heapUtilisation * 100 / state.totalHeap);

	const fsUsage = Math.round(state.filesystemUsed * 100 / state.filesystemTotal);

	return (
		<div className="form-container">
			<FormHead
				title="Настройки"
				subtitle="Системная информация"
			/>

			<SimpleGrid cols={2}>
				<Card withBorder>
					<Text fw={500} size="lg">Устройство</Text>

					<Table variant="vertical" layout="fixed" withTableBorder>
						<Table.Tbody>
							<Table.Tr>
								<Table.Th w={160}>Модель чипа</Table.Th>
								<Table.Td>{state.chipModel}</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>Ревизия</Table.Th>
								<Table.Td>{state.chipRevision}</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>Ядер</Table.Th>
								<Table.Td>{state.cpuCores}</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>Частота CPU</Table.Th>
								<Table.Td>{state.cpuFrequencyMhz} MHz</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>Время работы</Table.Th>
								<Table.Td>{formatDuration(state.uptimeSeconds)}</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>Температура чипа</Table.Th>
								<Table.Td>{state.chipTemperature.toFixed(0)} °C</Table.Td>
							</Table.Tr>
						</Table.Tbody>
					</Table>
				</Card>

				<Card withBorder>
					<Text fw={500} size="lg">Память</Text>

					<Table variant="vertical" layout="fixed" withTableBorder>
						<Table.Tbody>
							<Table.Tr>
								<Table.Th w={160}>
									Всего
								</Table.Th>
								<Table.Td>
									<Text>{formatBytes(state.flashSize)}</Text>
								</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>
									Прошивка
								</Table.Th>
								<Table.Td>
									<Text>{formatBytes(state.sketchSize)}</Text>
								</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>
									Доступно прошивке
								</Table.Th>
								<Table.Td>
									<Text>{formatBytes(state.freeSketchSpace)}</Text>
								</Table.Td>
							</Table.Tr>

							{/* HEAP */}
							<Table.Tr>
								<Table.Th w={160}>
									Heap<br/>
									max {formatBytes(maxHeapUtilisation)}
								</Table.Th>
								<Table.Td>
									<Group>
										<Progress.Root size="xl" style={{flex: 1}}>
											<Tooltip label={formatBytes(heapUtilisation)}>
												<Progress.Section value={heapUsage}>
													<Progress.Label>{formatBytes(heapUtilisation)}</Progress.Label>
												</Progress.Section>
											</Tooltip>
										</Progress.Root>
										<Text>{formatBytes(state.totalHeap)}</Text>
									</Group>
								</Table.Td>
							</Table.Tr>

							{/* LittleFS */}
							<Table.Tr>
								<Table.Th w={160}>
									LittleFS
								</Table.Th>
								<Table.Td>
									<Group>
										<Progress.Root size="xl" style={{flex: 1}}>
											<Tooltip label={formatBytes(state.filesystemUsed)}>
												<Progress.Section value={fsUsage}>
													<Progress.Label>{formatBytes(state.filesystemUsed)}</Progress.Label>
												</Progress.Section>
											</Tooltip>
										</Progress.Root>
										<Text>{formatBytes(state.filesystemTotal)}</Text>
									</Group>
								</Table.Td>
							</Table.Tr>

						</Table.Tbody>
					</Table>
				</Card>

				<Card withBorder>
					<Text fw={500} size="lg">Wi-Fi</Text>

					<Table variant="vertical" layout="fixed" withTableBorder>
						<Table.Tbody>
							<Table.Tr>
								<Table.Th w={160}>IP</Table.Th>
								<Table.Td>{state.ip}</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>RSSI</Table.Th>
								<Table.Td>{state.wifiRssi} dBm</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Th w={160}>Gateway</Table.Th>
								<Table.Td>{state.gateway}</Table.Td>
							</Table.Tr>
						</Table.Tbody>
					</Table>
				</Card>

			</SimpleGrid>
		</div>
	);
}