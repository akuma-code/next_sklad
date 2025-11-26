'use server'

import prisma from "@/client"
import { Prisma } from "@/generated/prisma/client"

export async function getUserByName(username: string) {
    try {
        const u = await prisma.user.findFirst({ where: { username } })
        return u
    } catch (error) {
        console.error(error)
        throw new Error("getUserByName error")
    }
}

const checkName = async (name: string) => !!(await getUserByName(name))
export async function createUser(args: Prisma.UserCreateInput) {
    const { password, username } = args
    try {
        const existUser = await checkName(args.username)
        if (existUser) throw new Error("User already exist!")

        const u = await prisma.user.create({ data: { password, username } })
        console.log("user created: ", u)

        return u
    } catch (error) {
        console.error(error)
        throw new Error("create user error")
    }
}

export async function deleteUser(username: string) {
    const user_to_delete = await getUserByName(username)
    if (user_to_delete) await prisma.user.delete({ where: { id: user_to_delete.id } })
    console.log("deleted user: ", user_to_delete?.username)

}

export async function editUser(args: Prisma.UserUpdateArgs) {
    try {
        const u = await prisma.user.update(args)
        return u
    } catch (error) {
        console.error(error)
        throw new Error("Edit user error")
    }
}