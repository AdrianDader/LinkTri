import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CreateRepo from "./../RepositoryCRUD";
import AuthContext from "../../../context/AuthContext";

// Mock del contexto AuthContext
const mockContextValue = {
  accessToken: "fake-token",
  showLoader: vi.fn(),
  hideLoader: vi.fn(),
};

// Mock del hook useFetchingData
vi.mock("../../../hooks/useFetchingData", () => ({
  useFetchingData: () => ({
    loading: false,
    error: null,
    fetchData: vi.fn(),
  }),
}));

describe("Componente CreateRepo", () => {
  it("renderiza input, botón y muestra tags al buscar", () => {
    render(
      <AuthContext.Provider value={mockContextValue}>
        <CreateRepo onCancel={() => {}} />
      </AuthContext.Provider>
    );

    // 1. Input con placeholder
    const nameInput = screen.getByPlaceholderText("Nombre del repositorio");
    expect(nameInput).toBeInTheDocument();

    // 2. Botón con texto "Crear Repositorio"
    const createButton = screen.getByRole("button", {
      name: /crear repositorio/i,
    });
    expect(createButton).toBeInTheDocument();

    // 3. Buscar un tag existente
    const tagSearchInput = screen.getByPlaceholderText("Buscar tags...");
    fireEvent.change(tagSearchInput, { target: { value: "Derecho" } });

    // Espera a que aparezca el checkbox del tag "javascript"
    const tagOption = screen.getByLabelText(/Derecho/i);
    expect(tagOption).toBeInTheDocument();
  });
});
