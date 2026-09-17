import * as React from 'react';

interface IProps extends React.PropsWithChildren {
	caption: string
}

export const Card = (props: IProps) => {

	return (
		<div className="card">
			<div className="card-caption">
				{props.caption}
			</div>

			<div className="card-content">
				{props.children}
			</div>
		</div>
	)
}