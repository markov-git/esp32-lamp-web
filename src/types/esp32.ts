
export interface IEsp32State {
	lamps: ILampState[];
}

export interface ILampState extends Record<TLampChannel, number> {
	id: number;
}

export type TLampChannel = 'red' | 'blue';