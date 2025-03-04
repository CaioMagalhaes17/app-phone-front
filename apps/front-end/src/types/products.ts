export type ProductFromApi = {
  props: Omit<ProductType, 'id'>,
  _id: string
}

export type ProductType = {
  id: string
  category: string
  createdAt: string
  description: string
  isActive: boolean
  name: string
  price: string
  rowId: string
  storeProfileId: string
  updatedAt: string
}


export type ProductsRowFromApi = {
  id: string,
  name: string,
  storeProfileId: string,
  isActive: boolean,
  createdAt: string
  products: ProductFromApi[]
}

export type ProductsRowType = {
  id: string,
  name: string,
  storeProfileId: string,
  isActive: boolean,
  createdAt: string
  products: ProductType[]
}