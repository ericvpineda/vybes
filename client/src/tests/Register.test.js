/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../routes/Register";
import { renderWithProviders } from "./test-utils";
import { setupServer } from "msw/node";
import { http, HttpResponse, delay } from "msw";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import toast from "react-hot-toast";
import { HOST_BACKEND } from "../utils/utils";

// Note: Needs to have "mock" word prepended to variable name 
const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  // since you still want to use the actual MemoryRouter
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("react-hot-toast", () => ({
  ...jest.requireActual("react-hot-toast"),
  success: jest.fn(),
}));

export const handlers = [
  http.post(`${HOST_BACKEND}/auth/register`, async () => {
    return HttpResponse.json({ firstName: "Cameron" });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("when i register as a new user", () => {
  let file;

  beforeEach(() => {
    file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it("typing first name, last name, email, password, and location text should render on screen", async () => {
    renderWithProviders(<Register />);
    const firstName = screen.getByLabelText("First Name");
    const lastName = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const location = screen.getByLabelText("Location");
    const fileUpload = screen.getByTestId("image-upload");

    await act(async () => {
      userEvent.type(firstName, "James");
      userEvent.type(lastName, "Cameron");
      userEvent.type(email, "jamescameron@gmail.com");
      userEvent.type(password, "password");
      userEvent.type(location, "San Francisco, CA");
      fireEvent.change(fileUpload, {
        target: { files: [file] },
      });
    });

    expect(firstName).toHaveValue("James");
    expect(lastName).toHaveValue("Cameron");
    expect(email).toHaveValue("jamescameron@gmail.com");
    expect(password).toHaveValue("password");
    expect(location).toHaveValue("San Francisco, CA");
    expect(fileUpload.files[0].name).toBe("chucknorris.png");
    expect(fileUpload.files.length).toBe(1);
  });

  it("leaving at least 1 required input shows UI validation error", async () => {
    renderWithProviders(<Register />);
    const firstName = screen.getByLabelText("First Name");

    await act(async () => {
      userEvent.type(firstName, "a");
      userEvent.type(firstName, "{backspace}");
      userEvent.tab(); // blurs input
    });

    expect(firstName).toHaveValue("");
    expect(
      screen.getByText(/firstName is a required field/i)
    ).toBeInTheDocument();
  });

  // Fix: Some async operation was not able to be stopped by tests
  it("typing in all required fields and pressing submit should show success modal", async () => {
    renderWithProviders(<Register />);
    const firstName = screen.getByLabelText("First Name");
    const lastName = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const signUpBtn = screen.getByRole("button", { name: /Sign up/i });

    await act(async () => {
      userEvent.type(firstName, "James");
      userEvent.type(lastName, "Cameron");
      userEvent.type(email, "jamescameron@gmail.com");
      userEvent.type(password, "password");
      userEvent.click(signUpBtn);
    });

    expect(firstName).toHaveValue("");
    expect(lastName).toHaveValue("");
    expect(email).toHaveValue("");
    expect(password).toHaveValue("");
    // Note: Unable to find text by modal since modal disappear after set time
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it("clicking on already have an account link navigates to login page", async () => {
    renderWithProviders(<Register />);
    const linkElem = screen.getByText("Already have an account? Login here.")
    await act(() => {
      fireEvent.click(linkElem);
    })

    expect(mockUseNavigate).toHaveBeenCalledWith("/login")
  })
});
