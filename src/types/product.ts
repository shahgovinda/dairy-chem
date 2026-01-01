export type Category = 'Capsule' | 'Granulation' | 'Injectibles' | 'Liquid' | 'Ointment' | "Other";
export interface ProductSpecification {
    label: string
    value: string
}

export interface Product {
    id: string
    name: string
    category: Category
    description: string
    imageUrl: string
    features: string[]
    advantages: string[]
    applicationAreas: string[]
    specifications: ProductSpecification[]
}