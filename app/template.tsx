import NavigationBar from "@/Components/Pages/NavigationBar";
import { auth } from "./auth";
import { SessionProvider } from "next-auth/react";

export default async function RootTemplate({ children }: { children: React.ReactNode }) {
    const session = await auth()

    return <SessionProvider session={ session } refetchOnWindowFocus>
        <NavigationBar />
        { children }
    </SessionProvider>
}