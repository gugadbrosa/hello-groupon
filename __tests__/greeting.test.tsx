import { render, screen } from "@testing-library/react"
import Greeting from "@/components/Greeting"

describe("Greeting", () => {
  it("renders default text", () => {
    render(<Greeting />)
    expect(screen.getByTestId("greet")).toHaveTextContent("Hello, World!")
  })

  it("renders custom name", () => {
    render(<Greeting name="Gustavo" />)
    expect(screen.getByRole("heading")).toHaveTextContent("Hello, Gustavo!")
  })
})
