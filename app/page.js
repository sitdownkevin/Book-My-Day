import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-4">
      <h1 className="text-3xl font-bold font-mono">Hello world</h1>
      <Link href="/booking">
        <h1 className="text-3xl font-bold font-mono">Booking My Days</h1>
      </Link>
    </main>
  )
}
