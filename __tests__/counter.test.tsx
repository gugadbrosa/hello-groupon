import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from "@/components/Counter"

describe("Counter", () => {
  it("increments on click", async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const value = screen.getByTestId("value")
    expect(value).toHaveTextContent("0")

    await user.click(screen.getByRole("button", { name: /increment/i }))
    expect(value).toHaveTextContent("1")
  })
})
