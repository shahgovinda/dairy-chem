import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="prose max-w-3xl">
        <p className="text-lg mb-4">
          Welcome to Dairy Chem Pharma, your comprehensive directory for companies
          in the dairy, chemical, and pharmaceutical industries.
        </p>
        <p className="mb-4">
          Our platform connects businesses and professionals in these vital sectors,
          providing easy access to company information, contact details, and resources.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="mb-4">
          To create a centralized hub that fosters collaboration and growth within
          the dairy, chemical, and pharmaceutical communities.
        </p>
        <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Comprehensive company directory</li>
          <li>Up-to-date contact information</li>
          <li>Industry networking opportunities</li>
          <li>Resource sharing platform</li>
        </ul>
      </div>
    </div>
  )
}