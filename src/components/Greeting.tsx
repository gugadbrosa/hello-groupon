"use client"
export default function Greeting({ name = "World" }: { name?: string }) {
  return <h1 data-testid="greet">Hello, {name}!</h1>
}
