// src/components/public/__test__/RegisterForm.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../RegisterForm";
import AuthContext from "../../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock para DotLottieReact para evitar error IntersectionObserver
vi.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: () => <div data-testid="dotlottie-mock" />,
}));

// Mock de fetchDataRegister hook para controlar llamadas API
vi.mock("../../../hooks/useFetchingData-copy", () => ({
  useFetchingDataRegister: () => ({
    data: null,
    loading: false,
    error: null,
    fetchData: vi.fn().mockResolvedValue({
      user: { name: "Test User", email: "test@example.com" },
      access_token: "fake-token",
    }),
  }),
}));

describe("RegisterForm", () => {
  const authMock = {
    userLogged: null,
    setUserLogged: vi.fn(),
    setAccessToken: vi.fn(),
    showLoader: vi.fn(),
    hideLoader: vi.fn(),
  };

  function renderWithProviders() {
    return render(
      <AuthContext.Provider value={authMock}>
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }

  test("renderiza campos y permite escribir", () => {
    renderWithProviders();

    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password:/i);
    const passwordConfirmInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /registrarse/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "Password1" } });

    expect(nameInput).toHaveValue("Test User");
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("Password1");
    expect(passwordConfirmInput).toHaveValue("Password1");
  });

  test("muestra mensaje de éxito al enviar el formulario", async () => {
    renderWithProviders();

    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password:/i), {
      target: { value: "Password1" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "Password1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(/has sido registrado/i)).toBeInTheDocument();
      expect(screen.getByText(/hola test user/i)).toBeInTheDocument();
    });
  });
});
