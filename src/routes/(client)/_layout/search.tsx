import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useProducts } from '@/contexts/ProductsContext'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/(client)/_layout/search')({
  component: RouteComponent,
})

function RouteComponent() {
  const { products } = useProducts()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main>
      <section className='container mx-auto px-4 lg:px-50 py-10 lg:py-20'>
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            className="pl-10 h-12 text-lg"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProducts.map((product) => (
            <div key={product.id} className='bg-secondary shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden cursor-pointer ' onClick={() => navigate({ to: '/products/$productId', params: { productId: String(product.id) } })}>
              <div className='h-50  rounded-md mb-2 flex items-center justify-center'>
                <img className='h-full object-cover' src={product.imageUrl} alt="" />
              </div>
              <div className='p-4 space-y-3'>
                <h2 className='text-xl font-bold'>{product.name}</h2>
                <p className='text-xs text-gray-500  uppercase tracking-wide'>{product.category}</p>
                <p className='text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                <div className='flex justify-between items-center'>
                  <Button className=''>Inquire Now</Button>
                  <Button variant={'secondary'} className=''>View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No products found matching "{query}"
          </div>
        )}
      </section>
    </main>
  )
}
