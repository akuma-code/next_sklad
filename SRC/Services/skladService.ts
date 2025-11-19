'use server'

import prisma from "@/client"
import { Prisma } from "@/generated/prisma/client"

export async function createSkladItem(title: string, filename: string, amount: number) {
    const s = prisma.sklad
    try {

        const new_okno = await prisma.okno.create({
            data: { title, img: filename }
        })
        const new_item = await s.create({
            data: {
                amount,
                okno: { connect: { id: new_okno.id } }

            }
        })
        return new_item
    } catch (error) {
        console.error(error)
        throw new Error()
    }


}

export async function getAllSkladItems(payload?: Prisma.SkladFindManyArgs) {
    try {
        const s = await prisma.sklad.findMany(payload)
        return s
    } catch (error) {
        console.error(error)
        throw new Error("FIND ERROR")
    }

}