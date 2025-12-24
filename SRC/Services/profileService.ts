'use server'

import prisma from "@/client";
import { RamaStorage } from "@/defaultStuff/glass_delta";
import { Prisma } from "@/generated/prisma/client";

export async function createProfile(system_name: string, glassDelta?: Prisma.GlassDeltaCreateWithoutSystemInput) {

    try {
        const s = await prisma.system.create({
            data: {
                name: system_name,
                glass: { create: glassDelta }
            },
            include: { glass: true }
        })
        console.log("Created Profile System", s)
        return s
    } catch (error) {
        console.error(error)
        throw new Error("Create profile error")
    }

}

export async function getProfileDelta(system_name: string) {
    try {
        const delta = await prisma.glassDelta.findFirst({
            where: { system: { name: system_name } }
        })
        return delta
    } catch (error) {
        console.error(error)
        throw new Error("Find delta error")
    }
}

export async function getProfiles() {
    const p = await prisma.system.findMany()
    return p
}

export async function seedProfileDelta() {
    const dto = (system_name: string, profile_stv: typeof RamaStorage.stv.SoftLine, profile_fix: typeof RamaStorage.fix.SoftLine): { name: string, glass: Prisma.GlassDeltaUncheckedCreateWithoutSystemInput } => ({
        name: system_name,
        glass: {
            stv_rama: profile_stv.dr,
            stv_impost: profile_stv.di,
            rama: profile_fix.dr,
            impost: profile_fix.di,
            hrama: profile_stv.rama,
            himpost: profile_stv.impost,
            porog: profile_stv.d_porog,
            shtulp_impost: profile_stv.d_shtulp
        }
    })

    // await prisma.system.delete({ where: { name: 'Softline' } })
    const Proline = dto('Proline', RamaStorage.stv.ProLine, RamaStorage.fix.ProLine)
    const Softline = dto('Softline', RamaStorage.stv.SoftLine, RamaStorage.fix.SoftLine)
    await createProfile(Proline.name, Proline.glass)
    await createProfile(Softline.name, Softline.glass)

}