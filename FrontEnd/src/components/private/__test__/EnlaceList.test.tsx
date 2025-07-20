// EnlaceListByCategory.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import EnlaceListByCategory from "../../private/EnlaceList";
import AuthContext from "../../../context/AuthContext";
import React from "react";

// Mock personalizado del hook
vi.mock("../../../hooks/useFetchingGetRepository", () => ({
  useFetchingDataGetRepository: () => ({
    data: {
      repositories: {
        Música: {
          enlaces: [
            {
              id: 1,
              name: "Mi Enlace",
              url: "https://mi-enlace.com",
              public_link: "https://publico.com",
              private_link: "https://privado.com",
              visibility: "private",
              shared: false,
              created_at: "2025-07-01T12:00:00Z",
            },
          ],
        },
      },
    },
    loading: false,
    error: null,
    fetchData: vi.fn(),
  }),
}));

// Mocks requeridos por el componente
vi.mock("../../../hooks/useMobile", () => ({
  default: () => false,
}));

describe("EnlaceListByCategory", () => {
  it("muestra los enlaces de la categoría y permite crear uno nuevo", () => {
    const handleCreate = vi.fn();
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <AuthContext.Provider value={{ accessToken: "fake-token" }}>
        <EnlaceListByCategory
          category="Música"
          onCreateEnlace={handleCreate}
          onEditEnlace={handleEdit}
          onDeleteEnlace={handleDelete}
        />
      </AuthContext.Provider>
    );

    // Verifica que se muestre el nombre del enlace
    expect(screen.getByText("Mi Enlace")).toBeInTheDocument();

    // Clic en "Crear enlace"
    const crearBtn = screen.getByText("Crear enlace");
    fireEvent.click(crearBtn);
    expect(handleCreate).toHaveBeenCalled();
  });
});
