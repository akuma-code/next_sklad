import SkladItemCard from "@/Components/Cards/SkladItemCard"
import OknoCreationForm from "@/Components/Form/OknoCreationForm"
import { Prisma } from "@/generated/prisma/client"
import { getAllSkladItems } from "@/Services/skladService"

async function SkladHome() {

    const items = await getAllSkladItems({
        select: {
            id: true, amount: true, okno: true
        }
    }) as unknown as Prisma.SkladGetPayload<{ select: { id: true, amount: true, okno: true } }>[]
    console.log(items)
    return (
        <div>


            {
                items.map((i, idx) =>
                    <SkladItemCard
                        key={ i.id }
                        amount={ i.amount }
                        img={ i.okno!.img }
                        title={ i.okno!.title }

                    />
                )
            }

        </div>
    )
}

export default SkladHome