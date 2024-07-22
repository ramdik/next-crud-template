import prisma from "@/app/lib/prisma";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, {params}: {params: {id: string}}) => {
    const body: Product = await req.json()
    const product = await prisma.product.update({
        where: {
            id: Number(params.id)
        },
        data: {
            title: body.title,
            price: body.price,
            brandId: body.brandId
        }
    })
    return NextResponse.json(product, {status: 200})
}

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    const product = await prisma.product.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(product, {status: 200})
}
 