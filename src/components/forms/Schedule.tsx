import { FormHead } from '../ui/FormHead.tsx';
import { Button } from '@mantine/core'

export const Schedule = () => {


	return (
		<div className="form-container">
			<FormHead
				title="Расписание"
				subtitle="Автоматическое управление лампами"
			/>

			<Button style={{maxWidth: 220}} color="green">＋ Добавить событие</Button>
		</div>
	);
};