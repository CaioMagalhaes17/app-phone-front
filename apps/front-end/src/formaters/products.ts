import { ProductFromApi, ProductsRowFromApi, ProductsRowType, ProductType } from "../types/products"

export function formatProducts(budgets: ProductFromApi[]): ProductType[] {
  return budgets.map((budget) => formatProduct(budget))
}
export function formatProduct(product: ProductFromApi): ProductType {
  return {
    id: product._id,
    category: product.props.category,
    name: product.props.name,
    description: product.props.description,
    rowId: product.props.rowId,
    price: product.props.price,
    isActive: product.props.isActive,
    createdAt: product.props.createdAt,
    storeProfileId: product.props.storeProfileId,
    updatedAt: product.props.updatedAt,
    productImg: product.props.productImg
  }
}

export function formatProductsRows(rows: ProductsRowFromApi[]): ProductsRowType[] {
  return rows.map((row) => formatProductsRow(row))
}

export function formatProductsRow(row: ProductsRowFromApi): ProductsRowType {
  return {
    ...row,
    products: formatProducts(row.products)
  }
}