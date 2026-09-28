
// 127 -> 1111111

export const getBits = (bitMask: number) => {
	const bits = bitMask.toString(2).split('');
	return bits.map(bit => bit === '1');
}

export const getBit = (bitMask: number, index: number): boolean => {
	const bits = bitMask.toString(2).split('');
	return bits[index] === '1';
}

export const setBit = (bitMask: number, index: number, value: boolean): number => {
	const bits = bitMask.toString(2).split('');
	bits[index] = value ? '1' : '0';
	return parseInt(bits.join(''), 2);
}