import OneSkladItemView from "@/Components/Pages/OneSkladItemView";
import SkladControlButtons from "@/Components/Pages/SkladControlButtons";
import SkladItemsList from "@/Components/Pages/SkladItemsList";
import SkladItemsView from "@/Components/Pages/SkladItemsView";
import { Box, Button, Container, Paper, Stack } from "@mui/material";

async function SkladControlPage(props: PageProps<'/sklad_control'>) {
    const { params, searchParams } = props;
    const search = (await searchParams).selected as string
    return (

        <Container maxWidth={ "xl" }>
            {/* <Paper elevation={ 2 }> */ }

            <Stack direction={ 'row' } spacing={ 2 }>
                <Box component={ Stack } direction={ 'column' } spacing={ 1 } sx={ { bgcolor: 'lightgrey' } }>
                    <SkladControlButtons />

                </Box>
                <Box sx={ { bgColor: 'green' } }>

                    <OneSkladItemView />
                    {/* <SkladItemsView /> */ }
                </Box>
            </Stack>

            {/* </Paper> */ }
        </Container>
    )
}

export default SkladControlPage