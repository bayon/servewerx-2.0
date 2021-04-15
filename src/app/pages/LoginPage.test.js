import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  test("renders LoginPage component", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    screen.debug();
    //screen.findAllByText('Resume');
  });
});
