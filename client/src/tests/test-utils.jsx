import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "../state/auth.js";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { auth: authReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
    function Wrapper({children}) {
        return <Provider store={store}>{children}</Provider>
    }

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}
