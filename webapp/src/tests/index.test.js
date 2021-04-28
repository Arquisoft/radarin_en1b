import React from "react";
import ReactDOM from "react-dom";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { Provider } from "react-redux";
import store from "../utils/locationsRedux/store";
import "@testing-library/jest-dom/extend-expect";
import "../css/index.css";
import App from "../views/App";
jest.mock("react-dom", () => ({ render: jest.fn() }));
test("root div", () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.append(div);
        require("../index.js");
        expect(ReactDOM.render).toHaveBeenCalledWith(
            <React.StrictMode>
                <SessionProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </SessionProvider>
            </React.StrictMode>, div);
});