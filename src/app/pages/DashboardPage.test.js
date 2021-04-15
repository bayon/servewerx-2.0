import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import DashboardPage from "./DashboardPage";

describe("DashboardPage", () => {
  test("renders DashboardPage component", () => {
    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    );

    screen.debug();
    //screen.findAllByText('Resume');
  });
});
