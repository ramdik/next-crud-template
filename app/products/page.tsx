import prisma from "../lib/prisma"
import AddProduct from "./addProduct"
import DeleteProduct from "./deleteProduct"
import UpdateProduct from "./updateProduct"

// Get DB direct from serverside
const getProducts = async () => {
    const res = await prisma?.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            Brand: true
        },
    })
    return res
}

//retrive data brand from DB with Prisma
const getBrands = async () => {
    const res = await prisma.brand.findMany()
    return res
}

const Product = async () => {
    //get data finish load (if have 2 process get data use object desctruction and promise method)
    const [products, brands] = await Promise.all([getProducts(), getBrands()])

    console.log(products)
    return (
        <div>
            <div className="mb-2">
                <AddProduct brands={brands} />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.Brand?.name}</td>
                            <td className="flex justify-center space-x-1"><UpdateProduct brands={brands} product={product} /><DeleteProduct product={product}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Product