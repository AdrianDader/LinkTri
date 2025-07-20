import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { useFetchingDataGetRepository } from "./../useFetchingGetRepository";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useFetchingDataGetRepository", () => {
  const url = "/api/repos";
  const token = "mock-token";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería iniciar con valores por defecto", () => {
    const { result } = renderHook(() =>
      useFetchingDataGetRepository(url, token)
    );

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("debería establecer error si no hay token", async () => {
    const { result } = renderHook(() =>
      useFetchingDataGetRepository(url, null)
    );

    await act(async () => {
      const res = await result.current.fetchData();
      expect(res).toBeNull();
    });

    expect(result.current.error).toBe("No hay token de autorización");
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
  });

  it("realiza una petición GET exitosa", async () => {
    const mockData = { repo: "test-repo" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      useFetchingDataGetRepository(url, token)
    );

    await act(async () => {
      const res = await result.current.fetchData();
      expect(res).toEqual(mockData);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("maneja errores correctamente (con mensaje del backend)", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { data: { message: "No autorizado" } },
    });

    const { result } = renderHook(() =>
      useFetchingDataGetRepository(url, token)
    );

    await act(async () => {
      const res = await result.current.fetchData();
      expect(res).toBeNull();
    });

    expect(result.current.error).toBe("No autorizado");
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it("maneja errores inesperados (sin response)", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() =>
      useFetchingDataGetRepository(url, token)
    );

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it("envía el token en los headers correctamente", async () => {
    const mockData = { ok: true };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      useFetchingDataGetRepository(url, token)
    );

    await act(async () => {
      await result.current.fetchData();
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });
});
