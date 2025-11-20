import SkladItemsView from "@/Components/Pages/SkladItemsView"
import { Prisma } from "@/generated/prisma/client"
import { getAllSkladItems } from "@/Services/skladService"

async function SkladHome() {


    return (
        <div>
            <SkladItemsView />



        </div>
    )
}

export default SkladHome