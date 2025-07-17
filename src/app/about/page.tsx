import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="max-w-md mx-auto p-4 space-y-4">
      <h1 data-testid="about-heading" className="text-2xl font-bold">
        About Hello App
      </h1>
      <p>This demo lets you submit names to an in-memory list.</p>
      <Link
        data-testid="home-link"
        href="/"
        className="underline text-blue-600"
      >
        Back Home
      </Link>
    </main>
  )
}
