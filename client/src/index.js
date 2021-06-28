import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers";
import App from "./App";
import "./index.css";

// Custom theme
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>,
	document.getElementById("root")
);
