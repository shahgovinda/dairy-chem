import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2, Save, Upload } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Product, Category } from '@/types/product'
import { addProduct } from '@/services/productsServices'

export const Route = createFileRoute('/admin/_admin/products/$productId')({
  component: AdminProductDetail,
})

// Categories defined in product.ts. Used for the dropdown selection.
const CATEGORIES: Category[] = ['Capsule', 'Granulation', 'Injectibles', 'Liquid', 'Ointment', 'Other']

// Default empty state
const emptyProduct: Product = {
  code: '',
  name: '',
  category: '' as Category, // Cast to Category to satisfy type safety for initial state
  description: '',
  imageUrl: '',
  features: [],
  advantages: [],
  applicationAreas: [],
  specifications: []
}

function AdminProductDetail() {
  const { productId } = Route.useParams()
  const navigate = useNavigate()

  // Determine if we are creating a new product or editing an existing one based on the URL parameter
  const isNew = productId === 'new'
  
  const [formData, setFormData] = useState<Product>(emptyProduct)
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Effect to handle initialization: Reset form for new products or fetch data for existing ones
  useEffect(() => {
    // If creating a new product, ensure the form is reset to empty
    if (isNew) {
      setFormData(emptyProduct)
      return
    }
    // If editing, simulate fetching data (Replace this with actual API call)
    if (productId === 'semi-automatic-capsule-filling-machine') {
       setFormData({
        code: 'semi-automatic-capsule-filling-machine',
        name: 'SEMI AUTOMATIC CAPSULE FILLING MACHINE',
        category: 'Capsule',
        description: `A Semi Automatic Capsule Filling Machine is designed to fill hard gelatin or vegetarian capsules with powder, granules, or pellets using a combination of manual loading and automated filling. The machine includes capsule loading, orientation, separation, filling, and locking units, providing higher accuracy and output compared to manual machines. Ideal for medium-scale production, it ensures GMP-compliant, dust-free and efficient capsule manufacturing.`,
        imageUrl: 'https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg',
        features: [
            'High filling accuracy',
            'Easy operation & maintenance',
            'GMP compliant design',
            'Low noise operation',
            'Adjustable speed control',
            'Automatic capsule separation'
        ],
        advantages: [
            'Our Semi-Automatic Capsule Filling Machine offers a perfect balance between manual and fully automatic systems. It significantly increases production capacity while maintaining high precision in dosage.',
            'The machine is designed to handle various capsule sizes with easy changeover parts, making it versatile for different production requirements. Its robust construction ensures longevity and consistent performance.'
        ],
        applicationAreas: [
            'Pharmaceutical Industry',
            'Nutraceuticals & Food Supplements',
            'Ayurvedic & Herbal Medicines',
            'R&D Laboratories',
            'Pilot Scale Production',
            'Cosmetics Industry'
        ],
        specifications: [
            { label: 'Output Capacity', value: '25,000 - 30,000 capsules/hour' },
            { label: 'Capsule Size', value: '00, 0, 1, 2, 3, 4' },
            { label: 'Power Consumption', value: '2.2 kW' },
            { label: 'Dimensions', value: '1500 x 1000 x 1600 mm' },
            { label: 'Weight', value: '450 kg (Approx.)' }
        ]
       })
    }
  }, [productId, isNew])

  const handleChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'features' | 'advantages' | 'applicationAreas', index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData(prev => ({ ...prev, [field]: newArray }))
  }

  const addArrayItem = (field: 'features' | 'advantages' | 'applicationAreas') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  const removeArrayItem = (field: 'features' | 'advantages' | 'applicationAreas', index: number) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }))
  }

  const handleSpecChange = (index: number, key: 'label' | 'value', val: string) => {
    const newSpecs = [...formData.specifications]
    newSpecs[index] = { ...newSpecs[index], [key]: val }
    setFormData(prev => ({ ...prev, specifications: newSpecs }))
  }

  const addSpec = () => {
    setFormData(prev => ({ ...prev, specifications: [...prev.specifications, { label: '', value: '' }] }))
  }

  const removeSpec = (index: number) => {
    setFormData(prev => ({ ...prev, specifications: prev.specifications.filter((_, i) => i !== index) }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      // Create a preview URL
      setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }))
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.category || !formData.description) {
      alert('Please fill in all required fields: Name, Category, and Description.')
      return
    }

    if (isNew) {
      try {
        await addProduct(formData, imageFile || undefined)
        navigate({ to: '/admin/products' })
      } catch (error) {
        console.error('Failed to create product:', error)
      }
    } else {
      // Logic for updating an existing product (PUT/PATCH)
      console.log('Updating product:', formData)
      // TODO: Add API call to update product
    }
  }

  return (
    
    <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? 'Create Product' : 'Edit Product'}
          </h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Basic information about the product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="name" 
                  required
                  value={formData.name} 
                  onChange={(e) => handleChange('name', e.target.value)} 
                  placeholder="e.g. Semi Automatic Capsule Filling Machine"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(val) => handleChange('category', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="id">Product ID (Slug)</Label>
                    <Input 
                        id="id" 
                        value={formData.code} 
                        onChange={(e) => handleChange('code', e.target.value)}
                        disabled={!isNew}
                        placeholder="unique-product-slug"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                <Textarea 
                  id="description" 
                  required
                  value={formData.description} 
                  onChange={(e) => handleChange('description', e.target.value)} 
                  className="min-h-[150px]"
                  placeholder="Detailed product description..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Technical specifications table.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3">Label</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.specifications.map((spec, index) => (
                      <TableRow key={index}>
                        <TableCell className="p-2">
                          <Input 
                            value={spec.label} 
                            onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                            placeholder="e.g. Output Capacity"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input 
                            value={spec.value} 
                            onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                            placeholder="e.g. 25,000 capsules/hour"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => removeSpec(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button variant="outline" size="sm" onClick={addSpec} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Specification
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Media & Lists */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative bg-muted rounded-lg overflow-hidden border flex items-center justify-center">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2" />
                    <span>No image</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={(e) => handleChange('imageUrl', e.target.value)} 
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageFile">Upload Image</Label>
                <Input 
                  id="imageFile" 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={feature} 
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    placeholder="Feature description" autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="shrink-0 text-destructive"
                    onClick={() => removeArrayItem('features', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem('features')} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Feature
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advantages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.advantages.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea 
                    value={item} 
                    onChange={(e) => handleArrayChange('advantages', index, e.target.value)}
                    className="min-h-[60px]" autoFocus
                    placeholder="Advantage description"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="shrink-0 text-destructive mt-1"
                    onClick={() => removeArrayItem('advantages', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem('advantages')} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Advantage
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.applicationAreas.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={item} 
                    onChange={(e) => handleArrayChange('applicationAreas', index, e.target.value)}
                    placeholder="Area name"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="shrink-0 text-destructive"
                    onClick={() => removeArrayItem('applicationAreas', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem('applicationAreas')} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Area
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
