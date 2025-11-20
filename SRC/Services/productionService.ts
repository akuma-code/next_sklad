'use server'

import prisma from "@/client";

export async function StartProduction(id: number, end_date: string, amount = 1) {
    const p = await prisma.production.upsert({
        where: { id },
        create: { amount, endsAt: end_date, sklad: { connect: { id } } },
        update: { amount, endsAt: end_date },
        include: { sklad: true }
    })
    return p
}