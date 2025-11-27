'use server'

import prisma from "@/client";
import { _formated_date } from "@/Helpers/dayjs";
import dayjs from "dayjs";

export async function StartProduction(skladId: number, end_date: string, amount = 1) {

    const task = await prisma.production.create({
        data: {
            amount,
            endsAt: end_date,
            isReady: false,
            skladId: skladId
        }
    })
    console.log(`task created: skladId(${task.skladId}) / ${task.endsAt}`)

    return task
}


export async function checkFinishedProductions() {



    const queries = await prisma.production.findMany({ where: { isReady: false } })
    const finished = queries.filter(p => dayjs(p.endsAt).isBefore(dayjs()))
    console.log(`всего заданий: ${queries.length}`)
    console.log(`закончено: ${finished.length}`)
    const tsx = finished.map(p => prisma.production.update({ where: { id: p.id }, data: { isReady: true } }))
    const result = await prisma.$transaction(tsx)
    return result

}

export async function finishProductionTask(prodId: number) {
    try {
        const p = await prisma.production.update({
            where: { id: prodId },
            data: { isReady: true }
        })

        console.log(`Finished: ${p.id}`)
        return p
    } catch (error) {
        console.error(error)
        throw new Error("finishProductionTask error!")
    }

}


export async function getSkladItemProductions(skladId: number, readyState = false) {
    try {
        const p = await prisma.production.findMany({ where: { skladId, isReady: readyState } })
        return p
    } catch (error) {
        console.error(error)
        throw new Error("getSkladItemProductions error")
    }
}