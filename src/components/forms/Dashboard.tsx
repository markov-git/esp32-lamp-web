import * as React from 'react';
import { FormHead } from '../ui/FormHead.tsx';


export const Dashboard: React.ComponentType = () => {


	return (
		<div className="form-container">
			<FormHead
				title="Панель управления"
				subtitle="Текущее состояние системы"
			/>
		</div>
	);
};