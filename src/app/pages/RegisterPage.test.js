import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import RegisterPage from "./RegisterPage";

describe("RegisterPage", () => {
  test("renders RegisterPage component", () => {
    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>
    );

    screen.debug();
    //screen.findAllByText('Resume');
  });
});
