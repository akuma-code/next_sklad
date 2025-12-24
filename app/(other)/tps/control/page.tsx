import ProfileControl from "@/Components/Pages/ProfileControl"
import { getProfiles } from "@/Services/profileService"

export default async function TpsControlPage() {

    const options = await getProfiles()


    return (
        <div>
            <ProfileControl options={ options } />
        </div>
    )
}