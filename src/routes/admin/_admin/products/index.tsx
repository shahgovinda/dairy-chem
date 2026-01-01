import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Plus, Search, Pencil, Trash2, Filter } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Product as ClientProduct, Category } from '@/types/product'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Route = createFileRoute('/admin/_admin/products/')({
  component: AdminProducts,
})

interface Product extends ClientProduct {
  status: 'Active' | 'Draft'
}

const products: Product[] = [
  {
    id: 'semi-automatic-capsule-filling-machine',
    name: 'SEMI AUTOMATIC CAPSULE FILLING MACHINE',
    category: 'Capsule',
    imageUrl: 'https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg',
    status: 'Active',

    description: 'A Semi Automatic Capsule Filling Machine is designed to fill hard gelatin or vegetarian capsules.',
    features: [],
    advantages: [],
    applicationAreas: [],
    specifications: []
  },
  {
    id: 'automatic-capsule-filling-machine',
    name: 'Automatic Capsule Filling Machine',
    category: 'Capsule',
    imageUrl: 'https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg',
    status: 'Active',

    description: 'Fully automated capsule filling solution.',
    features: [],
    advantages: [],
    applicationAreas: [],
    specifications: []
  },
  {
    id: 'blister-packing-machine',
    name: 'Blister Packing Machine',
    category: 'Injectibles',
    imageUrl: 'https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg',
    status: 'Draft',

    description: 'High speed blister packing machine.',
    features: [],
    advantages: [],
    applicationAreas: [],
    specifications: []
  },
]

function AdminProducts() {
  const [sortAlphabetical, setSortAlphabetical] = useState(false)
  // State to track which categories are selected for filtering
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)))

  // Filter and sort products based on state
  const filteredProducts = products
    .filter((product) =>
      // If no categories are selected, show all products.
      // Otherwise, check if the product's category is in the selected list.
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
    )
    .sort((a, b) => (sortAlphabetical ? a.name.localeCompare(b.name) : 0))

  return (
    <div className="flex-1 p-6 space-y-6 border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        </div>

      </div>

      <div className='flex items-center justify-between'>
        <div className='relative w-50 md:w-70'>
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 ' size={15} />
          <Input className='w-full pl-8 h-8 text-xs md:text-base bg-transparent  rounded-lg' placeholder="Search 30+ Products" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="sort-mode"
              checked={sortAlphabetical}
              onCheckedChange={setSortAlphabetical}
            />
            <Label htmlFor="sort-mode">Sort A-Z</Label>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories((prev) =>
                      checked
                        // If checked, add the category to the array
                        ? [...prev, category]
                        // If unchecked, remove the category from the array
                        : prev.filter((c) => c !== category)
                    )
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">Image</TableHead>
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-15 w-15 rounded-md object-cover bg-muted border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="line-clamp-2">{product.name}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{product.category}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}