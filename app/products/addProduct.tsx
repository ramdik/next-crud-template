'use client'

import { SyntheticEvent, useState } from "react"
import { Brand } from "@prisma/client" // use for type anotation typecsript mandatory
import { useRouter } from "next/navigation"
import axios from "axios"

const AddProduct = ({ brands }: { brands: Brand[] }) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    //init useRouter
    const router = useRouter()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post("/api/products", {
                title,
                price: Number(price),
                brandId: Number(brand),
            });

            setPrice("");
            setBrand("");
            setTitle("");
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
            <button className="btn" onClick={handleModal}>Add New</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered" placeholder="Product Name" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input input-bordered" placeholder="Price" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select select-bordered">
                                <option value="" disabled>Select a brand</option>
                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct