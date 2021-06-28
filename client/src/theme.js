import { createMuiTheme } from "@material-ui/core/styles";

// Custom site theme colors
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#C55548",
		},
		secondary: {
			main: "#e6c545",
		},
		text: {
			default: "#4A354D",
			light: "#F2F5EE",
		},
		background: {
			default: "#F2F5EE",
			light: "#F2F5EE",
			dark: "#4A354D",
		},
	},
});
