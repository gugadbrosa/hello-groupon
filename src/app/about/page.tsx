import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="max-w-md mx-auto p-4 space-y-4">
      <h1 data-testid="about-heading" className="text-2xl font-bold">
        THE TEST WILL FAIL BUT ARRASCA DOESNT
      </h1>
      <div className="w-full flex justify-center">
        <Image
          src="/Arrascaeta-Flamengo-2023.jpg"
          width={320}
          height={180}
          alt="ARRAAAAAAXCAAA"
          data-testid="about-image"
        />
      </div>
    </main>
  )
}
