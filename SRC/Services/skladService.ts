'use server'

import prisma from "@/client"
import { Prisma } from "@/generated/prisma/client"

export async function createSkladItem(title: string, amount: number, filename: string, info?: { text: string }[]) {

    try {

        console.log({ title })
        const new_item = await prisma.sklad.create({
            data: {
                amount,
                title,
                img: filename,
                info: { create: info?.map(i => ({ text: i.text })) }

            }
        })

        // if (info) {
        //     const tsx = info.map(i => prisma.info.create({ data: { text: i.text, sklad: { connect: { id: new_item.id } } } }))
        //     await prisma.$transaction(tsx)
        // }

        console.log({ new_item })
        return new_item
    } catch (error) {
        console.error(error)
        throw new Error()
    }


}

export async function editSkladItem(skladId: number, new_data: Prisma.SkladUpdateInput) {

    const { amount, img, info, production, title } = new_data;
    try {
        if (info) {
            // console.log("Info deleted")
            await prisma.info.deleteMany({ where: { sklad: { some: { id: skladId } } } })
        }
        const s = await prisma.sklad.update({
            where: { id: skladId },
            data: {
                amount, img, production, title, info
            },
            select: {
                id: true,
                amount: true,
                title: true,
                img: true,
                info: true,
                production: true,
            }
        })


        return s
    } catch (error) {
        console.error(error)
        throw new Error("Ошибка при редактировании!")
    }


}


export async function deleteSkaldItem(id: number) {
    const s = await prisma.sklad.delete({ where: { id } })
    console.log("Deleted: ", s.id)
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

export async function getAllSkladAndInfo() {

    try {
        const s = await prisma.sklad.findMany({ select: { amount: true, id: true, img: true, info: true, title: true } })

        return s
    } catch (error) {
        console.error(error)
        throw new Error("FIND ERROR")
    }

}