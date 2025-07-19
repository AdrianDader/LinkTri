import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { useFetchingData } from "./../useFetchingData";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useFetchingData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería iniciar con valores por defecto", () => {
    const { result } = renderHook(() => useFetchingData());
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("realiza una petición POST exitosa y guarda los datos", async () => {
    const mockResponse = { success: true };
    mockedAxios.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => useFetchingData());

    await act(async () => {
      const response = await result.current.fetchData({
        url: "/api/test",
        method: "POST",
        payload: { name: "John" },
      });

      expect(response).toEqual(mockResponse);
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("realiza una petición GET exitosa", async () => {
    const mockData = { id: 1, name: "Item" };
    mockedAxios.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetchingData());

    await act(async () => {
      const response = await result.current.fetchData({
        url: "/api/item",
        method: "GET",
      });

      expect(response).toEqual(mockData);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it("maneja errores correctamente", async () => {
    const error = new Error("Request failed");
    mockedAxios.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useFetchingData());

    await act(async () => {
      const res = await result.current.fetchData({
        url: "/api/error",
        method: "POST",
      });

      expect(res).toBeNull();
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("pasa correctamente los headers y payload", async () => {
    const mockResponse = { ok: true };
    mockedAxios.mockResolvedValueOnce({ data: mockResponse });

    const payload = { username: "admin" };
    const headers = { Authorization: "Bearer token123" };

    const { result } = renderHook(() => useFetchingData());

    await act(async () => {
      await result.current.fetchData({
        url: "/api/secure",
        method: "POST",
        payload,
        headers,
      });
    });

    expect(mockedAxios).toHaveBeenCalledWith({
      url: "/api/secure",
      method: "POST",
      data: payload,
      headers,
    });
  });
});
