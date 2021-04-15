import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import ProfilePage from "./ProfilePage";

describe("ProfilePage", () => {
  test("renders ProfilePage component", () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );

    screen.debug();
    //screen.findAllByText('Resume');
  });
});
