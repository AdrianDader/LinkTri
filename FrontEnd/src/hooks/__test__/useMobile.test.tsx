import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useIsMobile from "./../useMobile";

describe("useIsMobile", () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // Reset window size before each test
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it("debería retornar true si el ancho es menor al breakpoint", () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile(1000));
    expect(result.current).toBe(true);
  });

  it("debería retornar false si el ancho es mayor o igual al breakpoint", () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => useIsMobile(1000));
    expect(result.current).toBe(false);
  });

  it("actualiza el valor si la ventana se redimensiona", () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => useIsMobile(1000));

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });

  it("usa el breakpoint proporcionado", () => {
    window.innerWidth = 950;
    const { result } = renderHook(() => useIsMobile(900));
    expect(result.current).toBe(false);
  });
});
