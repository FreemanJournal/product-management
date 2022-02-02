

export default function useTotalProducts(data) {
    let nameOfProducts = []
    data?.map((item) => nameOfProducts?.push(item.productName))
    nameOfProducts = [...new Set(nameOfProducts)]
    const productSummery = nameOfProducts?.map((item) => {
        const selectedProduct = data?.filter((p) => p.productName === item)
        const totalStoreProduct = selectedProduct?.reduce((accumulator, currentValue) => (accumulator += currentValue.productQuantity * parseFloat(currentValue.productInputUnit)), 0)
        const totalProductCost = selectedProduct?.reduce((accumulator, currentValue) => (accumulator += currentValue.productQuantity * currentValue.productInputUnitPrice), 0)
        return {
            itemName: item,
            totalValue: totalStoreProduct,
            totalCost: totalProductCost
        }
    })
  
    
    return {productSummery}
}
