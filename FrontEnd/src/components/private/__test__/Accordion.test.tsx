import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "./../Accordion";

describe("Componente accordion", () => {
  it("muestra los títulos y despliega contenido al hacer clic", () => {
    render(<Accordion />);
    expect(screen.getByText("Sección 1")).toBeInTheDocument();
    expect(screen.queryByText("Contenido de la sección 1.")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Sección 1"));
    expect(screen.getByText("Contenido de la sección 1.")).toBeInTheDocument();
  });
});
