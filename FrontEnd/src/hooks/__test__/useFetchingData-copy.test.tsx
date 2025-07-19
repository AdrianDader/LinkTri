import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { useFetchingDataRegister } from "./../useFetchingData-copy";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useFetchingDataRegister", () => {
  const url = "/api/register";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería iniciar con loading=false, data=null y error=null", () => {
    const { result } = renderHook(() => useFetchingDataRegister(url));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debería hacer una petición POST exitosa y actualizar data", async () => {
    const mockResponse = { token: "abc123" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => useFetchingDataRegister(url));

    await act(async () => {
      const response = await result.current.fetchData({ email: "test@mail.com" });
      expect(response).toEqual(mockResponse);
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debería manejar errores correctamente y setear el mensaje de error", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: { message: "Correo ya registrado" },
      },
    });

    const { result } = renderHook(() => useFetchingDataRegister(url));

    await act(async () => {
      const response = await result.current.fetchData({ email: "test@mail.com" });
      expect(response).toBeNull();
    });

    expect(result.current.error).toBe("Correo ya registrado");
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("debería manejar errores inesperados", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useFetchingDataRegister(url));

    await act(async () => {
      await result.current.fetchData({ email: "test@mail.com" });
    });

    expect(result.current.error).toBe("Network error");
  });
});
