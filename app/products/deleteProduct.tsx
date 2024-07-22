'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

// use for type anotation typecsript mandatory
type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const DeleteProduct = ({ product }: { product: Product }) => {
    const [isOpen, setIsOpen] = useState(false)

    //init useRouter
    const router = useRouter()

    const handleDelete = async (productId: Number) => {
        try {
            await axios.delete(`/api/products/${productId}`)
            router.refresh()
            setIsOpen(false); // Assuming this closes the modal
        } catch (error) {
            console.error(error);
            // Display an error message to the user
        }
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleModal}>Delete</button>
            {/* Modal open when button clicked */}
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to delete this data {product.title}?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>No</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleDelete(product.id)}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct