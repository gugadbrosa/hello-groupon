"use client"
import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span data-testid="value">{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  )
}
