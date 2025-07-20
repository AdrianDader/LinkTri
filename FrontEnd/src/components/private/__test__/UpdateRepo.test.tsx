// src/components/private/__test__/UpdateRepoSelector.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UpdateRepoSelector from "./../UpdateRepo";
import AuthContext from "../../../context/AuthContext";

// Mock del contexto AuthContext
const mockContextValue = {
  accessToken: "fake-token",
  showLoader: vi.fn(),
  hideLoader: vi.fn(),
};

// Mock del hook useFetchingData
const mockFetchData = vi.fn();

vi.mock("../../../hooks/useFetchingData", () => ({
  useFetchingData: () => ({
    loading: false,
    error: null,
    fetchData: mockFetchData,
  }),
}));

describe("Componente UpdateRepoSelector", () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    vi.clearAllMocks();
  });

  it("muestra el selector de repositorios y carga datos al seleccionar uno", async () => {
    // Datos simulados para repos
    const mockRepos = [
      {
        id: 1,
        name: "Repo de Prueba",
        description: "Descripción de prueba",
        visibility: "private",
        shared: true,
        tags: ["React", "TypeScript"],
      },
    ];

    mockFetchData.mockResolvedValueOnce(mockRepos); // Responde al GET inicial

    render(
      <AuthContext.Provider value={mockContextValue}>
        <UpdateRepoSelector onCancel={vi.fn()} />
      </AuthContext.Provider>
    );

    // Esperar a que se cargue el repositorio simulado
    await waitFor(() =>
      expect(screen.getByText("Selecciona un repositorio:")).toBeInTheDocument()
    );

    // Verificamos que esté la opción mock
    expect(screen.getByText("Repo de Prueba")).toBeInTheDocument();

    // Seleccionar el repo
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    // Ahora deben aparecer los inputs rellenos
    await waitFor(() =>
      expect(
        screen.getByPlaceholderText("Nombre del repositorio")
      ).toHaveValue("Repo de Prueba")
    );

    expect(screen.getByPlaceholderText("Descripción")).toHaveValue(
      "Descripción de prueba"
    );
  });
});
