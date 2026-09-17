
export interface IEsp32State {
	// todo ip ...
	server: null;

	lamps: ILampState[];
}

export interface ILampState extends Record<TLampChannel, number> {
	id: number;
}

export type TLampChannel = 'red' | 'blue';