// LoginForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";
import AuthContext from "../../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

describe("LoginForm", () => {
  const mockAuth = {
    accessToken: "",
    userLogged: null,
    setUserLogged: vi.fn(),
    setAccessToken: vi.fn(),
    showLoader: vi.fn(),
    hideLoader: vi.fn(),
  };

  vi.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: () => <div data-testid="dotlottie-mock" />,
}));


  it("renderiza los campos y permite escribir", () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <BrowserRouter>
          <LoginForm url="/fake-url" />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("Password123");
    expect(button).toBeInTheDocument();
  });
});
