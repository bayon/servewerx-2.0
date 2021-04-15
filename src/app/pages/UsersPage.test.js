import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import UsersPage from "./UsersPage";

describe("UsersPage", () => {
  test("renders UsersPage component", () => {
    render(
      <Provider store={store}>
        <UsersPage />
      </Provider>
    );

    screen.debug();
    //screen.findAllByText('Resume');
  });
});
