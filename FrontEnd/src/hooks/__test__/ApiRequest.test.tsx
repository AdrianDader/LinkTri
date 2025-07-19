import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import ApiRequest from "./../ApiRequest";
import axios from "axios";

// Mock de axios
vi.mock("axios");

describe("ApiRequest component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra 'Cargando...' mientras se realiza la petición", () => {
    axios.mockImplementation(() => new Promise(() => {})); // never resolve
    render(<ApiRequest url="/api/data" />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("muestra los datos cuando la petición es exitosa", async () => {
    const mockData = { mensaje: "Hola mundo" };
    axios.mockResolvedValueOnce({ data: mockData });

    render(<ApiRequest url="/api/data" />);

    await waitFor(() => {
      expect(screen.getByText(/Hola mundo/)).toBeInTheDocument();
    });
  });

  it("muestra un error si la petición falla", async () => {
    const error = new Error("Error de red");
    axios.mockRejectedValueOnce(error);

    render(<ApiRequest url="/api/data" />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Error de red/)).toBeInTheDocument();
    });
  });

  it("llama a onSuccess si se provee", async () => {
    const mockData = { success: true };
    const onSuccess = vi.fn();
    axios.mockResolvedValueOnce({ data: mockData });

    render(<ApiRequest url="/api/data" onSuccess={onSuccess} />);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData);
    });
  });

  it("llama a onError si ocurre un fallo", async () => {
    const error = new Error("Fallo en la API");
    const onError = vi.fn();
    axios.mockRejectedValueOnce(error);

    render(<ApiRequest url="/api/data" onError={onError} />);

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error);
    });
  });
});
