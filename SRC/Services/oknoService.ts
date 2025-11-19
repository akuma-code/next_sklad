'use server'


import prisma from "../../prisma/client";



export async function createNewOkno(title: string, filename: string) {
    try {
        const okno = await prisma.okno.create({
            data: {
                title: title,
                img: filename,

            }
        })
        return okno
    } catch (error) {
        console.log(error)
        throw new Error("Ошибка при создании окна")
    }

}