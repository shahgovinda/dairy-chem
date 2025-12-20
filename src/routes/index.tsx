import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Dairy Chem Pharma</h1>
      <p className="text-lg text-gray-600">
        Your trusted partner for dairy, chemical, and pharmaceutical solutions.
      </p>
    </div>
  )
}