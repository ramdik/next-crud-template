import prisma from "@/app/lib/prisma";
import type { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const body: Product = await req.json()
    const product = await prisma.product.create({
        data: {
            title: body.title,
            price: body.price,
            brandId: body.brandId
        }
    })
    return NextResponse.json(product, {status: 201})
}
 