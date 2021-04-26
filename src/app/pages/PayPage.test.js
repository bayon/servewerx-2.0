import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import PayPage from "./PayPage";

const stripePromise = loadStripe("pk_live_c03o8lC0VMl6y5eBpZ1eov45");

describe("PayPage", () => {
  test("renders PayPage component", () => {
    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PayPage />
        </Elements>
      </Provider>
    );

    screen.debug();
    //screen.findAllByText('Resume');
  });
});
