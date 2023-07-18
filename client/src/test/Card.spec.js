import { render } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  const mockProps = {
    id: 1,
    flag: "mockFlagUrl",
    name: "Mock Country",
    continent: "Mock Continent",
  };

  test("Debería renderizar correctamente", () => {
    const { getByText, getByAltText } = render(<Card {...mockProps} />);

    // Verificar que el componente se renderice correctamente
    expect(getByText(mockProps.name)).toBeInTheDocument();
    expect(
      getByText(`continent: ${mockProps.continent.toUpperCase()}`)
    ).toBeInTheDocument();
    expect(getByAltText("Country Flag")).toBeInTheDocument();
  });

  test("Debería tener el enlace correcto", () => {
    const { getByRole } = render(<Card {...mockProps} />);

    // Verificar que el enlace tenga la ruta correcta
    expect(getByRole("link")).toHaveAttribute(
      "href",
      `/detail/${mockProps.id}`
    );
  });
});
