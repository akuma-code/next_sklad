import { ROLE } from "@/generated/prisma/enums"
import { getUserByName } from "@/Services/userService"
import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
    interface User {
        id: number,
        username: string,
        password: string,
        role: ROLE
    }
    interface Session {
        user: {
            id: number,
            username: string,
            password: string,
            role: ROLE
        } & DefaultSession["user"]
    }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {
                    type: "text",
                    label: "Имя пользователя",
                },
                password: {
                    type: 'password',
                    label: "Пароль",
                    placeholder: "Введите пароль"
                }

            },
            authorize: async (c) => {
                let user = null
                const { password, username } = c as { username: string, password: string };

                console.log({ c })
                user = await getUserByName(username)

                if (!user) {
                    throw new Error("Authorize error!")

                }
                if (user.password !== password) {
                    console.error("Неправильный пароль", password)
                    return null
                }
                return user
            }
        },

        )],
    pages: {
        signIn: 'api/auth/login',
        newUser: "api/auth/register",
        signOut: 'api/auth/signout'
    },
    session: {
        strategy: "jwt",
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        // generateSessionToken: () => {
        //     return randomUUID?.() ?? randomBytes(32).toString("hex")
        // }

    },
    callbacks: {
        authorized({ auth: session, request: { nextUrl } }) {
            const isLoggedIn = !!session?.user;
            console.log("auth: ", session)
            const s = nextUrl.hostname
            console.log({ s })
            if (isLoggedIn) return true
            return false
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user
                token.role = user.role
                token.name = user.username
                token.userId = user.id
            }
            return token
        },
        async session({ session, token }) {

            // if (trigger) {
            //     session.sessionToken === token.refresh_token
            // }
            if (token.sub) session.sessionToken = token.sub
            session.user.role = token.role as ROLE
            // session.user.username = token.name as string
            //    if(token.userId) session.user.id = token.userId 
            // session.settings = token.settings
            // token.sub && await cookies().set('token', token.sub)



            // console.log({ token })
            return session
        },
    },
    events: {
        createUser(message) {
            console.log("events fires: create")
            console.log("New user created: ")
            console.table(message.user)
        },
        signIn(message) {
            if (message.user) console.log(`Welcome ${message.user.username}`)
            console.table(message.user)
        },
        signOut(message) {
            if ("token" in message) console.log("See you later, ", message.token?.name)
        },
    }

})