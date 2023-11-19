/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../routes/Register";
import { renderWithProviders } from "./test-utils";
import { setupServer } from "msw/node";
import { http, HttpResponse, delay } from "msw";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  // since you still want to use the actual MemoryRouter
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

export const handlers = [
  http.get("/api/user", async () => {
    await delay(150);
    return HttpResponse.json("John Smith");
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("when i register as a new user", () => {
  it("loads and displays user registration page", () => {
    renderWithProviders(<Register />);
    expect(screen.getByText(/New Vybes Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
    expect(screen.getByText(/Upload a Profile Picture/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
  });

  it("all input paramters correctly filled should show success modal", async () => {
    renderWithProviders(<Register />);
    const inputMessage = screen.getByLabelText("First Name");

    await act(() => {
      userEvent.type(inputMessage, "James Cameron");
    });

    await waitFor(() => {
      expect(inputMessage).toHaveValue("James Cameron");
    });
  });
});
