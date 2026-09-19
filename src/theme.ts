import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const theme = createTheme({
	cursorType: 'pointer',
});
export const vars = themeToVars(theme);