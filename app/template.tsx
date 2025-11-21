import NavigationBar from "@/Components/Pages/NavigationBar";

export default async function RootTemplate({ children }: { children: React.ReactNode }) {


    return <>
        <NavigationBar />
        { children }
    </>
}