"use client"

import React, { useEffect, useState, FormEvent } from "react"

type NameRecord = {
  id: number
  name: string
  createdAt: string
}

type HelloList = {
  items: NameRecord[]
  count: number
}

const ENDPOINT = "/api/hello"

export default function NameClient() {
  const [names, setNames] = useState<NameRecord[]>([])
  const [count, setCount] = useState<number>(0)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputVal, setInputVal] = useState("")

  async function load() {
    try {
      const res = await fetch(ENDPOINT, { cache: "no-store" })
      const body: HelloList = await res.json()
      setNames(body.items)
      setCount(body.count)
    } catch (err) {
      console.error("Failed to load names", err)
      setError("Failed to load.")
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputVal }),
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err?.error ?? "Unknown error")
      } else {
        await load() // refresh list
        setInputVal("")
      }
    } catch (err) {
      console.error("Submit failed", err)
      setError("Network error")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 data-testid="home-heading" className="text-2xl font-bold">
        Hello Groupon
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          data-testid="name-input"
          id="name-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter a name"
          className="border p-2 flex-1 rounded"
        />
        <button
          data-testid="submit-btn"
          type="submit"
          disabled={pending}
          className="border px-4 py-2 rounded"
        >
          {pending ? "..." : "Add"}
        </button>
      </form>

      {error && (
        <p data-testid="error-msg" className="text-red-600 text-sm">
          {error}
        </p>
      )}

      <p data-testid="name-count" className="text-sm text-gray-500">
        Total: {count}
      </p>

      <ul data-testid="name-list" className="list-disc pl-5 space-y-1">
        {names.map((n) => (
          <li key={n.id} data-testid="name-item">
            {n.name}
          </li>
        ))}
      </ul>

      <nav className="pt-4">
        <a
          data-testid="about-link"
          href="/about"
          className="underline text-blue-600"
        >
          About
        </a>
      </nav>
    </div>
  )
}
